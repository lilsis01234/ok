import { Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

function DirectionItemHeader({ formValues }) {
    const methods = useFormContext();
    const { formState, watch, getValues } = methods ? methods : {};
    const { isValid, isDirty } = formState ? formState : {}

    const { id } = formValues
    const { nomDirection } = formValues


    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const data = {
        nomDirection
    }

    const handleSaveDirection = async () => {
        if(!nomDirection){
            dispatch(showMessage({message : 'Veuillez remplir toutes les champs obligatoires (*).'}))
        } else if (id) {
            try {
                await axios.put(`http://localhost:4000/api/direction/edit/${id}`, data)
                dispatch(showMessage({message : 'Direction modifiée avec succés.'}))
                // alert('Direction modifié avec succès')
                navigate('/business/manage/direction')
            } catch (error) {
                // console.log(error)
                dispatch(showMessage({message : error.response.data.message}))
            }
        } else {
            try {
                await axios.post('http://localhost:4000/api/direction/new', data)
                dispatch(showMessage({message : 'Direction crée avec succés.'}))
                // alert('Direction crée avec succés')
                navigate('/business/manage/direction')
            } catch (error) {
                console.log(error)
                dispatch(showMessage({message : error.response.data.message}))
            }
        }
    }

    const handleDeleteDirection = async () => {
        const confirmation = window.confirm(`Vous voulez vraiment supprimer la direction ${nomDirection}`)
        if (confirmation) {
            await axios.delete(`http://localhost:4000/api/direction/delete/${id}`, data)
            alert('Direction supprimée avec succès')
            navigate('/business/manage/direction')
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
                        to="/business/manage/direction"
                        color="inherit"
                    >
                        <FuseSvgIcon size={20}>
                            {theme.direction === 'ltr'
                                ? 'heroicons-outline:arrow-sm-left'
                                : 'heroicons-outline:arrow-sm-right'}
                        </FuseSvgIcon>
                        <span className="flex mx-4 font-medium">Direction</span>
                    </Typography>
                </motion.div>
                <div className="flex items-center max-w-full">
                    <motion.div
                        className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                        initial={{ x: -20 }}
                        animate={{ x: 0, transition: { delay: 0.3 } }}
                    >
                        <Typography className="text-16 sm:text-20 truncate font-semibold">{nomDirection || 'Nouvelle direction'} </Typography>
                        <Typography variant="caption" className="font-medium"> Détail de la direction </Typography>
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
                        onClick={handleDeleteDirection}
                    >
                        Supprimer
                    </Button>
                )}
                <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    //  disabled={!isDirty  || !isValid}
                    onClick={handleSaveDirection}
                >
                    Enregistrer
                </Button>
            </motion.div>
        </div>
    )
}

export default DirectionItemHeader
