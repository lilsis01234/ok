import FusePageCarded from '@fuse/core/FusePageCarded'
import { selectUser } from 'app/store/userSlice'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { useSelector } from 'react-redux'
const { useThemeMediaQuery, useDeepCompareEffect } = require("@fuse/hooks");
const { yupResolver } = require("@hookform/resolvers/yup");
const { Typography } = require("@mui/material");
const { useState, useEffect } = require("react");
const { useForm } = require("react-hook-form");
const { Link } = require("react-router-dom");
import { motion } from 'framer-motion';
import { Button, Tabs, Tab } from '@mui/material';
import * as yup from 'yup';
import axios from 'axios';
import BasicInfo from '../pages/gererCollaborateur/collaborateur/CollaborateurItem/tabs/BasicInfo'
import ContactInfo from '../pages/gererCollaborateur/collaborateur/CollaborateurItem/tabs/ContactInfo'
import AdresseInfo from '../pages/gererCollaborateur/collaborateur/CollaborateurItem/tabs/AdresseInfo'
import PictureCollab from '../pages/gererCollaborateur/collaborateur/CollaborateurItem/tabs/PictureCollab'
import MatrimonialeInfo from '../pages/gererCollaborateur/collaborateur/CollaborateurItem/tabs/MatrimonialeInfo'
import UpdateProfileHeader from './UpdateProfileHeader'

function UpdateProfile() {
    const user = useSelector(selectUser)
    const collabId = user.data?.photo?.id
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [tabValue, setTabValue] = useState(0);
    const [noCollab, setNoCollab] = useState(false);
    const [editData, setEditData] = useState(false);

    const [collab, setCollab] = useState([])

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
    })

    const { reset, watch, control, onChange, fomState } = methods || {};
    const form = watch();

    useEffect(() => {
        async function fetchData() {
            try {
                axios.get(`http://localhost:4000/api/collaborateur/view/${collabId}`)
                    .then(response => {
                        // console.log(response.data.collaborateur)
                        setCollab(response.data.collaborateur)
                        setNoCollab(false)
                        setEditData(true)
                    })
                    .catch(error => {
                        setNoCollab(true)
                    })
            } catch (error) {
                console.error('Error fetching collaborator data:', error);
            }
        }
        fetchData();
    }, [collabId])


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
                    to="/setting/account"
                    color="inherit"
                >
                    Retourner à la page précédante
                </Button>
            </motion.div>
        )
    }




    return (
        <FormProvider {...methods}>
            <FusePageCarded
                header={<UpdateProfileHeader formValues={form}/>}
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
                            <Tab className="h-64" label="Photo" />
                        </Tabs>
                        <div className="p-16 sm:p-24 max-w-3xl">
                            <div className={tabValue !== 0 ? 'hidden' : ''}>
                                <BasicInfo methods={methods} formValues={form} />
                            </div>
                            <div className={tabValue !== 1 ? 'hidden' : ''}>
                                <AdresseInfo methods={methods} formValues={form} />
                            </div>
                            <div className={tabValue !== 2 ? 'hidden' : ''}>
                                <ContactInfo methods={methods} formValues={form} isEdit={editData} />
                            </div>
                            <div className={tabValue !== 3 ? 'hidden' : ''}>
                                <MatrimonialeInfo methods={methods} formValues={form} />
                            </div>
                            <div className={tabValue !== 4 ? 'hidden' : ''}>
                                <PictureCollab methods={methods} formValues={form}/>
                            </div>
                        </div>
                    </>
                }
                scroll={isMobile ? 'normal' : 'content'}
            />
        </FormProvider>
    )
}

export default UpdateProfile
