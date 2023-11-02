import { useThemeMediaQuery } from '@fuse/hooks';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { Button, Tabs, Tab } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import PosteItemHeader from './PosteItemHeader';

const { useForm} = require("react-hook-form");
const { yupResolver } = require("@hookform/resolvers/yup");

const schema = yup.object().shape({
  titrePoste: yup
    .string()
    .required('You must enter a Fonction name')
  // .min(5, 'The product name must be at least 5 characters'),
});

function PosteListeItem(props) {
  const { posteId } = useParams();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  const [tabValue, setTabValue] = useState(0);
  const [noPoste, setNoPoste] = useState(false);

  const [poste, setPoste] = useState([])

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
        if (posteId === 'new') {
          console.log('Ajout d\'une nouvelle poste')
          setNoPoste(false)
        } else {
          console.log('Affichage d\'une poste existante')
          axios.get(`http://localhost:4000/api/poste/view/${posteId}`)
            .then(response => {
              setPoste(response.data.poste)
              setNoPoste(false)
            })
            .catch(error => {
              setNoPoste(true)
            })
        }
      } catch (error) {
        console.error('Error fetching Fonction data:', error);
        setNoPoste(true);
      }
    }
    fetchData();
  }, [posteId])

  useEffect(() => {
    if (poste && Object.keys(poste).length > 0) {
      const { titrePoste, departement } = departement;
      reset({ titrePoste, departement })
    }
  }, [poste, reset])

  useEffect(() => {
    return () => {
      setPoste(null)
      setNoPoste(false)
    }
  }, [])

  function handleTabChange(event, value) {
    setTabValue(value)
  }


  if (noPoste) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such Fonction!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/business/manage/departement"
          color="inherit"
        >
          Go To Fonctions Page
        </Button>
      </motion.div>
    )
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header = {<PosteItemHeader formValues={form}/>}
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  )
}

export default PosteListeItem
