import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import FuseLoading from '@fuse/core/FuseLoading';

function CollaborateurDataHeader() {
  const { handleSubmit, getValues } = useFormContext();
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleImportCollaborateur = async () => {
    const formData = getValues()
    axios.post(`http://localhost:4000/api/collaborateur/import-excel`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        setLoading(true)
        dispatch(showMessage({message : 'Donnée importé avec succès'}))
        setLoading(false)
        navigate('/manage/collaborator')
      })
      .catch(error => {
        console.log(error)
        dispatch(showMessage({message : 'Erreur lors de l\'import des données'}))
      })
    handleSubmit();
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
        <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
          >
            <Typography
              className="flex items-center sm:mb-12"
              component={Link}
              role="button"
              to="/acceuil"
              color="inherit"
            >
              <FuseSvgIcon size={20}>
                {theme.direction === 'ltr'
                  ? 'heroicons-outline:arrow-sm-left'
                  : 'heroicons-outline:arrow-sm-right'}
              </FuseSvgIcon>
              <span className="flex mx-4 font-medium">Retourner à la page d'acceuil</span>
            </Typography>
          </motion.div>
          <div className="flex items-center max-w-full">
            <motion.div
              className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}
            >
              <Typography className="text-16 sm:text-20 truncate font-semibold">Importer des données </Typography>
              <Typography variant="caption" className="font-medium">Collaborateurs</Typography>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="flex"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
        >
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            onClick={handleImportCollaborateur}
            disabled={loading}
          >
            Importer
          </Button>
        </motion.div>
      </div>
    </>
  )
}

export default CollaborateurDataHeader
