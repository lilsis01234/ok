import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

    const fetchFormation = () => {
        axios.get(`http://localhost:4001/api/formations/all_informations/${idFormation.id}`)
            .then(res => {
                setInformations(res.data);
            })
            .catch(err => {
                console.log(err);
            });

            axios.get(`http://localhost:4001/api/seances/seancesParFormation/${idFormation.id}`)
            .then((res) => {
            const formattedEvents = res.data.map((seance) => {
                return {
                title: `${seance.title} - ${seance.nombreDePlaces} places`,
                start: moment.tz(seance.heureStart, 'Africa/Nairobi').toDate(), // Adjust timezone here
                end: moment.tz(seance.heureEnd, 'Africa/Nairobi').toDate(), // Adjust timezone here
                resource: seance.module, // Si vous avez une propriété module à associer
                // Autres propriétés de séance si nécessaire
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
                });
                console.log('lasa le notif')
                notification.onclick = function () {
                  console.log("Notification clicked!");
                  // Handle notification click event here, e.g., redirect to a specific page
                };
              } catch (err) {
                console.error("Error showing notification:", err);
              }
            }
          });
        }
      };  
    
    

    return (
        <div>
            <h1 className="collabListes_title font-bold">Détails sur la formation</h1>
            {informations.formation && (
                <div className='infos'>
                    <p>Thème: {informations.formation.theme}</p>
                    <p>Description: {informations.formation.description}</p>
                    {informations.formation.Formateur&&<p>Formateur: {informations.formation.Formateur.nom} {informations.formation.Formateur.prenom}</p>}
                </div>
            )}
            {informations.modules ? (informations.modules.length!==0 &&
                <div>
                    <h1 className="collabListes_title font-bold">Modules</h1>
                    {informations.modules.map(module => (
                        <div key={module.id} className='infos'>
                            <p>Titre: {module.titreModule}</p>
                            <p>Description: {module.description}</p>
                        </div>
                    ))}
                </div>
            ):(
                <h2>Pas encore de module pour le moment</h2>
            )}
            {events.length !== 0 ? (
            <div>
                <h1 className="collabListes_title font-bold">Séances</h1>
                <div style={{ height: '500px' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    resourceAccessor="resource" // Utilisez cette propriété si vous avez une propriété resource dans vos événements
                    style={{ margin: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}
                />
                </div>
            </div>
            ) : (
            <h2>Aucune séance pour le moment</h2>
            )}
  </div>
    );
};

export default VoirPlusFormation;
