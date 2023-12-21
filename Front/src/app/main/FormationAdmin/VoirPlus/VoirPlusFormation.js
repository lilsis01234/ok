import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import './voirPlus.css'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-notifications-component/dist/theme.css';
import { Typography} from '@mui/material'
import Sary from './logo-sahaza.png'


const localizer = momentLocalizer(moment);

const VoirPlusFormation = () => {
    const idFormation = useParams();
    const [informations, setInformations] = useState({});
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showButtons, setShowButtons] = useState(false);
    const [participantData, setParticipantData] = useState(null);
    const [isParticipantListVisible, setParticipantListVisible] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    const userId = user.id;
    console.log(userId)
    const role = user.RoleHierarchique.roleHierarchique;
    console.log(role)

    const fetchFormation = () => {
        axios.get(`http://localhost:4000/api/formations/all_informations/${idFormation.id}`)
            .then(res => {
                console.log(res.data)
                setInformations(res.data);
            })
            .catch(err => {
                console.log(err);
            });

            axios.get(`http://localhost:4000/api/seances/seancesParFormation/${idFormation.id}`)
            .then((res) => {
            console.log(res.data)
            const formattedEvents = res.data.map((event) => {
              return {
                auteur: event.Collabs[0].id,
                id:event.id,
                title: `${event.title} - ${event.nombreDePlaces} places`,
                start: moment.tz(event.heureStart, 'Africa/Nairobi').toDate(), 
                end: moment.tz(event.heureEnd, 'Africa/Nairobi').toDate(),
              };
            });
            setEvents(formattedEvents);
            formattedEvents.forEach((event) => scheduleNotification(event));
            }) 
            .catch((err) => {
            console.log(err);
            });
    };

    useEffect(() => {
        fetchFormation();
    }, [idFormation])

    const scheduleNotification = (event) => {
      if (event.start && event.end) {
        const notificationTime = moment(event.start).subtract(10, 'minutes'); // 10 minutes before the event
        const currentTime = moment();
  
        console.log(notificationTime);
  
        if (notificationTime.isAfter(currentTime)) {
          const timeDifference = notificationTime.diff(currentTime);
          setTimeout(() => {
            showNotification(event.title, 'Dans 10 minutes');
          }, timeDifference);
          console.log('ty zao ande aveo')
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
      } else {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            try {
              const notification = new Notification(title, {
                body: customMessage,
                requireInteraction: true,
                icon:Sary
              });
              console.log('lasa le notif')
              notification.onclick = function () {
                console.log("Notification clicked!");
                handleIncomingCall();
              };
            } catch (err) {
              console.error("Error showing notification:", err);
            }
          }
        });
      }
    };
  
    
    const handleEventSelect = (event) => {
      setSelectedEvent(event);
      setShowButtons(true);
      console.log('Selected event ID:', event);
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
        setParticipantListVisible(!isParticipantListVisible); // Inverse la visibilité
      })
      .catch(error =>
        console.error('Error fetching participant data:', error));
    };
  
    const closePopup = () => {
      setShowButtons(false);
    };
  
  
    return (
        <div className="voirPlusContainer">
            <h1 className="collabListes_title font-bold">Détails sur la formation</h1>
            
            {informations.formation && (
                <div className='infos'>
                    <Typography>Thème: {informations.formation.theme}</Typography>
                    <Typography>Description: {informations.formation.description}</Typography>
                    {informations.formation.Formateur && (
                     <Typography>Formateur: <span className="formateurInfo">{informations.formation.Formateur.nom} {informations.formation.Formateur.prenom}</span></Typography>
                    )}
                    {informations.formation.formateurExt && (
                     <Typography>Formateur: <span className="formateurInfo">{informations.formation.formateurExt}</span></Typography>
                    )}
                    <span className="formateurInfo"><Link to={`/discussion/formation/${idFormation.id}`}>Accéder à la discussion</Link></span>
                </div>
            )}

            <div className='header-container'>
            <h1 className="collabListes_title font-bold">Modules</h1>
           
            {informations.formation && informations.formation.RoleHierarchique && informations.formation.RoleHierarchique.roleHierarchique && role === informations.formation.RoleHierarchique.roleHierarchique ? (
              <button>
                <Link to={`/addModule/${idFormation.id}`}>+</Link>
              </button>
            ) : (
              informations.formation && informations.formation.auteur && informations.formation.auteur === userId ? (
                <button>
                  <Link to={`/addModule/${idFormation.id}`}>+</Link>
                </button>
              ) : (
                null
              )
            )}

            </div>
                {informations.modules ? (informations.modules.length!==0 &&
                <div>
                    {informations.modules.map(module => (
                        <div key={module.id} className='moduleBox'>
                            <div className="moduleTitle">Titre: {module.titreModule}</div>
                            <div className="moduleDescription">Description: {module.description}</div>
                        </div>
                    ))}
                </div>
            ):(
                <h2>Pas encore de module pour le moment</h2>
            )}
            <div className='header-container'>
            <h1 className="collabListes_title font-bold">Séances</h1>
            
            {informations.formation && informations.formation.RoleHierarchique && informations.formation.RoleHierarchique.roleHierarchique && role === informations.formation.RoleHierarchique.roleHierarchique ? (
              <button>
               <Link to={`/dashboards/addSeance/${idFormation.id}`}>+</Link>
              </button>
            ) : (
              informations.formation && informations.formation.auteur && informations.formation.auteur === userId ? (
                <button>
                  <Link to={`/dashboards/addSeance/${idFormation.id}`}>+</Link>
                </button>
              ) : (
                null
              )
            )}

            </div>

            {events.length !== 0 ? (
            <div className ="flex justify-center items-center min-h-screen"> 
            <div className="voirPlusContainer">
            <div className = "calendarContainer">
                <div className="calendarWrapper">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={handleEventSelect}
                    className="customCalendar"
                    // resourceAccessor="resource" // Utilisez cette propriété si vous avez une propriété resource dans vos événements
                    style={{ margin: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}
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
        
                      {selectedEvent.auteur === userId && (
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
            </div>
            </div>
        ) : (
          <h2>Aucune séance pour le moment</h2>
        )}
  </div>
  );
};

export default VoirPlusFormation;
