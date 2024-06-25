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

function SeanceApp() {
  const { id } = useParams();

  const [seanceData, setSeanceData] = useState();
  const [participantData, setParticipantData] = useState();

  const users = localStorage.getItem('user');
  const user = JSON.parse(users);
  const roleH = user.Profile_RoleHierarchique?.roleHierarchique;
  console.log(roleH);

  const ViewMore = () =>{
    axios.get(`http://localhost:4000/api/calendrier/view/${id}`)
    .then((response) => {
      setSeanceData(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  const handleReserveClick = (id) => {
    if (id) {
      axios.post('http://localhost:4000/api/participantSeance/addCollabSeancePres', {
        seance: id,
        collaborateur: userId, 
        online: false,
      })
        .then(response => {
          console.log('Reservation successful:', response.data);
          closePopup()
          alert('Réservation à succès')
        })
        .catch(error => {
          console.error('Error reserving place:', error);
        });
    } else {
      console.log('No event selected.');
    }
  };


  const handleReserveEqClick = (id) =>{
    if (id) {
      axios.post('http://localhost:4000/api/participantSeance/addCollabSeanceEq', {
        seance: id,
        equipe: equipe, 
        online: false,
      })
        .then(response => {
          console.log('Reservation successful:', response.data);
          closePopup()
          alert('Réservation à succès')
        })
        .catch(error => {
          console.error('Error reserving place:', error);
        });
    } 
    else {
      console.log('No event selected.');
    }
  }
  
  const ShowAllParticipant = async (id) => {
    axios.get(`http://localhost:4000/api/participantSeance/all/${id}`)
    .then((res) => {
      console.log(res.data);
      setParticipantData(res.data);
    })
    .catch(error =>
      console.error('Error fetching participant data:', error));
  };

  useEffect(() => {
   ViewMore();
   ShowAllParticipant();
  }, [])
  // console.log(seanceData)

  //Récupération des modules lié à la formation
  // const [moduleFormationData, setModuleFormationData] = useState();

  // useEffect(() => {
  //   axios.get(`http://localhost:4000/api/module/modules/${id}`)
  //     .then((response) => {
  //       setModuleFormationData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  // }, [])

  // console.log(moduleFormationData)


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
          {seanceData?.title}
        </div>
        <div>
          {
            seanceData?.Formation && (
              <>

                {/* <Typography className="mt-48 sm:mt-64 text-3xl font-bold leading-tight tracking-tight">{seanceData?.Formation?.theme}</Typography> */}
                <Card className={clsx('py-24 px-32 shadow shrink-0 mt-24 mb-24 w-full')}>
                  <div className="flex items-center">
                    <Typography className="text-24 font-700" component="h2">Formation</Typography>
                    {/* <Typography className="text-17 mx-8 font-600" color="text.secondary" component="h3">{seanceData?.Formation?.theme}</Typography> */}
                  </div>
                  <div className="mt-40">
                    <StyledBadge>Thème</StyledBadge>
                    <Typography className="my-16 px-24">{seanceData?.Formation?.theme}</Typography>
                  </div>
                  <div className="mt-40">
                    <StyledBadge>Description</StyledBadge>
                    <Typography className="my-16 px-24">{seanceData?.Formation?.description}</Typography>
                  </div>

                  <div className="mt-40">
                    <StyledBadge>Formateur</StyledBadge>
                    <div className='flex items-center'>
                      {seanceData?.Formation?.formateur ? (
                        <>
                          {seanceData?.Formation?.Formateur?.image ? (
                            <Avatar
                              key={seanceData?.Formation?.Formateur?.id}
                              className="w-64 h-64 rounded-12 m-4"
                              alt={seanceData?.Formation?.Formateur?.nom}
                              src={`http://localhost:4000/${seanceData?.Formation?.Formateur?.image}`}
                            />
                          ) : (
                            <Avatar
                              key={seanceData?.Formation?.Formateur?.id}
                              className="w-64 h-64 rounded-12 m-4"
                              alt={seanceData?.Formation?.Formateur?.nom}
                            >
                              {seanceData?.Formation?.Formateur?.nom ? seanceData?.Formation?.Formateur?.nom[0] : '?'}
                            </Avatar>
                          )}
                          <Typography className="my-16 px-24 text-center">{seanceData?.Formation?.Formateur?.nom} {seanceData?.Formation?.Formateur?.prenom}</Typography></>
                      ) : (
                        <Typography className="my-16 px-24 text-center">{seanceData?.Formation?.formateurExterne}</Typography>
                      )}

                    </div>
                  </div>

                  <StyledBadge>Personnes inscrites</StyledBadge>

                    {participantData && participantData.map((participant, index) => (
                          <div key={index}>
                            <Typography>{`${participant.Profil_Collab.nom} ${participant.Profil_Collab.prenom}`}</Typography>
                          </div>
                    ))}

                      <button
                        className="popupButton bg-green-500 text-white py-2 px-4 rounded mb-4"
                        onClick={() => {
                          handleReserveClick(selectedEvent.id);
                        }}
                      >
                       <StyledBadge> Réserver une place</StyledBadge>
                      </button>

                      {/* {role.toLowerCase() === 'chefequipe' && (
                          <button
                            className="popupButton bg-green-500 text-white py-2 px-4 rounded"
                            onClick={() => {
                              handleReserveEqClick(selectedEvent.id);
                            }}
                          >
                          <StyledBadge>  Réserver des places pour mon équipe</StyledBadge>
                          </button>
                      )} */}

                </Card>

              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SeanceApp




