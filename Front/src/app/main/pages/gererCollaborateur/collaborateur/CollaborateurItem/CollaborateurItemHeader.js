import { Modal, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

function CollaborateurItemHeader({ formValues }) {
    const methods = useFormContext();
    const { formState, watch, getValues, handleSubmit } = methods ? methods : {};
    const { isValid, isDirty } = formState ? formState : {}

    const { id, nom, prenom, dateNaissance, lieuNaissance, sexe,
        lot, quartier, ville, adresse2, tel, tel2, telurgence,
        CIN, dateDelivrance, lieuDelivrance, statutmatrimoniale, nbEnfant,
        dateEmbauche, site, image, entreprise, numCNAPS, shift, poste, poste2,
        departement, departement2, projet, projet2, equipe, equipe2, email, matricule
    } = formValues

    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const data = {
        nom, prenom, dateNaissance, lieuNaissance, sexe,
        lot, quartier, ville, adresse2, tel, tel2, telurgence,
        CIN, dateDelivrance, lieuDelivrance, statutmatrimoniale, nbEnfant,
        dateEmbauche, site, image, entreprise, numCNAPS, shift, poste, poste2,
        departement, departement2, projet, projet2, equipe, equipe2, email, matricule
    }



    const handleSaveCollaborateur = async () => {
        if(!nom || !dateNaissance || !lot || !quartier || !ville ||
            !tel || !CIN || !dateDelivrance ||!lieuDelivrance || !matricule ||
                !dateEmbauche || !poste || !departement
        ){
            dispatch(showMessage({message : 'Veuillez remplir toutes les champs obligatoires (*).'}))
        } else if (id) {
            axios.put(`http://localhost:4000/api/collaborateur/${id}/edit`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    dispatch(showMessage({message : 'Information collaborateur mise à jour avec succès.'}))
                    // console.log(response)
                    navigate('/manage/collaborator')
                })
                .catch(error => {
                    dispatch(showMessage({message : error.response.data.message}))
                    // console.log(error)
                })
        } else {
            axios.post('http://localhost:4000/api/collaborateur/new', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    dispatch(showMessage({message : 'Collaborateur ajouté avec succès.'}))
                    // console.log(response)
                    navigate('/manage/collaborator')
                })
                .catch(error => {
                    // console.log(error)
                    dispatch(showMessage({message : error.response.data.message}))
                })
        }
    }

    const handleArchiveCollaborateur = async () => {
        navigate(`/manage/collaborator/archive/${id}`)
    }







    return (
        <>
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
                            to="/manage/collaborator"
                            color="inherit"
                        >
                            <FuseSvgIcon size={20}>
                                {theme.direction === 'ltr'
                                    ? 'heroicons-outline:arrow-sm-left'
                                    : 'heroicons-outline:arrow-sm-right'}
                            </FuseSvgIcon>
                            <span className="flex mx-4 font-medium">Collaborateurs</span>
                        </Typography>
                    </motion.div>
                    <div className="flex items-center max-w-full">
                        <motion.div
                            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                            initial={{ x: -20 }}
                            animate={{ x: 0, transition: { delay: 0.3 } }}
                        >
                            <Typography className="text-16 sm:text-20 truncate font-semibold">{nom || 'Nouveau collaborateur'} </Typography>
                            <Typography variant="caption" className="font-medium"> Détail du collaborateur</Typography>
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
                            onClick={handleArchiveCollaborateur}
                        >
                            Archiver
                        </Button>
                    )}
                    <Button
                        className="whitespace-nowrap mx-4"
                        variant="contained"
                        color="secondary"
                        //  disabled={!isDirty  || !isValid}
                        onClick={handleSaveCollaborateur}
                    >
                        Enregistrer
                    </Button>
                </motion.div>
            </div>
        </>
    )
}

export default CollaborateurItemHeader
