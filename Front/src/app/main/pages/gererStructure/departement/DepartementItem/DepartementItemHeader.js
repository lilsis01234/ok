import { useTheme } from '@mui/styles';
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { Button, Typography } from '@mui/material';
import axios from 'axios';

function DepartementItemHeader({ formValues }) {
    const methods = useFormContext();
    const { formState, watch, getValues } = methods ? methods : {};
    const { isValid, isDirty } = formState ? formState : {}

    const { id } = formValues
    const { nomDepartement } = formValues
    const { direction } = formValues

    const theme = useTheme();
    const navigate = useNavigate();

    const data = {
        nomDepartement,
        direction
    }

    // console.log(id)

    const handleSaveDirection = async () => {
        if (id) {
            try {
                await axios.put(`http://localhost:4000/api/departement/edit/${id}`, data)
                alert('Departement Update succesfully')
                navigate('/business/manage/departement')
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await axios.post('http://localhost:4000/api/departement/new', data)
                alert('Departement create succesfully')
                navigate('/business/manage/departement')
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleDeleteDepartement = async () =>{
        const confirmation = window.confirm(`Vous voulez vraiment supprimer le département ${nomDepartement}`)
        if(confirmation){
            await axios.delete(`http://localhost:4000/api/departement/delete/${id}`, data)
            alert('Département supprimée avec succès')
            navigate('/business/manage/departement')
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
                        to="/business/manage/departement"
                        color="inherit"
                    >
                        <FuseSvgIcon size={20}>
                            {theme.direction === 'ltr'
                                ? 'heroicons-outline:arrow-sm-left'
                                : 'heroicons-outline:arrow-sm-right'}
                        </FuseSvgIcon>
                        <span className="flex mx-4 font-medium">Departement</span>
                    </Typography>
                </motion.div>
                <div className="flex items-center max-w-full">
                    <motion.div
                        className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                        initial={{ x: -20 }}
                        animate={{ x: 0, transition: { delay: 0.3 } }}
                    >
                        <Typography className="text-16 sm:text-20 truncate font-semibold">{nomDepartement || 'Nouveau Département'} </Typography>
                        <Typography variant="caption" className="font-medium"> Détail du département</Typography>
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
                        onClick={handleDeleteDepartement}
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

export default DepartementItemHeader
