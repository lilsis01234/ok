import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';

const localizer = momentLocalizer(moment);

function CalendarTraining() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Récupérer les données de l'API backend
    axios.get('http://localhost:4001/api/calendrier/agenda')
      .then((response) => {
        // Formatter les données pour les rendre compatibles avec React Big Calendar
        const formattedEvents = response.data.map((event) => {
          return {
            title: `${event.title} - ${event.nombreDePlaces} places`,
            start: new Date(event.date),
            end: new Date(event.heureEnd),
          };
        });
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setShowButtons(true);
  };

  const handleParticipateNowClick = () => {
    // Mettez en œuvre la logique pour participer par appel vidéo ici
    console.log('Participer par appel vidéo maintenant');
  };

  const handleReserveClick = () => {
    // Mettez en œuvre la logique pour réserver une place ici
    console.log('Réserver une place');
  };

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventSelect}
        style={{ margin: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}
      />
      {showButtons && selectedEvent && (
        <div>
          <button onClick={handleParticipateNowClick}>Participer par appel vidéo maintenant</button>
          <button onClick={handleReserveClick}>Réserver une place</button>
        </div>
      )}
    </div>
  );
}

export default CalendarTraining;
