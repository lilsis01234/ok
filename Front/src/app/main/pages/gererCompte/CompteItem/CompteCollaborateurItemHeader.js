import axios from 'axios';
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { useTheme } from '@mui/styles';

function CompteCollaborateurItemHeader({ formValues }) {
    const methods = useFormContext()
    const { formState, watch, getValues } = methods ? methods : {};
    const { isValid, isDirty } = formState ? formState : {}

    const {id, Collab, ProfileRoleHierarchiqueId } = formValues
    const theme = useTheme();

    const navigate = useNavigate();
    console.log(Collab)

    const data = { ProfileRoleHierarchiqueId }

    const handleSaveCompteCollaborateur = async () => {
        axios.put(`http://localhost:4000/api/compte_collaborateur/${id}/edit`, data)
            .then(response => {
                alert('Le rôle de l\'utilisateur a été mise à jour avec succès')
                console.log(response)
                navigate('/manage/account')
            })
            .catch(error => {
                console.log(error)
            })
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
                            to="/manage/account"
                            color="inherit"
                        >
                            <FuseSvgIcon size={20}>
                                {theme.direction === 'ltr'
                                    ? 'heroicons-outline:arrow-sm-left'
                                    : 'heroicons-outline:arrow-sm-right'}
                            </FuseSvgIcon>
                            <span className="flex mx-4 font-medium">Comptes collaborateurs</span>
                        </Typography>
                    </motion.div>
                    <div className="flex items-center max-w-full">
                        <motion.div
                            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                            initial={{ x: -20 }}
                            animate={{ x: 0, transition: { delay: 0.3 } }}
                        >
                            <Typography className="text-16 sm:text-20 truncate font-semibold"> {Collab?.nom} {Collab?.prenom}  </Typography>
                            <Typography variant="caption" className="font-medium"> Détail du compte collaborateur</Typography>
                        </motion.div>
                    </div>
                </div>
                <motion.div
                    className="flex"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
                >
                    <Button
                        className="whitespace-nowrap mx-4"
                        variant="contained"
                        color="secondary"
                        //  disabled={!isDirty  || !isValid}
                        onClick={handleSaveCompteCollaborateur}
                    >
                        Enregistrer
                    </Button>
                </motion.div>
            </div>
        </>
    )
}

export default CompteCollaborateurItemHeader
