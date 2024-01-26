import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment-timezone';
import axios from 'axios';
import '../../FormationAdmin/VoirPlus/voirPlus.css'
import Sary from './logo-sahaza.png'
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const localizer = momentLocalizer(moment);

function CalendarTraining() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [participantData, setParticipantData] = useState(null);
  const [isParticipantListVisible, setParticipantListVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const userid = user.id;
  const equipe = user.Collab.equipe;
  const role = user.RoleHierarchique.roleHierarchique;
  const[opacity,setOpacity] = useState(1);
  const navigate = useNavigate();


  const scheduleNotification = (event) => {
    if (event.start && event.end) {
      const notificationTime = moment(event.start).subtract(10, 'minutes');
      const currentTime = moment();

      if (notificationTime.isAfter(currentTime)) {
        const timeDifference = notificationTime.diff(currentTime);
        setTimeout(() => {
          showNotification(event.title, 'Dans 10 minutes');
        }, timeDifference);
      } else {
        console.log('Event has already passed.');
      }
    } else {
      console.error('Invalid event data:', event);
    }
  };


  const showNotification = (title, customMessage) => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } 
    else {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          try {
            const notification = new Notification(title, {
              body: customMessage,
              requireInteraction: true,
              icon:Sary
            });
            notification.onclick = function () {
              handleIncomingCall();
            };
          } catch (err) {
            console.error("Error showing notification:", err);
          }
        }
      });
    }
  };


  useEffect(() => {
    // Récupérer les données de l'API backend
    axios.get('http://localhost:4000/api/calendrier/agenda')
      .then((response) => {
        // Formatter les données pour les rendre compatibles avec React Big Calendar
        const formattedEvents = response.data.filter((res) => res.Formation.confidentialite === false).map((event) => {
            return {
              auteur: event.Formation.formateur,
              id:event.id,
              title: `${event.title} - ${event.nombreDePlaces} places`,
              start: moment.tz(event.heureStart, 'Africa/Nairobi').toDate(), 
              end: moment.tz(event.heureEnd, 'Africa/Nairobi').toDate(),
            };
          });
        setEvents(formattedEvents);
        formattedEvents.forEach((event) => scheduleNotification(event)); 
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setShowButtons(true);
    console.log('Selected event ID:', event);
    setOpacity(0);
  };


  const handleParticipateNowClick = (id) => {
    if (role === 'SuperAdministrateur') {
      startVideoCall(id);
    } else {
      showNotification (<Link to={`/appelVideo/${id}`} >Cliquez ici pour participer</Link>,'L\'appel a commencé')
    }
  };


  const startVideoCall = (id) => {
    console.log("Appel vidéo démarré par le formateur");
    navigate (`/appelVideo/${id}`)
  };


  const handleReserveClick = (id) => {
    if (id) {
      axios.post('http://localhost:4000/api/participantSeance/addCollabSeancePres', {
        seance: id,
        collaborateur: userid, 
        online: false,
      })
        .then(response => {
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
  
  
  const DeleteSeance = async (id) => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette séance ?");
    if (isConfirmed) {
    try {
      const response = await axios.delete(`http://localhost:4000/api/calendrier/seance/${id}`);
      if (response.status === 204) {
        // Suppression réussie, mise à jour la liste des événements
        const updatedEvents = events.filter(event => event.id !== id);
        setEvents(updatedEvents);
      } else {
        console.error('Erreur lors de la suppression de la séance');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la séance :', error);
    }
  }};
  

  const ShowAllParticipant = async (seanceId) => {
    axios.get(`http://localhost:4000/api/participantSeance/allCollab/${seanceId}`)
    .then((res) => {
      console.log(res.data);
      setParticipantData(res.data);
      setParticipantListVisible(!isParticipantListVisible);
    })
    .catch(error =>
      console.error('Error fetching participant data:', error)
    );
  };

  const closePopup = () => {
    setShowButtons(false);
    setOpacity(1);
  };

  return (
        <>
          <div className="flex min-h-screen">

            {/* Sidebar */}
            <div className="w-1/6 p-4 bg-grey-100 xl:block lg:hidden md:hidden sm:hidden xs:hidden">
              <Typography className="text-48 font-bold pt-56 px-32">Calendrier</Typography>
              <Typography className="text-24 pl-32 mt-16 font-bold text-yellow-800">SEANCES DE CE MOIS</Typography>
            </div>

            <div className="w-5/6 p-4 md:w-full sm:w-full">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                step={15}
                onSelectEvent={handleEventSelect}
                className='bg-white'
                style={{padding: '15px', borderRadius: '20px', opacity:opacity }}
              />
                {showButtons && selectedEvent && (
                  <div className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-md">
                    <div className="popupContent bg-white p-8 rounded-lg max-w-md relative">
                      <button
                        className="closeButton bg-gray-500 text-white py-2 px-4 rounded absolute top-4 right-4"
                        onClick={closePopup}
                      >
                        X
                      </button>
                      {role === 'SuperAdministrateur' && (
                        <button
                          className="popupButton bg-blue-500 text-white py-2 px-4 rounded mb-4"
                          onClick={() => {
                            handleParticipateNowClick(selectedEvent.id);
                          }}
                        >
                          Démarrer l'appel vidéo
                        </button>
                      )}
        
                      <button
                        className="popupButton bg-green-500 text-white py-2 px-4 rounded mb-4"
                        onClick={() => {
                          handleReserveClick(selectedEvent.id);
                        }}
                      >
                        Réserver une place
                      </button>
        
                      {selectedEvent.auteur === userid && (
                        <button
                          className="popupButton bg-red-500 text-white py-2 px-4 rounded mb-4"
                          onClick={() => {
                            DeleteSeance(selectedEvent.id);
                          }}
                        >
                          Supprimer
                        </button>
                      )}
        
                      {isParticipantListVisible && (
                        <div className="participantData mb-4">
                          {participantData &&
                            [...participantData.collabNames, ...participantData.collabNames2]
                              .filter((collab, index, self) => self.findIndex((c) => c.id === collab.id) === index)
                              .map((collab, index) => (
                                <div key={index} className="mb-2">{`${collab.nom} ${collab.prenom}`}</div>
                              ))}
                        </div>
                      )}
        
                      <button
                        className="popupButton bg-blue-700 text-white py-2 px-4 rounded mb-4"
                        onClick={() => ShowAllParticipant(selectedEvent.id)}
                      >
                        Liste des participants
                      </button>
        
                      {role === 'chefEquipe' && (
                        <button
                          className="popupButton bg-green-500 text-white py-2 px-4 rounded"
                          onClick={() => {
                            handleReserveEqClick(selectedEvent.id);
                          }}
                        >
                          Réserver des places pour mon équipe
                        </button>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </>
  );
  
  
}

export default CalendarTraining;
