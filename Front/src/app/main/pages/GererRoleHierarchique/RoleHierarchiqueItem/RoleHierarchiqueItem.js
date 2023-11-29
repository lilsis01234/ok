import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import { Tab, Tabs } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import RoleHierarchiqueHeader from './RoleHierarchiqueHeader'
import BasicInfoRole from './tabs/BasicInfoRole'

function RoleHierarchiqueItem(props) {
    const { roleId } = useParams()
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [tabValue, setTabValue] = useState(0);
    const [noRoleHierarchique, setNoRoleHierarchique] = useState(false);

    const [role, setRole] = useState([])

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {}
    })

    const { reset, watch, control, onChange, formState } = methods || {}
    const form = watch();

    useEffect(() => {
        async function fetchData() {
            try {
                if (roleId === 'new') {
                    console.log('Ajout d\'une nouvelle role')
                    setNoRoleHierarchique(false)
                } else {
                    console.log('Affichage d`une poste existante')
                    axios.get(`http://localhost:4000/api/roleHierarchique/view/${roleId}`)
                        .then(response => {
                            setNoRoleHierarchique(false)
                            setRole(response.data)
                        })
                        .catch(error => {
                            setNoRoleHierarchique(true)
                        })
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
                setNoPoste(true);
            }

        }
        fetchData();
    }, [roleId])

    useEffect(() => {
        if (role && Object.keys(role).length > 0) {
            const { id, roleHierarchique, RoleId } = role;
            reset({ id, roleHierarchique, RoleId });
        }
    }, [role, reset])

    function handleTabChange(event, value) {
        setTabValue(value);
    }

    if (noRoleHierarchique) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    {" "}
                    Il n'y a pas de rôle hierarchiques{" "}
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/manage/role"
                    color="inherit"
                >
                    {" "}
                   Retourner à la page listes des rôles hierarchiques{" "}
                </Button>
            </motion.div>
        )
    }


    return (
        <FormProvider  {...methods}>
            <FusePageCarded
                header = {<RoleHierarchiqueHeader formValues={form}/>}
                content = {
                    <>
                        <Tabs
                             value={tabValue}
                             onChange={handleTabChange}
                             indicatorColor="secondary"
                             textColor="secondary"
                             variant="scrollable"
                             scrollButtons="auto"
                             classes={{ root: "w-full h-64 border-b-1" }}
                        >
                            <Tab className="h-64" label="Rôle"/>
                        </Tabs>
                        <div className="p-16 sm:p-24 max-w-3xl">
                            <div className={tabValue !== 0 ? "hidden" : ""}>
                                <BasicInfoRole methods={methods} formValues={form}/>
                            </div>
                        </div>
                    </>
                }
                scroll={isMobile ? "normal" : "content"}
            />
        </FormProvider>
    )
}

export default RoleHierarchiqueItem
