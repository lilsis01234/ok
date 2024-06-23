import React, { useState, useEffect } from 'react';
import { useParams,Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './voirPlus.css'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-notifications-component/dist/theme.css';
import { Typography} from '@mui/material'
import Sary from './logo-sahaza.png'


const VoirPlusFormation = () => {
    const localizer = momentLocalizer(moment);
    const idFormation = useParams();
    const navigate = useNavigate();
    const [informations, setInformations] = useState({});
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showButtons, setShowButtons] = useState(false);
    const [participantData, setParticipantData] = useState(null);
    const [isParticipantListVisible, setParticipantListVisible] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user.id;
    const role = user.Profile_RoleHierarchique?.roleHierarchique;
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

        axios.get(`http://localhost:4000/api/seances/all/formation/${idFormation.id}`)
            .then((res) => {
              console.log(res.data)
                const formattedEvents = res.data.map((event) => {
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
  
    const handleVoirPlusSeance = () => {
      navigate(`/seance/info/${idEvent}`);
    };
  
    return (
        <div className="voirPlusContainer">
            <h1 className="collabListes_title font-bold">Détails sur la formation</h1>
            
            {informations.formation && (
                <div className='infos'>
                    <Typography>Thème: {informations.formation.theme}</Typography>
                    <Typography>Description: {informations.formation.description}</Typography>
                    {informations.formation.Formateur && (
                     <Typography>Ajouté par: <span className="formateurInfo">{informations.formation.Formateur.nom} {informations.formation.Formateur.prenom}</span></Typography>
                    )}
                    {informations.formation.formateurExt && (
                     <Typography>Consultant externe: <span className="formateurInfo">{informations.formation.formateurExt}</span></Typography>
                    )}
                    <span className="formateurInfo"><Link to={`/discussion/formation/${idFormation.id}`}>Accéder à la discussion</Link></span>
                </div>
            )}

            <div className='header-container'>
              <h1 className="collabListes_title font-bold">Modules</h1>

                {informations.formation && informations.formation.formateur && informations.formation.formateur === userId && (
                  <button>
                    <Link to={`/addModule/${idFormation.id}`}>+</Link>
                  </button>
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
              
                {informations.formation && informations.formation.formateur && informations.formation.formateur === userId && (
                    <button>
                      <Link to={`/dashboards/addSeance/${idFormation.id}`}>+</Link>
                    </button>
                )}
            </div>

                {
                  events.length !== 0 ? (
                    <Calendar
                      localizer={localizer}
                      events={events}
                      startAccessor="start"
                      endAccessor="end"
                      onSelectEvent={handleVoirPlusSeance}
                      style={{ margin: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}
                    />
                  ) : (
                    <h2>Aucune séance pour le moment</h2>
                  )
                }
        </div>
    );
};

export default VoirPlusFormation;
