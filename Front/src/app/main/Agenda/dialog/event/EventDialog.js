import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, MenuItem, Popover, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import axios from 'axios';
import { selectUser } from 'app/store/userSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    titleEvents: yup.string().required('Veuillez entrer le titre de l\'événement.'),
    eventStart: yup.date().required('Veuillez entrer la date de début de l\'évènement'),
    eventEnd: yup.date().required('Veuillez entrer la date de fin de l\'évènement'),
    nombrePlaces: yup.number().min(0, 'Le nombre de places doit être supérieur ou égal à 0').required('Veuillez entrer le nombre de places'),
    formation: yup.string().required('Veuillez sélectionner une formation'),
});

function EventDialog(props) {
    const { open, type, position, closePopover, data, idEvent } = props;

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const { reset, watch, control, formState: { isValid, dirtyFields, errors }, handleSubmit } = methods;

    const eventStart = watch('eventStart');
    const eventEnd = watch('eventEnd');
    const titleEvents = watch('titleEvents');
    const nombrePlaces = watch('nombrePlaces');
    const formation = watch('formation');

    const [listeFormation, setListeFormation] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [infos, setInfos] = useState();
    const users = localStorage.getItem('user');
    const userConnected = JSON.parse(users);
    const roleH = userConnected.Profile_RoleHierarchique?.roleHierarchique;
    console.log(roleH);

    useEffect(() => {
        if (data) {
            reset(data);
        } else {
            reset();
        }
    }, [data, reset]);

    useEffect(()=>{
        axios.get(`http://localhost:4000/api/seances/view/${props.idEvent}`)
        .then((response) =>{
            console.log(response.data)
            setInfos(response.data)
        })
        .catch((error) =>{
            console.error(error)
        })
    })
    useEffect(() => {
        axios.get(`http://localhost:4000/api/formations/formations/${user.data?.photo?.id}`)
            .then((response) => {
                setListeFormation(response.data);
            })
            .catch((error) => {
                console.error("Erreur fetching formation data", error);
            });
    }, [user.data?.photo?.id]);

    const handleFormSubmit = async (formData) => {
        console.log('Form Data:', formData);

        const data = {
            title: formData.titleEvents,
            start: formData.eventStart,
            end: formData.eventEnd,
            nombreDePlaces: formData.nombrePlaces,
            formation: formData.formation
        };

        if (type === 'new') {
            axios.post('http://localhost:4000/api/agenda/agenda', data)
                .then(response => {
                    dispatch(showMessage({ message: 'Séance ajoutée avec succès' }));
                    closePopover();
                })
                .catch(error => {
                    dispatch(showMessage({ message: 'Erreur lors de l\'ajout de la séance' }));
                    console.error(error);
                    closePopover();
                });

        } else if (type === 'edit') {
            axios.put(`http://localhost:4000/api/calendrier/edit/${idEvent}`, data)
                .then(response => {
                    dispatch(showMessage({ message: 'Séance mise à jour avec succès' }));
                    closePopover();
                })
                .catch(error => {
                    dispatch(showMessage({ message: 'Erreur lors de la mise à jour de la séance' }));
                    console.error(error);
                    closePopover();
                });
        }
    };

    const handleRemove = async () => {
        const confirmation = window.confirm(`Vous voulez vraiment supprimer la séance ${titleEvents} ?`);
        if (confirmation) {
            axios.delete(`http://localhost:4000/api/calendrier/seance/${idEvent}`)
                .then(response => {
                    dispatch(showMessage({ message: 'Séance effacée avec succès' }));
                    closePopover();
                })
                .catch(error => {
                    dispatch(showMessage({ message: 'Erreur lors de la suppression de la séance' }));
                    console.error(error);
                    closePopover();
                });
        } else {
            closePopover();
        }
    };

    const handleVoirPlusSeance = () => {
        navigate(`/seance/info/${idEvent}`);
    };

    // Determine if fields should be editable
    const isEditable =  user.data?.photo?.id.toString() === infos?.Formation?.formateur.toString()|| roleH.toString() === "SuperAdministrateur";
    console.log(infos)
    return (
        <Popover
            open={open}
            anchorReference="anchorPosition"
            anchorPosition={{ top: position.y, left: position.x }}
            anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
            transformOrigin={{ vertical: 'center', horizontal: 'left' }}
            onClose={closePopover}
            component="form"
        >
            <div className="flex flex-col max-w-full p-24 pt-32 sm:pt-40 sm:p-32 w-480">
                <div className="flex sm:space-x-24 mb-16">
                    <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:pencil-alt
                    </FuseSvgIcon>
                    <Controller
                        name="titleEvents"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                value={field.value || ''}
                                id="titleEvents"
                                label="Titre de l'événement"
                                className="flex-auto"
                                error={!!errors.titleEvents}
                                helperText={errors?.titleEvents?.message}
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                autoFocus
                                required
                                fullWidth
                                disabled={!isEditable}
                            />
                        )}
                    />
                </div>

                <div className="flex sm:space-x-24 mb-16">
                    <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:calendar
                    </FuseSvgIcon>
                    <div className="w-full">
                        <div className="flex flex-column sm:flex-row w-full items-center space-x-16">
                            <Controller
                                name="eventStart"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <DateTimePicker
                                        className="mt-8 mb-16 w-full"
                                        value={new Date(value)}
                                        onChange={onChange}
                                        slotProps={{ textField: { label: 'Début', variant: 'outlined' } }}
                                        maxDate={eventEnd}
                                        disabled={!isEditable}
                                    />
                                )}
                            />
                            <Controller
                                name="eventEnd"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <DateTimePicker
                                        className="mt-8 mb-16 w-full"
                                        value={new Date(value)}
                                        onChange={onChange}
                                        slotProps={{ textField: { label: 'Fin', variant: 'outlined' } }}
                                        minDate={eventStart}
                                        disabled={!isEditable}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>

                {isEditable && ( 
                    <>
                        <div className="flex sm:space-x-24 mb-16">
                            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                                heroicons-outline:user-group
                            </FuseSvgIcon>
                            <Controller
                                name="nombrePlaces"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        value={field.value || 0}
                                        type='number'
                                        label='Nombre de places disponible'
                                        className='mt-8 mb-16'
                                        required
                                        autoFocus
                                        id='nombrePlaces'
                                        variant='outlined'
                                        fullWidth
                                        inputProps={{ min: 0 }}
                                        disabled={!isEditable}
                                    />
                                )}
                            />
                        </div>
                        {/* <div className="flex sm:space-x-24 mb-16">
                            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                                heroicons-outline:book-open
                            </FuseSvgIcon>
                            <Controller
                                name="formation"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        value={field.value || ''}
                                        className="mt-8 mb-16"
                                        error={!!errors.formation}
                                        required
                                        helperText={errors?.formation?.message}
                                        label="Formation"
                                        autoFocus
                                        id="formation"
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        disabled={!isEditable}
                                    >
                                        {listeFormation.map((f) => (
                                            <MenuItem key={f.id} value={f.id}>
                                                {f.libelle}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </div> */}
                    </>
                )}

                <div className="flex flex-1 justify-between items-center">
                    {type === 'edit' && (
                        <Button onClick={handleRemove} className="bg-red-400 text-white" variant='outlined' color='error' disabled={!isEditable}>
                            Supprimer
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit(handleFormSubmit)}
                        disabled={!isValid || !_.isEmpty(dirtyFields) || !isEditable}
                    >
                        Enregistrer
                    </Button>
                    {type === 'edit' && (
                        <Button onClick={handleVoirPlusSeance} className="bg-yellow-400 text-white" disabled={!isEditable}>
                            Voir Plus
                        </Button>
                    )}
                </div>
            </div>
        </Popover>
    );
}

export default EventDialog;
