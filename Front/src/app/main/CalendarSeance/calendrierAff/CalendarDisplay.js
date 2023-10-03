import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';

const localizer = momentLocalizer(moment);

function CalendarTraining  () {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Récupérer les données de l'API backend
    axios.get('http://localhost:4001/api/calendrier/agenda')
      .then((response) => {
        // Formatter les données pour les rendre compatibles avec React Big Calendar
        const formattedEvents = response.data.map((event) => {
          return {
            title: event.title, // Titre de l'événement
            start: new Date(event.date), // Date de début de l'événement
            end: new Date(event.heureEnd), // Date de fin de l'événement
          };
        });
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Le tableau vide des dépendances assure que l'effet se produit une seule fois après le rendu initial

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}
      />
    </div>
  );
};

export default CalendarTraining;
