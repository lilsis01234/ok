import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Avatar, Box, Button, Typography, alpha, lighten, styled } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import clsx from 'clsx';
import { blue } from '@mui/material/colors';


const StyledBadge = styled('div')(({ theme, value }) => ({
  display: 'inline-flex',
  fontSize: 14,
  fontWeight: 700,
  color: '#FFF',
  // letterSpacing: '.015em',
  lineHeight: 1,
  padding: '4px 12px',
  borderRadius: 4,
  backgroundColor: blue[50],
  color: alpha(blue[500], 0.8),
}));

function SceanceApp() {
  const { id } = useParams();

  const [sceanceData, setSceanceData] = useState();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/calendrier/view/${id}`)
      .then((response) => {
        setSceanceData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])

  // console.log(sceanceData)

  //Récupération des modules lié à la formation
  const [moduleFormationData, setModuleFormationData] = useState();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/module/modules/${id}`)
      .then((response) => {
        setModuleFormationData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])

  console.log(moduleFormationData)






  return (
    <div className="flex flex-col items-center p-24 sm:p-40">
      <div className="flex flex-col w-full max-w-4xl">
        <div className="sm:mt-32">
          <Button
            component={Link}
            to={-1}
            color="secondary"
            startIcon={<FuseSvgIcon>heroicons-outline:arrow-narrow-left</FuseSvgIcon>}
          >
            Retourner à l'agenda
          </Button>
        </div>
        <div className="mt-8 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight">
          {sceanceData?.title}
        </div>
        <div>
          {
            sceanceData?.Formation && (
              <>

                {/* <Typography className="mt-48 sm:mt-64 text-3xl font-bold leading-tight tracking-tight">{sceanceData?.Formation?.theme}</Typography> */}
                <Card className={clsx('py-24 px-32 shadow shrink-0 mt-24 mb-24 w-full')}>
                  <div className="flex items-center">
                    <Typography className="text-24 font-700" component="h2">Formation</Typography>
                    {/* <Typography className="text-17 mx-8 font-600" color="text.secondary" component="h3">{sceanceData?.Formation?.theme}</Typography> */}
                  </div>
                  <div className="mt-40">
                    <StyledBadge>Thème</StyledBadge>
                    <Typography className="my-16 px-24">{sceanceData?.Formation?.theme}</Typography>
                  </div>
                  <div className="mt-40">
                    <StyledBadge>Description</StyledBadge>
                    <Typography className="my-16 px-24">{sceanceData?.Formation?.description}</Typography>
                  </div>

                  <div className="mt-40">
                    <StyledBadge>Formateur</StyledBadge>
                    <div className='flex items-center'>
                      {sceanceData?.Formation?.formateur ? (
                        <>
                          {sceanceData?.Formation?.Formateur?.image ? (
                            <Avatar
                              key={sceanceData?.Formation?.Formateur?.id}
                              className="w-64 h-64 rounded-12 m-4"
                              alt={sceanceData?.Formation?.Formateur?.nom}
                              src={`http://localhost:4000/${sceanceData?.Formation?.Formateur?.image}`}
                            />
                          ) : (
                            <Avatar
                              key={sceanceData?.Formation?.Formateur?.id}
                              className="w-64 h-64 rounded-12 m-4"
                              alt={sceanceData?.Formation?.Formateur?.nom}
                            >
                              {sceanceData?.Formation?.Formateur?.nom ? sceanceData?.Formation?.Formateur?.nom[0] : '?'}
                            </Avatar>
                          )}
                          <Typography className="my-16 px-24 text-center">{sceanceData?.Formation?.Formateur?.nom} {sceanceData?.Formation?.Formateur?.prenom}</Typography></>
                      ) : (
                        <Typography className="my-16 px-24 text-center">{sceanceData?.Formation?.formateurExterne}</Typography>
                      )}


                    </div>
                  </div>



                </Card>

              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SceanceApp




