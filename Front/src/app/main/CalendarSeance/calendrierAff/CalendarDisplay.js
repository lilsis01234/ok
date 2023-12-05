import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment-timezone';
import axios from 'axios';
import '../../FormationAdmin/VoirPlus/voirPlus.css'

const localizer = momentLocalizer(moment);

function CalendarTraining() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [participantData, setParticipantData] = useState(null);
  const [isParticipantListVisible, setParticipantListVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const userid = user.id;
  const equipe = user.Collab.equipe
  const role = user.RoleHierarchique.roleHierarchique;


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


  function showNotification(title, customMessage) {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          try {
            const options = {
              body: customMessage,
              // icon: 'icon-152x152.png',
              vibrate: [100, 50, 100],
              requireInteraction: true,
              data: {
                dateOfArrival: Date.now(),
                primaryKey: 0
              }
            };
  
            // Use the service worker registration from earlier
            navigator.serviceWorker.getRegistration().then(reg => {
              reg.showNotification(title, options);
            });
          } catch (err) {
            console.error("Error showing notification:", err);
          }
        }
      });
    }
  }


  useEffect(() => {
    // Récupérer les données de l'API backend
    axios.get('http://localhost:4000/api/calendrier/agenda')
      .then((response) => {
        console.log(response.data)
        // Formatter les données pour les rendre compatibles avec React Big Calendar
        const formattedEvents = response.data.map((event) => {
          return {
            auteur: event.Formation.formateur,
            id:event.id,
            title: `${event.title} - ${event.nombreDePlaces} places`,
            start: moment.tz(event.heureStart, 'Africa/Nairobi').toDate(), // Adjust timezone here
            end: moment.tz(event.heureEnd, 'Africa/Nairobi').toDate(), // Adjust timezone here
          };
        });
        setEvents(formattedEvents);
        formattedEvents.forEach((event) => scheduleNotification(event)); // Schedule notifications
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setShowButtons(true);
    console.log('Selected event ID:', event);
  };


  const handleParticipateNowClick = () => {
    if (role === 'SuperAadministrateur') {
      startVideoCall();
    } else {
      const notificationTitle = 'Appel vidéo imminent';
      const notificationMessage = 'Cliquez ici pour participer à l\'appel vidéo';
  
      showNotification(notificationTitle, notificationMessage);
    }
  };


  const startVideoCall = () => {
    console.log("Appel vidéo démarré par le formateur");
  };


  const handleReserveClick = (id) => {
    if (id) {
      axios.post('http://localhost:4000/api/participantSeance/addCollabSeancePres', {
        seance: id,
        collaborateur: userid, 
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
    <div className = "calendarContainer">
    <div className="calendarWrapper">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        step={15}
        onSelectEvent={handleEventSelect}
        style={{ margin: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}
      />
      {showButtons && selectedEvent && (
        <div className="popup">
        <div className="popupContent">

            {role === 'SuperAdministrateur' &&
            (<button className="popupButton" onClick={()=>{handleParticipateNowClick()}}>Démarrer l' appel vidéo</button>)
            }
            
            <button className="popupButton" onClick={()=>{handleReserveClick(selectedEvent.id)}}>Réserver une place</button>
            
            {selectedEvent.auteur === userid &&
            <button className="popupButton" onClick={() => { DeleteSeance(selectedEvent.id) }}>Supprimer</button>
            }

            {isParticipantListVisible && (
              <div className="participantData">
                {participantData &&
                  [...participantData.collabNames, ...participantData.collabNames2]
                    .filter((collab, index, self) => self.findIndex((c) => c.id === collab.id) === index)
                    .map((collab, index) => (
                      <div key={index}>{`${collab.nom} ${collab.prenom}`}</div>
                    ))}
              </div>
            )}
            
            <button className="popupButton" onClick={() => ShowAllParticipant(selectedEvent.id)}>
              Liste des participants
            </button>
            
            {role === 'chefEquipe' &&
            <button className="popupButton" onClick={()=>{handleReserveEqClick(selectedEvent.id)}}>Réserver des places pour mon équipe</button>
            }

            <button className="closeButton" onClick={closePopup}>X</button>
        </div>
      </div>
      )}
    </div>

    </div>
    </div>
  );
}

export default CalendarTraining;
