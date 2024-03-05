import axios from 'axios';
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { motion } from 'framer-motion';
import { Button, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';

function ProjetItemHeader({ formValues }) {
    const methods = useFormContext();
    const { formState, watch, getValues } = methods ? methods : {};
    const { isValid, isDirty } = formState ? formState : {}

    const { id } = formValues
    const { nomProjet } = formValues
    const { departement } = formValues

    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const data = {
        nomProjet,
        departement
    }

    // console.log(formValues)

    const handleSaveProject = async () => {
        if(!nomProjet || !departement){
            dispatch(showMessage({message : 'Veuillez remplir toutes les champs obligatoires (*).'}))
        }else if (id) {
            try {
                await axios.put(`http://localhost:4000/api/projet/edit/${id}`, data)
                dispatch(showMessage({message : 'Projet mise à jour avec succés.'}))
                // alert('Project Mise à jour avec succés')
                navigate('/business/manage/project')
            } catch (error) {
                // console.log(error)
                dispatch(showMessage({message : error.response.data.message}))
            }
        } else {
            try {
                await axios.post(`http://localhost:4000/api/projet/new`, data)
                dispatch(showMessage({message : 'Projet créé avec succés.'}))
                // alert('Projet crée avec succés')
                navigate('/business/manage/project')
            }
            catch (error) {
                // console.log(error)
                dispatch(showMessage({message : error.response.data.message}))
            }
        }
    }


    const handleDeleteProjet = async () => {
        const confirmation = window.confirm(`Vous voulez vraiment supprimer le projet ${nomProjet}`)
        if (confirmation) {
            await axios.delete(`http://localhost:4000/api/projet/delete/${id}`, data)
            dispatch(showMessage({message : 'Projet supprimé avec succés.'}))
            navigate('/business/manage/project')
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
                        to="/business/manage/project"
                        color="inherit"
                    >
                        <FuseSvgIcon size={20}>
                            {theme.direction === 'ltr'
                                ? 'heroicons-outline:arrow-sm-left'
                                : 'heroicons-outline:arrow-sm-right'}
                        </FuseSvgIcon>
                        <span className="flex mx-4 font-medium">Projet</span>
                    </Typography>
                </motion.div>
                <div className="flex items-center max-w-full">
                    <motion.div
                        className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                        initial={{ x: -20 }}
                        animate={{ x: 0, transition: { delay: 0.3 } }}
                    >
                        <Typography className="text-16 sm:text-20 truncate font-semibold">{nomProjet || 'Nouvelle Projet'} </Typography>
                        <Typography variant="caption" className="font-medium"> Détail du projet </Typography>
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
                        onClick={handleDeleteProjet}
                    >
                        Supprimer
                    </Button>
                )}
                <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleSaveProject}
                >
                    Enregistrer
                </Button>
            </motion.div>

        </div>
    )
}

export default ProjetItemHeader

