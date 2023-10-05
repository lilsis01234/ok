const { default: FuseLoading } = require("@fuse/core/FuseLoading/FuseLoading");
const { default: FusePageCarded } = require("@fuse/core/FusePageCarded/FusePageCarded");
const { useThemeMediaQuery, useDeepCompareEffect } = require("@fuse/hooks");
const { yupResolver } = require("@hookform/resolvers/yup");
const { Typography } = require("@mui/material");
const { useState, useEffect } = require("react");
const { useForm, FormProvider } = require("react-hook-form");
const { useParams, Link } = require("react-router-dom");


const schema = yup.object().shape({
    name: yup
        .string()
        .required('You must enter a product name')
        .min(5, 'The product name must be at least 5 characters'),
});

function DirectionItem(props) {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const routeParams = useParams;
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


    useDeepCompareEffect(() => {
        function updatedDirectionState() {
            const { id } = routeParams;
            if (id === 'new') {
                console.log('Ajout d\'un nouvelle direction')
            } else {
                console.log('Affichage d\'un  direction existante')
            }

        }

        updatedDirectionState()
    }, [routeParams])


    function handleTabChange(event, value) {
        setTabValue(value)
    }

    if (noProduct) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    There is no such product!
                </Typography>
                <Button
                    className="mt-24"
                    component = {Link}
                    variant="outlined"
                    // to="/apps/e-commerce/products"
                    color="inherit"
                >
                    Go To Directions Page
                </Button>
            </motion.div>
        )
    }


    if(
        _.isEmpty(form) || (direction && routeParams.id !== direction.id && routeParams.id !== 'new')
    ){
        return <FuseLoading/>
    }

    return (
        <FormProvider {...methods}>
            <FusePageCarded />
        </FormProvider>
    )

   



















}