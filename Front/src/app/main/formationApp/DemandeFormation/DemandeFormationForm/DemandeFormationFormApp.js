import { useThemeMediaQuery } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import FusePageCarded from '@fuse/core/FusePageCarded';
import DemandeFormationFormHeader from './DemandeFormationFormHeader';

const schema = yup.object().shape({
    titre: yup.string().required('Veuillez entrer le titre de la demande'),
    detail: yup.date().required('Veuillez entrer les détails de la demande'),
    typeFormation: yup.string().required('Veuillez selectionner le type de formation'),
})


function DemandeFormationFormApp(props) {
    const { idDemande } = useParams();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [tabValue, setTabValue] = useState(0);
    const [noDemande, setNoDemande] = useState(false);
    const [editData, setEditData] = useState(false);

    const [demande, setDemande] = useState([])

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        suppressHydrationWarning: true,
        resolver: yupResolver(schema)
    })

    const { reset, watch, control, onChange, fomState, handleSubmit } = methods || {};
    const form = watch();

    useEffect(() => {
        async function fetchData() {
            try {
                if (idDemande === 'new') {
                    setNoDemande(false)
                    setEditData(false)
                }
            } catch (error) {
                console.error('Une erreur s\'est produit:', error)
                setNoDemande(true);
            }
        }
        fetchData();
    }, [idDemande])

    useEffect(() => {
        if (!demande) {
            return;
        }
        reset(demande);
    }, [demande, reset])



    useEffect(() => {
        return () => {
            setDemande(null);
            setNoDemande(false)
        }
    }, [])


    function handleTabChange(event, value) {
        setTabValue(value)
    }

    if (noDemande) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    Il n'y a pas de demande de ce type
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    // to="/manage/collaborator"
                    color="inherit"
                >
                    Retourner à la liste des demandes
                </Button>
            </motion.div>
        )
    }





    return (
       <FormProvider {...methods}>
            <FusePageCarded
                header = {<DemandeFormationFormHeader formValues={form}/>}
                content={
                    <>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            indicatorColor="secondary"
                            textColor="secondary"
                            variant="scrollable"
                            scrollButtons="auto"
                            classes={{ root: 'w-full h-64 border-b-1' }}
                        >
                            <Tab className="h-64" label="Information sur la demande"/>
                        </Tabs>
                        <div className="p-16 sm:p-24 max-w-3xl">

                        </div>
                    </>
                }
            />
       </FormProvider>
    )
}

export default DemandeFormationFormApp
