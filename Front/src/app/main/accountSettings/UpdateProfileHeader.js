import { Modal, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useSelect } from '@mui/base';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from 'app/store/userSlice';
import JwtService from 'src/app/auth/services/jwtService';

function UpdateProfileHeader({ formValues }) {

    const methods = useFormContext();
    const { formState, watch, getValues } = methods ? methods : {};
    const { isValid, isDirty } = formState ? formState : {}

    const { id, nom, prenom, dateNaissance, lieuNaissance, sexe,
        lot, quartier, ville, adresse2, tel, tel2, telurgence,
        CIN, dateDelivrance, lieuDelivrance, statutmatrimoniale, nbEnfant,
        image, numCNAPS, matricule
    } = formValues

    const theme = useTheme();
    const navigate = useNavigate();

    const data = {
        id, nom, prenom, dateNaissance, lieuNaissance, sexe,
        lot, quartier, ville, adresse2, tel, tel2, telurgence,
        CIN, dateDelivrance, lieuDelivrance, statutmatrimoniale, nbEnfant,
        image, numCNAPS, matricule
    }

    //Pour mettre à jour le redux après le modification du profil
    const user = useSelector(selectUser)

    const userId = user.data?.CompteId
    const [userData, setUserData] = useState();
    const dispatch = useDispatch();

    const fetchUserDataConnected = () => {
        axios.get(`http://localhost:4000/api/user/${userId}/profile`)
        .then(response => {
            setUserData(response.data)
            console.log(response.data)
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des informations des utilisateurs connectés')
        })
    }

    useEffect(()=> {
       fetchUserDataConnected()
    }, [userId])


    const handleSaveCollaborateur = async () => {
        axios.put(`http://localhost:4000/api/collaborateur/${id}/edit`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                
                alert('Information collaborateur mise à jour avec succès')
                // console.log(response)
                // dispatch(setUser(userData))
                // window.location.reload()
                // JwtService.signInWithToken()
                navigate('/settings/account')
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
                            to="/settings/account"
                            color="inherit"
                        >
                            <FuseSvgIcon size={20}>
                                {theme.direction === 'ltr'
                                    ? 'heroicons-outline:arrow-sm-left'
                                    : 'heroicons-outline:arrow-sm-right'}
                            </FuseSvgIcon>
                            <span className="flex mx-4 font-medium">Retourner à la page précédante</span>
                        </Typography>
                    </motion.div>
                    <div className="flex items-center max-w-full">
                        <motion.div
                            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                            initial={{ x: -20 }}
                            animate={{ x: 0, transition: { delay: 0.3 } }}
                        >
                            <Typography className="text-16 sm:text-20 truncate font-semibold">{nom} {prenom}</Typography>
                            <Typography variant="caption" className="font-medium"> Mon profil</Typography>
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
                        onClick={handleSaveCollaborateur}
                    >
                        Enregistrer
                    </Button>
                </motion.div>
            </div>
        </>
    )
}

export default UpdateProfileHeader
