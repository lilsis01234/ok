import { useThemeMediaQuery } from '@fuse/hooks';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion';
import { Button, Tab, Tabs, Typography } from '@mui/material';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import BasicInfoCompte from './tabs/BasicInfoCompte';
import CompteCollaborateurItemHeader from './CompteCollaborateurItemHeader';

function CompteCollaborateurItem(props) {
  const { accoundId } = useParams();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  const [tabValue, setTabValue] = useState(0);
  const [noCompteCollab, setNoCompteCollab] = useState(false);

  const [compteCollab, setCompteCollab] = useState([])


  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    // resolver: yupResolver(schema)
  })

  const { reset, watch, control, onChange, fomState } = methods || {};
  const form = watch();

  console.log(form)

  useEffect(() => {
    async function fetchData() {
      axios.get(`http://localhost:4000/api/compte_collaborateur/view/${accoundId}`)
        .then(response => {
          console.log(response.data)
          setCompteCollab(response.data)
          setNoCompteCollab(false)
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données sur les comptes des collaborateurs:', error);
          setNoCompteCollab(true)
        })
    }
    fetchData();
  }, [accoundId])

  useEffect(() => {
    if (!compteCollab) {
      return;
    }
    reset(compteCollab);
  }, [compteCollab, reset])

  useEffect(() => {
    return () => {
      setCompteCollab(null);
      setNoCompteCollab(false);
    }
  }, [])


  function handleTabChange(event, value) {
    setTabValue(value)
  }

  if (noCompteCollab) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          Il n'y a pas de compte collaborateur de ce type !
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/manage/account"
          color="inherit"
        >
          Retourner à la liste des comptes collaborateurs
        </Button>
      </motion.div>
    )
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header = {<CompteCollaborateurItemHeader formValues={form}/>}
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
              <Tab className="h-64" label="Basic Compte" />
            </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
                <div className={tabValue !== 0 ? 'hidden' : ''}>
                  <BasicInfoCompte methods={methods} formValues={form}/>
                </div>
            </div>
          </>
        }
      />
    </FormProvider>
  )
}

export default CompteCollaborateurItem
