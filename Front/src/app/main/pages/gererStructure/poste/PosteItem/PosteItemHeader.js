import { useTheme } from '@mui/styles';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

function PosteItemHeader({ formValues }) {
    const methods = useFormContext();
    const { formState, watch, getValues } = methods ? methods : {};
    const { isValid, isDirty } = formState ? formState : {}

    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { id } = formValues
    const { titrePoste } = formValues
    const { departement } = formValues

    let departementData = [];
    if (Array.isArray(departement)) {
        departementData = departement.map((dep) => dep.id)
    }


    const data = {
        titrePoste,
        departement: departementData
    }



    // console.log(formValues)

    const handleSavePoste = async () => {
        if(!titrePoste || !departement){
            dispatch(showMessage({message : 'Veuillez remplir toutes les champs obligatoires (*).'}))
        } else if (id) {
            // console.log(departement)
            try {
                await axios.put(`http://localhost:4000/api/poste/${id}/edit`, data)
                dispatch(showMessage({message : 'Poste mise à jour avec succés.'}))
                // alert('Fonction Update succesfully')
                navigate('/business/manage/Fonction')
            } catch (error) {
                // console.log(error)
                dispatch(showMessage({message : error.response.data.message}))
            }
        } else {
            console.log('Ajout nouvelle poste poste')
            try {
                await axios.post(`http://localhost:4000/api/poste/new`, data)
                dispatch(showMessage({message : 'Poste créé avec succés.'}))
                navigate('/business/manage/Fonction')
            } catch (error) {
                // console.log(error)
                dispatch(showMessage({message : error.response.data.message}))
            }
        }
    }

    const handleDeletePoste = async () =>{
        const confirmation = window.confirm(`Vous voulez vraiment supprimer le poste ${titrePoste}`)
        if(confirmation){
            await axios.delete(`http://localhost:4000/api/poste/${id}/delete`, data)
            dispatch(showMessage({message : 'Poste supprimée avec succés.'}))
            // alert('Poste supprimée avec succès')
            navigate('/business/manage/Fonction')
        }
    }


    return (
        <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
            <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
                >
                    <Typography
                        className="flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to="/business/manage/Fonction"
                        color="inherit"
                    >
                        <FuseSvgIcon size={20}>
                            {theme.direction === 'ltr'
                                ? 'heroicons-outline:arrow-sm-left'
                                : 'heroicons-outline:arrow-sm-right'}
                        </FuseSvgIcon>
                        <span className="flex mx-4 font-medium">Postes</span>
                    </Typography>
                </motion.div>
                <div className="flex items-center max-w-full">
                    <motion.div
                        className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                        initial={{ x: -20 }}
                        animate={{ x: 0, transition: { delay: 0.3 } }}
                    >
                        <Typography className="text-16 sm:text-20 truncate font-semibold">{titrePoste || 'Nouveau Poste'} </Typography>
                        <Typography variant="caption" className="font-medium"> Détail du poste </Typography>
                    </motion.div>
                </div>
            </div>
            <motion.div
                className="flex"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
            >
                {id && (
                    <Button
                        className="whitespace-nowrap mx-4"
                        variant="contained"
                        color="error"
                        //  disabled={!isDirty  || !isValid}
                        onClick={handleDeletePoste}
                    >
                        Supprimer
                    </Button>
                )}
                <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    //  disabled={!isDirty  || !isValid}
                    onClick={handleSavePoste}
                >
                    Enregistrer
                </Button>
            </motion.div>

        </div>
    )
}

export default PosteItemHeader
