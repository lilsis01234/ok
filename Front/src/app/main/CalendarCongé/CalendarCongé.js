import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment-timezone';
import axios from 'axios';
import './CalendarConge.css'; 
import '../FormationAdmin/VoirPlus/voirPlus.css';
import { FaTimes } from 'react-icons/fa';
import { Typography } from '@mui/material';

const localizer = momentLocalizer(moment);

function CalendarConge() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:4000/api/conge/agendaConge')
      
    .then((response) => {
    
      console.log(response.data)
    
      // Format data to make it compatible with React Big Calendar
    
      const formattedEvents = response.data.filter((event) => (event.approbation === true)).map((event) => {
          return {
            id: event.id,
            title: `${event.Collab.nom} ${event.Collab.prenom}`,
            motif: `${event.motif}`,
            description: `${event.description}`,
            type : `${event.Type.nom}`,
            start: moment.tz(event.dayStart, 'Africa/Nairobi').toDate(),
            end: moment.tz(event.dayEnd, 'Africa/Nairobi').toDate(),
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
    setShowMore(!showMore);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="voirPlusContainer">
        <div className="calendarContainer">
          <div className="calendarWrapper">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              step={15}
              onSelectEvent={handleEventSelect}
              style={{padding: '15px', backgroundColor: 'white', borderRadius: '20px' }}
            />
            {showMore && (
              <div className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-md">
                <button onClick={() => setShowMore(false)} className="absolute top-0 right-0 p-2">
                  <FaTimes />
                </button>
                <Typography className="text-2xl font-bold mb-4">{selectedEvent.title}</Typography>
                <Typography className="text-lg mb-2">{selectedEvent.motif}</Typography>
                <Typography className="text-lg mb-2">{selectedEvent.description}</Typography>
                <Typography className='text-lg mb-2'>{selectedEvent.type}</Typography>
                <Typography className="text-xl">
                  {selectedEvent.start.toLocaleString()} - {selectedEvent.end.toLocaleString()}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarConge;
