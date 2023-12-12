import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment-timezone';
import axios from 'axios';
import './CalendarConge.css';
import '../FormationAdmin/VoirPlus/voirPlus.css'

const localizer = momentLocalizer(moment);

function CalendarConge() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));


  useEffect(() => {
    // Récupérer les données de l'API backend
    axios.get('http://localhost:4000/api/conge/agendaConge')
      .then((response) => {
        console.log(response.data)
        // Formattage les données pour les rendre compatibles avec React Big Calendar
        const formattedEvents = response.data.filter((event)=>(event.approbation === true)).map((event) => {
          return {
            id: event.id,
            title: `${event.Collab.nom} ${event.Collab.prenom}`,
            motif:`${event.motif}`,
            description:`${event.description}`,
            start: moment.tz(event.dayStart, 'Africa/Nairobi').toDate(),
            end: moment.tz(event.dayEnd, 'Africa/Nairobi').toDate(),
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
    setShowMore(!showMore);
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
        {showMore && (
          <div className='modal'>
            <h1>{selectedEvent.title}</h1>
            <h3>{selectedEvent.motif}</h3>
            <h3>{selectedEvent.description}</h3>
            <h2>
              {selectedEvent.start.toLocaleString()} - {selectedEvent.end.toLocaleString()}
            </h2>
          </div>
        )}
    </div>


    </div>
    </div>
  );
}

export default CalendarConge;
