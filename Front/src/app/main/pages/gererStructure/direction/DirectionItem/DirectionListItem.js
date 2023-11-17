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
import DirectionItemHeader from './DirectionItemHeader'
import BasicDirectionInfoTab from './tabs/BasicDirectionInfoTab';


const schema = yup.object().shape({
    nomDirection: yup
        .string()
        .required('You must enter a direction name')
    // .min(5, 'The product name must be at least 5 characters'),
});


function DirectionListItem(props) {
    const { directionId } = useParams();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [tabValue, setTabValue] = useState(0);
    const [noDirection, setNoDirection] = useState(false);

    const [direction, setDirection] = useState([])

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    })

    
    const { reset, watch, control, onChange, fomState } =  methods || {};
    const form = watch();
    // console.log(form)


    useEffect(() => {
        async function fetchData() {
            try {
                if (directionId === 'new') {
                    console.log('Ajout d\'un nouvelle direction')
                    setNoDirection(false)

                } else {
                    console.log('Affichage d\'un  direction existante')
                    axios.get(`http://localhost:4000/api/direction/view/${directionId}`)
                        .then(response => {
                            setDirection(response.data.direction)
                            setNoDirection(false)
                        })
                        .catch(error => {
                            setNoDirection(true)
                        })
                }
            } catch (error) {
                console.error('Error fetching direction data:', error);
                setNoDirection(true);
            }
        }
        fetchData();
    }, [directionId])

    useEffect(() => {
        if(!direction){
            return;
        }
        reset(direction);
    }, [direction, reset])

    // console.log(form)

    // useEffect(() => {
    //     console.log('Valeurs de direction:', direction)
    //     console.log('Valeurs de formulaire:', form)
    // }, [direction, form])


    useEffect(() => {
        return () => {
            setDirection(null);
            setNoDirection(false);
        }
    }, [])

    function handleTabChange(event, value) {
        setTabValue(value)
    }

    if (noDirection) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    There is no such direction!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/business/manage/direction"
                    color="inherit"
                >
                    Go To Directions Page
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
                header={<DirectionItemHeader formValues={form}/>}
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
                            <Tab className="h-64" label="Basic Direction Info" />
                        </Tabs>
                        <div className="p-16 sm:p-24 max-w-3xl">
                            <div className={tabValue !== 0 ? 'hidden' : ''}>
                                <BasicDirectionInfoTab methods={methods} formValues={form}/>
                            </div>
                        </div>
                    </>
                }
                scroll={isMobile ? 'normal' : 'content'}
            />
        </FormProvider>
    )

}

export default DirectionListItem;