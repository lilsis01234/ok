const { default: FuseLoading } = require("@fuse/core/FuseLoading/FuseLoading");
const { default: FusePageCarded } = require("@fuse/core/FusePageCarded/FusePageCarded");
const { useThemeMediaQuery, useDeepCompareEffect } = require("@fuse/hooks");
const { yupResolver } = require("@hookform/resolvers/yup");
const { Typography } = require("@mui/material");
const { useState, useEffect } = require("react");
const { useForm, FormProvider } = require("react-hook-form");
const { useParams, Link } = require("react-router-dom");
import { motion } from 'framer-motion';
import {Button} from '@mui/material';
import * as yup from 'yup';
import axios from 'axios';


const schema = yup.object().shape({
    name: yup
        .string()
        .required('You must enter a product name')
        .min(5, 'The product name must be at least 5 characters'),
});


function DirectionListItem(props) {
    const {directionId} = useParams();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [tabValue, setTabValue] = useState(0);
    const [noDirection, setNoDirection] = useState(false);

    const [direction, setDirection] = useState([])

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    })

    const { reset, watch, control, onChange, fomState } = methods;
    const form = watch();

    const [loading, setLoading] = useState(false);


    //useDeeepCompareEffect est une variante de useEffect : comparee les valeurs de dépendances spécifiés avant de déclencher l'effet
    //compare reecursivement les valeurs pour détecter les changements profonds
    ///utiliser pour executer l'effet uniquement lorque les valeurs réelles changement 
    useEffect(() => {
        function updatedDirectionState() {
            if(directionId){
                if (directionId === 'new') {
                    console.log('Ajout d\'un nouvelle direction')
                } else {
                    console.log('Affichage d\'un  direction existante')
                    setNoDirection(true);
                }
            } else {
                setLoading(true);
            }
           
        }

        updatedDirectionState()
    }, [directionId])


    //Récupérer la direction depuis la base de données
    const fetchDirection = () =>{
        axios.get(`http://localhost:4000/api/direction/view/${directionId}`)
        .then(response => {
            setDirection(response.data)
            setNoDirection(false)
            setLoading(false)
        })
        .catch(error => {
            setNoDirection(true)
        })
    }

    useEffect(() => {
        fetchDirection();
    }, [])



    if(loading){
        return <FuseLoading/>
    }

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
                    component = {Link}
                    variant="outlined"
                    to="/business/manage/direction"
                    color="inherit"
                >
                    Go To Directions Page
                </Button>
            </motion.div>
        )
    }


    if(
        _.isEmpty(form) || (direction && directionId !== direction.id && directionId !== 'new')
    ){
        return <FuseLoading/>
    }

    return (
        <FormProvider {...methods}>
            <FusePageCarded 
                header = {<DirectionListItem/>}
                content = {
                    <>
                        <p>Editer la direction</p>
                    </>
                }
            />
        </FormProvider>
    )

}

export default DirectionListItem;