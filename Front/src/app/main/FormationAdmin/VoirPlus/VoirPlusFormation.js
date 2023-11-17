import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import './voirPlus.css'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-notifications-component/dist/theme.css';


const localizer = momentLocalizer(moment);

const VoirPlusFormation = () => {
    const idFormation = useParams();
    const [informations, setInformations] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showButtons, setShowButtons] = useState(false);

    const fetchFormation = () => {
        axios.get(`http://localhost:4000/api/formations/all_informations/${idFormation.id}`)
            .then(res => {
                setInformations(res.data);
            })
            .catch(err => {
                console.log(err);
            });

            axios.get(`http://localhost:4000/api/seances/seancesParFormation/${idFormation.id}`)
            .then((res) => {
            const formattedEvents = res.data.map((seance) => {
                return {
                title: `${seance.title} - ${seance.nombreDePlaces} places`,
                start: moment.tz(seance.heureStart, 'Africa/Nairobi').toDate(), // Adjust timezone here
                end: moment.tz(seance.heureEnd, 'Africa/Nairobi').toDate(), // Adjust timezone here
                resource: seance.module, 
                };
            });
            setEvents(formattedEvents);
            formattedEvents.forEach((event) => scheduleNotification(event)); // Schedule notifications
            })
            .catch((err) => {
            console.log(err);
            });
    };

    useEffect(() => {
        fetchFormation();
    }, [idFormation]);

    const scheduleNotification = (event) => {
      if (event.start && event.end) {
        const notificationTime = moment(event.start).subtract(10, 'minutes'); 
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
              });
              console.log('lasa le notif')
              notification.onclick = function () {
                console.log("Notification clicked!");
              };
            } catch (err) {
              console.error("Error showing notification:", err);
            }
          }
        });
      }
    };
    
    const handleEventSelect = (events) => {
      setSelectedEvent(events);
      setShowButtons(true);
    };
  
    const handleParticipateNowClick = () => {
      console.log('Participer par appel vidéo maintenant');
    };
  
    const handleReserveClick = () => {
      console.log('Réserver une place');
    };
  
    // const handleSetReminderClick = (event) => {
    //   scheduleNotification(event);
    //   console.log('lasa le rappel')
    //   alert('Rappel confirmé')
    // };

    const closePopup = () => {
      setShowButtons(false);
    };
  
    return (
        <div className="voirPlusContainer">
            <h1 className="collabListes_title font-bold">Détails sur la formation</h1>
            {informations.formation && (
                <div className='infos'>
                    <p>Thème: {informations.formation.theme}</p>
                    <p>Description: {informations.formation.description}</p>
                    {informations.formation.Formateur && (
                     <p>Formateur: <span className="formateurInfo">{informations.formation.Formateur.nom} {informations.formation.Formateur.prenom}</span></p>
                    )}
                    <span className="formateurInfo"><Link to={`/discussion/formation/${idFormation.id}`}>Accéder à la discussion</Link></span>
                </div>
              )}
            <div className='header-container'>
            <h1 className="collabListes_title font-bold">Modules</h1>
            <button><Link to={`/addModule/${idFormation.id}`}>+</Link></button>
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
            <button><Link to={`/dashboards/addSeance/${idFormation.id}`}>+</Link></button>
            </div>

            {events.length !== 0 ? (
            <div className = "calendarContainer">
                <div className="calendarWrapper">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={handleEventSelect}
                    className="customCalendar"
                    resourceAccessor="resource" // Utilisez cette propriété si vous avez une propriété resource dans vos événements
                    style={{ margin: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}
                />
                </div>
            </div>
            ) : (
            <h2>Aucune séance pour le moment</h2>
            )}
            {showButtons && selectedEvent && (
             <div className="popup">
             <div className="popupContent">
                <button className="popupButton" onClick={handleParticipateNowClick}>Participer par appel vidéo</button>
                <button className="popupButton" onClick={handleReserveClick}>Réserver une place</button>
                {/* <button className="popupButton" onClick={() => { handleSetReminderClick(selectedEvent); console.log('vokitika'); }}>Me rappeler cette formation</button> */}
                <button className="closeButton" onClick={closePopup}>X</button>
             </div>
           </div>
            )}
  </div>
    );
};

export default VoirPlusFormation;
