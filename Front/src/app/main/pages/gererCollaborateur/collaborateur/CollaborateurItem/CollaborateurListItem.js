const { default: FuseLoading } = require("@fuse/core/FuseLoading/FuseLoading");
const { default: FusePageCarded } = require("@fuse/core/FusePageCarded/FusePageCarded");
const { useThemeMediaQuery, useDeepCompareEffect } = require("@fuse/hooks");
const { yupResolver } = require("@hookform/resolvers/yup");
const { Typography } = require("@mui/material");
const { useState, useEffect } = require("react");
const { useForm, FormProvider } = require("react-hook-form");
const { useParams, Link } = require("react-router-dom");
import { motion } from 'framer-motion';
import { Button, Tabs, Tab } from '@mui/material';
import * as yup from 'yup';
import axios from 'axios';
import CollaborateurItemHeader from './CollaborateurItemHeader';
import BasicInfo from './tabs/BasicInfo'
import AdresseInfo from './tabs/AdresseInfo';
import ContactInfo from './tabs/ContactInfo';
import MatrimonialeInfo from './tabs/MatrimonialeInfo';
import ProfessionalInfo from './tabs/ProfessionalInfo';
import SecondProfessionalInfo from './tabs/secondProfessionalInfo';
import PictureCollab from './tabs/PictureCollab';



const schema = yup.object().shape(
    // {
    // matricule: yup
    //     .string()
    //     .required('Veuillez entrer une matricule')
    // }, 
    {
        nom : yup
            .string()
            .required('Veuillez entrer un nom')
    }, {
       dateEmbauche : yup
            .date()
            .required('Veuillez entrer une date d\'embauche') 
    }, {
        poste : yup
             .string()
             .required('Veuillez entrer une poste') 
     }, {
        departement : yup
             .string()
             .required('Veuillez entrer un département') 
     },
);


function CollaborateurListItem(props) {
    const { collaborateurId } = useParams();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [tabValue, setTabValue] = useState(0);
    const [noCollab, setNoCollab] = useState(false);
    const [editData, setEditData] = useState(false);

    const [collab, setCollab] = useState([])

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        suppressHydrationWarning: true,
        resolver: yupResolver(schema)
    })

    
    const { reset, watch, control, onChange, fomState } =  methods || {};
    const form = watch();


    useEffect(() => {
        async function fetchData() {
            try {
                if (collaborateurId === 'new') {
                    console.log('Ajout d\'un nouvelle collaborateur')
                    setNoCollab(false)
                    setEditData(false)
                } else {
                    console.log('Affichage d\'une collaborateur existante')
                    axios.get(`http://localhost:4000/api/collaborateur/view/${collaborateurId}`)
                        .then(response => {
                            // console.log(response.data.collaborateur)
                            setCollab(response.data.collaborateur)
                            setNoCollab(false)
                            setEditData(true)
                        })
                        .catch(error => {
                            setNoCollab(true)
                        })
                }
            } catch (error) {
                console.error('Error fetching collaborator data:', error);
                setNoCollab(true);
            }
        }
        fetchData();
    }, [collaborateurId])

    useEffect(() => {
        if(!collab){
            return;
        }
        reset(collab);
    }, [collab, reset])

    // console.log(form)

    // useEffect(() => {
    //     console.log('Valeurs de direction:', direction)
    //     console.log('Valeurs de formulaire:', form)
    // }, [direction, form])


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
                    to="/manage/collaborator"
                    color="inherit"
                >
                   Retourner à la liste des collaborateurs
                </Button>
            </motion.div>
        )
    }


    // if (
    //      _.isEmpty(form) || (direction && directionId !== String(direction.id) && directionId !== 'new')
    //     //  (direction && directionId !== String(direction.direction?.id) && directionId !== 'new')
    // ) {
    //     return <FuseLoading />
    // }

    return (
        <FormProvider {...methods}>
            <FusePageCarded
                header={<CollaborateurItemHeader formValues={form}/>}
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
                            <Tab className="h-64" label="Photo" />
                        </Tabs>
                        <div className="p-16 sm:p-24 max-w-3xl">
                            <div className={tabValue !== 0 ? 'hidden' : ''}>
                                <BasicInfo methods={methods} formValues={form}/>
                            </div>
                            <div className={tabValue !== 1 ? 'hidden' : ''}>
                                <AdresseInfo methods={methods} formValues={form}/>
                            </div>
                            <div className={tabValue !== 2 ? 'hidden' : ''}>
                                <ContactInfo methods={methods} formValues={form} isEdit={editData}/>
                            </div>
                            <div className={tabValue !== 3 ? 'hidden' : ''}>
                                <MatrimonialeInfo methods={methods} formValues={form}/>
                            </div>
                            <div className={tabValue !== 4 ? 'hidden' : ''}>
                                <ProfessionalInfo methods={methods} formValues={form}/>
                            </div>
                            <div className={tabValue !== 5 ? 'hidden' : ''}>
                                <SecondProfessionalInfo methods={methods} formValues={form}/>
                            </div>
                            <div className={tabValue !== 6 ? 'hidden' : ''}>
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

export default CollaborateurListItem;