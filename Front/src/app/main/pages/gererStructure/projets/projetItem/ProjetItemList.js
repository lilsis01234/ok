import { useThemeMediaQuery } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { Button, Tabs, Tab } from '@mui/material';
import * as yup from 'yup';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import ProjectItemHeader from './ProjetItemHeader'
import BasicInfoProject from './tabs/BasicInfoProject';

const schema = yup.object().shape({
    nomProjet: yup
        .string()
        .required('You must enter a project name')
    // .min(5, 'The product name must be at least 5 characters'),
});

function ProjetItemList(props) {
    const {projectId} = useParams();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [tabValue, setTabValue] = useState(0);
    const [noProjet, setNoProjet] = useState(false);

    const [projet, setProjet] = useState([])

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver : yupResolver(schema)
    })

    const { reset, watch, control, onChange, formState } = methods || {};
    const form = watch();

    // console.log(projectId)



    useEffect(() => {
        async function fetchData() {
            try {
                if (projectId === 'new') {
                    console.log('Ajout d\'un nouvelle projet')
                    setNoProjet(false)
                } else {
                    console.log('Affichage d\'un projet existante')
                    axios.get(`http://localhost:4000/api/projet/view/${projectId}`)
                       .then(response => {
                           setProjet(response.data.projet)
                        //    console.log(response.data.projet)
                           setNoProjet(false)
                       })
                       .catch(error => {
                           setNoProjet(true)
                       })
                }
            } catch (error) {
                console.error('Error fetching Project data:', error);
                setNoProjet(true);
            }
        }
        fetchData();
    }, [projectId])


    useEffect(() => {
        if(projet && Object.keys(projet).length > 0){
            const {id, nomProjet, departement} = projet
            reset({id, nomProjet, departement})
        }
    }, [projet, reset])

    useEffect(()=>{
        return() => {
            setProjet(null)
            setNoProjet(false) 
        }
    })

    function handleTabChange(event, value){
        setTabValue(value)
    }

    if (noProjet){
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    There is no such project!
                </Typography>
                <Button
                     className="mt-24"
                     component={Link}
                     variant="outlined"
                     to="/business/manage/project"
                     color="inherit"
                >
                    Go To projects Page
                </Button>
            </motion.div>
        )
    }




  return (
    <FormProvider {...methods}>
        <FusePageCarded
            header = {<ProjectItemHeader formValues={form}/>}
            content = {
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
                         <Tab className="h-64" label="Basic Project Info" />
                    </Tabs>
                    <div className="p-16 sm:p-24 max-w-3xl">
                        <div className={tabValue !== 0 ? 'hidden' : ''}>
                            <BasicInfoProject methods={methods} formValues={form}/>
                        </div>
                    </div>
                </>
            }
            scroll={isMobile ? 'normal' : 'content'}
        />
    </FormProvider>
  )
}

export default ProjetItemList
