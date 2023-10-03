import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './voirPlus.css'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';


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
                start: new Date(seance.heureStart),
                end: new Date(seance.heureEnd),
                resource: seance.module, // Si vous avez une propriété module à associer
                // Autres propriétés de séance si nécessaire
                };
            });
            setEvents(formattedEvents);
            scheduleNotifications(formattedEvents);
            })
            .catch((err) => {
            console.log(err);
            });
    };

    useEffect(() => {
        fetchFormation();
    }, [idFormation]);

    const scheduleNotifications = (events) => {
        events.forEach((event) => {
          const notificationTime = new Date(event.start.getTime() - 0 * 60 * 1000); // 10 minutes before the event
          const currentTime = new Date();
      
          if (notificationTime.getTime() === currentTime.getTime()) {
            showNotification(event.title, 'Dans 10 minutes');
          }
        });
      };
      

      const showNotification = (title, message) => {
        store.addNotification({
          title: title,
          message: message,
          type: 'default', // 'default', 'success', 'info', 'warning', 'danger'
          container: 'top-right', // 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'
          insert: 'top',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 5000, // Duration in milliseconds
            onScreen: true,
            showIcon: true,
          },
        });
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
