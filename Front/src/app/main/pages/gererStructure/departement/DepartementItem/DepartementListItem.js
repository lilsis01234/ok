import React, {useState, useEffect} from 'react'
import { useParams, Link} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { Button, Tabs, Tab } from '@mui/material';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import DepartementItemHeader from './DepartementItemHeader';
import BasicDepartementInfo from './tabs/BasicDepartementInfo';
const { useThemeMediaQuery, useDeepCompareEffect } = require("@fuse/hooks");
const { useForm, FormProvider } = require("react-hook-form");
const { yupResolver } = require("@hookform/resolvers/yup");

const schema = yup.object().shape({
    nomDepartement: yup
        .string()
        .required('You must enter a departement name')
    // .min(5, 'The product name must be at least 5 characters'),
});

function DepartementListItem(props) {
    const { departementId } = useParams();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [tabValue, setTabValue] = useState(0);
    const [noDepartement, setNoDepartement] = useState(false);

    const [departement, setDepartement] = useState([])

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    })

    const { reset, watch, control, onChange, fomState } = methods || {};
    const form = watch();

    // console.log(form)

    useEffect(() => {
        async function fetchData() {
            try {
                if (departementId === 'new') {
                    console.log('Ajout d\'un nouvelle departement')
                    setNoDepartement(false)
                }
                else {
                    console.log('Affichage d\'un  departement existante')
                    axios.get(`http://localhost:4000/api/departement/view/${departementId}`)
                        .then(response => {
                            setDepartement(response.data.departement)
                            setNoDepartement(false)
                        })
                        .catch(error => {
                            setNoDepartement(true)
                        })
                }

            } catch (error) {
                console.error('Error fetching departement data:', error);
                setNoDepartement(true);
            }
        }
        fetchData();
    }, [departementId])

    // useEffect(() => {
    //     if(!departement){
    //         return;
    //     }
    //     reset(departement);
    // }, [departement, reset])

    useEffect(() => {
        if (departement && Object.keys(departement).length > 0) {
            const { id, nomDepartement, direction } = departement;
            reset({ id, nomDepartement, direction }); 
        }
    }, [departement, reset]);

    


    
    useEffect(() => {
        return () => {
            setDepartement(null);
            setNoDepartement(false);
        }
    }, [])

    function handleTabChange(event, value){
        setTabValue(value)
    }


    if (noDepartement){
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    There is no such departement!
                </Typography>
                <Button
                     className="mt-24"
                     component={Link}
                     variant="outlined"
                     to="/business/manage/departement"
                     color="inherit"
                >
                    Go To Departements Page
                </Button>
            </motion.div>
        )
    }


    return (
       <FormProvider {...methods}>
            <FusePageCarded 
                header = {<DepartementItemHeader formValues={form}/>}
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
                            <Tab className="h-64" label="Basic Departement Info" />
                        </Tabs>
                        <div className="p-16 sm:p-24 max-w-3xl">
                            <div className={tabValue !== 0 ? 'hidden' : ''}>
                                <BasicDepartementInfo methods={methods} formValues={form}/>
                            </div>
                        </div>   
                    </>
                }
                scroll={isMobile ? 'normal' : 'content'}
            />
       </FormProvider>
    )
}

export default DepartementListItem
