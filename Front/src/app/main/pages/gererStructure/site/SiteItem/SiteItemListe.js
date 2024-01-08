import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { Button, Tabs, Tab } from '@mui/material';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import SiteItemListeHeader from './SiteItemListeHeader';
import BasicSiteInfo from './tabs/BasicSiteInfo';
const { useThemeMediaQuery, useDeepCompareEffect } = require("@fuse/hooks");
const { useForm, FormProvider } = require("react-hook-form");
const { yupResolver } = require("@hookform/resolvers/yup");

const schema = yup.object().shape({
    nomSite: yup
        .string()
        .required('Vous devez entrer un nom du site')
    // .min(5, 'The product name must be at least 5 characters'),
});



function SiteItemListe() {
    const { siteId } = useParams();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [tabValue, setTabValue] = useState(0);
    const [noSite, setNoSite] = useState(false);

    const [site, setSite] = useState([])

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    })

    const { reset, watch, control, onChange, fomState } = methods || {};
    const form = watch();

    useEffect(() => {
        async function fetchData() {
            try {
                if (siteId === 'new') {
                    console.log('Ajout d\'un nouveau site')
                    setNoSite(false)
                }
                else {
                    console.log('Affichage d\'un  departement existante')
                    axios.get(`http://localhost:4000/api/site/view/${siteId}`)
                        .then(response => {
                            setSite(response.data.site)
                            setNoSite(false)
                        })
                        .catch(error => {
                            setNoSite(true)
                        })
                }

            } catch (error) {
                console.error('Erreur lors de la récupération du site:', error);
                setNoSite(true);
            }
        }
        fetchData();
    }, [siteId])

    useEffect(() => {
        if (site && Object.keys(site).length > 0) {
            const { id, nomSite } = site;
            reset({ id, nomSite });
        }
    }, [site, reset]);

    useEffect(() => {
        return () => {
            setSite(null);
            setNoSite(false);
        }
    }, [])


    function handleTabChange(event, value) {
        setTabValue(value)
    }


    if (noSite) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    Il n'y a pas de site!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/business/manage/site"
                    color="inherit"
                >
                    Retourner à la page Liste des sites.
                </Button>
            </motion.div>
        )
    }




    return (
        <FormProvider {...methods}>
            <FusePageCarded
                header = {<SiteItemListeHeader formValues={form}/>}
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
                            <Tab className="h-64" label="Information basique" />
                        </Tabs>
                        <div className="p-16 sm:p-24 max-w-3xl">
                            <div className={tabValue !== 0 ? 'hidden' : ''}>
                                <BasicSiteInfo methods={methods} formValues={form}/>
                            </div>
                        </div>
                    </>
                }
                scroll={isMobile ? 'normal' : 'content'}
            />
        </FormProvider>
    )
}

export default SiteItemListe
