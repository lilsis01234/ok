import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormControlLabel, IconButton, MenuItem, Popover, Switch, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { closeEditEventDialog, closeNewEventDialog, selectEventDialog } from '../../store/eventsSlice';
import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import { selectUser } from 'app/store/userSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    titleEvents: yup.string().required('Veuillez entrer le titre de l\'évenement.'),
    eventStart: yup.date().required('Veuillez entrer la date de début de l\'évènement'),
    eventEnd: yup.date().required('Veuillez entrer la date de fin de l\'évènement'),
})


function EventDialog(props) {
    const { open, type, position, closePopover, data, idEvent } = props;



    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const { reset, watch, control, onChange, formState, handleSubmit } = methods || {}
    const { isValid, dirtyFields, errors } = formState || {}


    useEffect(() => {
        if (data) {
            reset(data);
        } else {
            reset();
        }
    }, [data, reset])

    const eventStart = watch('eventStart');
    const eventEnd = watch('eventEnd');
    const label = watch('calendarLabel');
    const titleEvents = watch('titleEvents');
    const nombrePlaces = watch('nombrePlaces');
    const formation = watch('formation')




    const [listeFormation, setListeFormation] = useState([]);
    const user = useSelector(selectUser)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:4000/api/formations/formations/${user.data?.photo?.id}`)
            .then((response) => {
                setListeFormation(response.data);
            })
            .catch((error) => {
                console.error("Erreur fetching function data", error)
            })
    }, []);

    const handleFormSubmit = async (formData) => {
        if (label === 'Séance Formation') {
            const data = {
                title: titleEvents,
                start: eventStart,
                end: eventEnd,
                nombreDePlaces: nombrePlaces,
                formation: formation
            }

            if (type === 'new') {
                axios.post('http://localhost:4000/api/agenda/addSeance', data)
                    .then(response => {
                        dispatch(showMessage({ message: 'Séance formation ajouté avec succés' }))
                        closePopover()
                    })
                    .catch(error => {
                        dispatch(showMessage({ message: 'Erreur lors de l\'ajout de la séance' }))
                        console.error(error);
                        closePopover();
                    })
            } else if (type === 'edit') {
                axios.put(`http://localhost:4000/api/calendrier/edit/${idEvent}`, data)
                    .then(response => {
                        dispatch(showMessage({ message: 'Séance mise à jour avec succés' }));
                        closePopover();
                    })
                    .catch(error => {
                        dispatch(showMessage({ message: 'Erreur lors de la mise à jour de la séance' }))
                        console.error(error);
                        closePopover();
                    })
            }
        }

    }


    const handleRemove = async () => {
        // if (label === 'Séance Formation'){
            const confirmation = window.confirm(`Vous voulez vraiment supprimer la séance ${titleEvents} ?`)
            if(confirmation){
                axios.delete(`http://localhost:4000/api/calendrier/seance/${idEvent}`)
                dispatch(showMessage({message : 'Séance effacé avec succés'}))
                closePopover();
            } else {
                closePopover();
            }
        // }     
    }

    const handleVoirPlusSeance = () => {
        navigate(`/seance/info/${idEvent}`);
    }



    return (
        <Popover
            // {...eventDialog?.props}
            open={open}
            anchorReference="anchorPosition"
            anchorPosition={{ top: position.y, left: position.x }}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
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
                                label="Titre de l' évènement"
                                className="flex-auto"
                                error={!!errors.titleEvents}
                                helperText={errors?.titleEvents?.message}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                autoFocus
                                required
                                fullWidth
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
                                render={
                                    ({ field: { onChange, value } }) => (
                                        <DateTimePicker
                                            className="mt-8 mb-16 w-full"
                                            value={new Date(value)}
                                            onChange={onChange}
                                            slotProps={{
                                                textField: {
                                                    label: 'Début',
                                                    variant: 'outlined',
                                                },
                                            }}
                                            maxDate={eventEnd}
                                        />
                                    )
                                }
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
                                        slotProps={{
                                            textField: {
                                                label: 'Fin',
                                                variant: 'outlined',
                                            },
                                        }}
                                        minDate={eventStart}
                                    />
                                )}
                            />
                        </div>
                        {/* <Controller
                            name="allDay"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormControlLabel
                                    className="mt-8"
                                    label="Toute la journée"
                                    control={
                                        <Switch
                                            onChange={(ev) => {
                                                onChange(ev.target.checked);
                                            }}
                                            checked={value}
                                            name="allDay"
                                        />
                                    }
                                />

                            )}
                        /> */}
                    </div>
                </div>

                {/* Label en static */}
                <div className="flex sm:space-x-24 mb-16">
                    <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:tag
                    </FuseSvgIcon>
                    <Controller
                        name="calendarLabel"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                value={field.value || ''}
                                className='mt-8 mb-16'
                                required
                                helperText='Veuillez selectionner le type de donnée'
                                label='Type de donnée'
                                autoFocus
                                id='calendarLabel'
                                variant='outlined'
                                fullWidth
                            >
                                <MenuItem value='Séance Formation'>Séance Formation</MenuItem>
                            </TextField>
                        )}
                    />
                </div>
                {label === 'Séance Formation' && (
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
                                    />
                                )}
                            />
                        </div>
                        <div className="flex sm:space-x-24 mb-16">
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
                                        InputLabelProps={{ shrink: !!field.value }}
                                    >
                                        {listeFormation.map((formation) => (
                                            <MenuItem key={formation.id} value={formation.id}>{formation.theme}</MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </div>
                    </>


                )
                }

                {type === 'new' ? (
                    <div className="flex items-center space-x-8">
                        <div className="flex flex-1" />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleFormSubmit}
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                        >
                            Ajouter
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-8">
                        <Button
                            variant="contained"
                            onClick={handleVoirPlusSeance}
                        >
                            <FuseSvgIcon>heroicons-solid:plus-circle</FuseSvgIcon>
                            Voir plus
                        </Button>
                        <div className="flex flex-1" />
                        <IconButton onClick={handleRemove} size="large">
                            <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
                        </IconButton>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleFormSubmit}
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                        >
                            Enregistrer
                        </Button>
                    </div>
                )}
            </div>
        </Popover>
    )
}

export default EventDialog
