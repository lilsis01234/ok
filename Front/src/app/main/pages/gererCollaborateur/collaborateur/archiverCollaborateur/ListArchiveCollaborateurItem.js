import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typography, Button, Tab, Tabs } from '@mui/material';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import BasicInfo from '../CollaborateurItem/tabs/BasicInfo';
import AdresseInfo from '../CollaborateurItem/tabs/AdresseInfo';
import ContactInfo from '../CollaborateurItem/tabs/ContactInfo';
import MatrimonialeInfo from '../CollaborateurItem/tabs/MatrimonialeInfo';
import ProfessionalInfo from '../CollaborateurItem/tabs/ProfessionalInfo';
import SecondProfessionalInfo from '../CollaborateurItem/tabs/secondProfessionalInfo';
import ArchiveTabs from './tabs/archiveTabs';
import { useThemeMediaQuery } from '@fuse/hooks';
import ListeArchiveCollaborateurItemHeader from './ListeArchiveCollaborateurItemHeader';


function ListArchiveCollaborateurItem(props) {
    const { collaborateurId } = useParams();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [tabValue, setTabValue] = useState(0);
    const [noCollab, setNoCollab] = useState(false);

    const [collab, setCollab] = useState([])

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        // resolver: yupResolver(schema)
    })

    const { reset, watch, control, onChange, fomState } = methods || {};
    const form = watch();

    useEffect(() => {
        async function fetchData() {
            try {
                axios.get(`http://localhost:4000/api/archive/view/${collaborateurId}`)
                    .then(response => {
                        setCollab(response.data.collaborateur)
                        setNoCollab(false)
                    })
                    .catch(error => {
                        setNoCollab(true)
                    })
            } catch (error) {
                console.error('Error fetching collaborator data:', error);
                setNoCollab(true);
            }
        }
        fetchData();
    }, [collaborateurId])

    useEffect(() => {
        if (!collab) {
            return;
        }
        reset(collab);
    }, [collab, reset])


    useEffect(() => {
        return () => {
            setCollab(null);
            setNoCollab(false);
        }
    }, [])

    function handleTabChange(event, value) {
        setTabValue(value)
    }

    if (noCollab) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    Il n'y a pas de collaborateur de ce type !
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/manage/archive/collaborateur"
                    color="inherit"
                >
                    Retourner à la liste archive des collaborateurs
                </Button>
            </motion.div>
        )
    }




    return (
        <FormProvider  {...methods}>
            <FusePageCarded
                header={<ListeArchiveCollaborateurItemHeader formValues={form}/>}
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
                            <Tab className="h-64" label="Etat civil" />
                            <Tab className="h-64" label="Adresse" />
                            <Tab className="h-64" label="Contact" />
                            <Tab className="h-64" label="Information matrimoniale" />
                            <Tab className="h-64" label="Information professionnelle" />
                            <Tab className="h-64" label="Deuxième information professionnelle" />
                            <Tab className="h-64" label="Archive" />
                        </Tabs>
                        <div className="p-16 sm:p-24 max-w-3xl">
                            <div className={tabValue !== 0 ? 'hidden' : ''}>
                                <BasicInfo methods={methods} formValues={form} />
                            </div>
                            <div className={tabValue !== 1 ? 'hidden' : ''}>
                                <AdresseInfo methods={methods} formValues={form} />
                            </div>
                            <div className={tabValue !== 2 ? 'hidden' : ''}>
                                <ContactInfo methods={methods} formValues={form} />
                            </div>
                            <div className={tabValue !== 3 ? 'hidden' : ''}>
                                <MatrimonialeInfo methods={methods} formValues={form} />
                            </div>
                            <div className={tabValue !== 4 ? 'hidden' : ''}>
                                <ProfessionalInfo methods={methods} formValues={form} />
                            </div>
                            <div className={tabValue !== 5 ? 'hidden' : ''}>
                                <SecondProfessionalInfo methods={methods} formValues={form} />
                            </div>
                            <div className={tabValue !== 6 ? 'hidden' : ''}>
                                <ArchiveTabs methods={methods} formValues={form} />
                            </div>
                        </div>
                    </>
                }
            />

        </FormProvider>
    )
}

export default ListArchiveCollaborateurItem
