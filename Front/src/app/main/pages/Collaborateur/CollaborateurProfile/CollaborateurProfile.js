import React, { useEffect } from 'react'
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useThemeMediaQuery } from '@fuse/hooks';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { useTheme } from '@emotion/react';
import CollaborateurProfileContent from './CollaborateurProfileContent';


const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '& > .container': {
      maxWidth: '100%',
    },
  },
}));



function CollaborateurProfile() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const { collaborateurId } = useParams();
  const [collabData, setCollabData] = useState({})

  const fetchCollabData = () => {
    axios.get(`http://localhost:4000/api/compte_collaborateur/collab/view/${collaborateurId}`)
      .then((response) => {
        setCollabData(response.data)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données', error)
      })
  }

  useEffect(() => {
    fetchCollabData();
  }, [])

  const theme = useTheme();
  const navigate = useNavigate();

  const handleRetour = () => {
    navigate(-1);
  }



  return (
    <Root
      header={
        <div className="flex flex-col">
          <Box
            className="h-160 lg:h-320 w-full bg-cover bg-center relative overflow-hidden"
            sx={{ backgroundColor: 'primary.dark' }}
          >
            <svg
              className="absolute inset-0 pointer-events-none"
              viewBox="0 0 960 540"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMax slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Box
                component="g"
                sx={{ color: 'primary.light' }}
                className="opacity-20"
                fill="none"
                stroke="currentColor"
                strokeWidth="100"
              >
                <circle r="234" cx="196" cy="23" />
                <circle r="234" cx="790" cy="491" />
              </Box>
            </svg>
            <div className="w-full h-full flex justify-center group-hover:scale-125 duration-700 ease-in-out">
              <img src="http://localhost:4000/uploads/nom-1700809994203-518251709.png" alt="logo" />
              {/* <img src="assets/images/logo/LogoSahaza.png" alt="logo" /> */}
            </div>
          </Box>



          <div className="flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72">
            <div >
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
              >
                <Typography
                  className="flex items-center sm:mb-12"
                  component={Link}
                  role="button"
                  color="inherit"
                  onClick={() => handleRetour()}
                >
                  <FuseSvgIcon size={20}>
                    {theme.direction === 'ltr'
                      ? 'heroicons-outline:arrow-sm-left'
                      : 'heroicons-outline:arrow-sm-right'}
                  </FuseSvgIcon>
                  <span className="flex mx-4 font-medium">Retour</span>
                </Typography>
              </motion.div>

            </div>
            <div className="-mt-96 lg:-mt-88 rounded-full">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
                {collabData.Collab?.image ? (
                  <Avatar
                    sx={{ borderColor: 'background.paper' }}
                    className="w-128 h-128 border-4"
                    src={`http://localhost:4000/${collabData.Collab?.image}`}
                    alt="User avatar"
                  />
                ) : (
                  <Avatar sx={{ borderColor: 'background.paper' }}
                    className="w-128 h-128 border-4">{collabData.Collab?.nom ? collabData.Collab?.nom[0] : '?'}</Avatar>
                )}
              </motion.div>
            </div>

            <div className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32">
              <Typography className="text-lg font-bold leading-none">{collabData.Collab?.nom} {collabData.Collab?.prenom} </Typography>
              <Typography color="text.secondary">{collabData.Collab?.matricule}</Typography>
            </div>
          </div>
        </div>
      }
      content={
        <CollaborateurProfileContent collabData={collabData} />
        
      }
      scroll={isMobile ? 'normal' : 'page'}
/>
  )
}

export default CollaborateurProfile
