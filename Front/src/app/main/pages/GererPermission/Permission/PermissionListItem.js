import { useThemeMediaQuery } from '@fuse/hooks';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { Button, Tabs, Tab } from '@mui/material';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import { FormProvider, useForm } from 'react-hook-form';
import PermissionItemHeader from './PermissionItemHeader';

function PermissionListItem(props) {
    const { permissionId } = useParams();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [tabValue, setTabValue] = useState(0);
    const [noPermission, setNoPermission] = useState(false);

    const [permissions, setPermission] = useState([])
    
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {}
    })

    const { reset, watch, control, onChange, formState } = methods || {};
    const form = watch();

    useEffect(() => {
        async function fetchData() {
            try {
                if (permissionId === 'new') {
                    console.log('Ajout d\'une nouvelle permission')
                    setNoPermission(false)
                } else {
                    console.log('Affichage d\'une permission existante')
                    axios.get(`http://localhost:4000/api/permission/view/${permissionId}`)
                      .then(response => {
                        setPermission(response.data)
                        setNoPermission(false)
                      })
                      .catch(error => {
                        setNoPermission(true)
                      }) 
                }
            } catch (error) {
                console.error('Erreur lors de la récupration des données:', error);
                setNoPermission(true);
            }
        }
        fetchData()
    }, [permissionId])

    
  useEffect(() => {
    if (permissions && Object.keys(permissions).length > 0) {
      const { id, permission, role } = permissions;
      reset({ id, permission, role })
    }
  }, [permissions, reset])


    useEffect(() => {
        return () => {
            setPermission(null)
            setNoPermission(false)
        }
    })

    function handleTabChange(event, value) {
        setTabValue(value)
    }


    if (noPermission) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    Il n'y a pas de permission
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/manage/permission"
                    color="inherit"
                >
                   Retourner à la liste des permissions
                </Button>
            </motion.div>
        )
    }


    return (
        <FormProvider {...methods}>
          <FusePageCarded
            header = {<PermissionItemHeader formValues={form}/>}
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
                  <Tab className="h-64" label="Permission" />
                </Tabs>
                <div className="p-16 sm:p-24 max-w-3xl">
                  <div className={tabValue !== 0 ? 'hidden' : ''}>
                      {/* <BasicPosteInfo methods={methods} formValues={form}/> */}
                  </div>
                </div>
              </>
            }
            scroll={isMobile ? 'normal' : 'content'}
          />
        </FormProvider>
      )
}

export default PermissionListItem
