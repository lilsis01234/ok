import { useTheme } from '@mui/styles';
import { showMessage } from 'app/store/fuse/messageSlice';
import { selectUser } from 'app/store/userSlice';
import axios from 'axios';
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

function DemandeFormationFormHeader({formValues}) {
    const methods = useFormContext();

    const {formState, watch, getValues, handleSubmit} = methods ? methods : {};
    const { isValid, isDirty } = formState ? formState : {}

    const theme = useTheme();
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    
    const user = useSelector(selectUser)
    // console.log(user);
 
    const {titre, detail, auteur, typeFormation, critereTypeFormation} = formValues

    const data = {
        titre, 
        detail, 
        auteur : user?.Profil_Collab?.id, 
        typeFormation, 
        critereTypeFormation
    }


    const handleSaveDemande = async() => {
        if(!titre || !detail || !typeFormation){
            dispatch(showMessage({message : 'Veuillez remplir toutes les champs obligatoire'}))
        } else if (id){

        } else {
            axios.post('http://localhost:4000/api/demande_formation/add', )
        }
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
                            <span className="flex mx-4 font-medium">Mes demandes</span>
                        </Typography>
                    </motion.div>
                    <div className="flex items-center max-w-full">
                        <motion.div
                            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                            initial={{ x: -20 }}
                            animate={{ x: 0, transition: { delay: 0.3 } }}
                        >
                            <Typography className="text-16 sm:text-20 truncate font-semibold">{nom || 'Nouveau demande'} </Typography>
                            <Typography variant="caption" className="font-medium"> Détail du demande</Typography>
                        </motion.div>
                    </div>
                </div>
                <motion.div
                    className="flex"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
                >
                    {/* {id && (
                        <Button
                            className="whitespace-nowrap mx-4"
                            variant="contained"
                            color="error"
                            //  disabled={!isDirty  || !isValid}
                            onClick={handleArchiveCollaborateur}
                        >
                            Archiver
                        </Button>
                    )} */}
                    <Button
                        className="whitespace-nowrap mx-4"
                        variant="contained"
                        color="secondary"
                        //  disabled={!isDirty  || !isValid}
                        // onClick={handleSaveCollaborateur}
                    >
                        Enregistrer
                    </Button>
                </motion.div>
            </div>
        </>
  )
}

export default DemandeFormationFormHeader
