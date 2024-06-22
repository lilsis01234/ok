import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment-timezone';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const localizer = momentLocalizer(moment);

function CalendarForm() {
  const [events, setEvents] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');
  const formation = useParams();
  const idformation = formation.id;
  const navigate = useNavigate();

  const handleSelect = ({ start, end }) => {
    const titre = window.prompt('Nom de l\'événement :');
    if (titre) {
      const placesString = window.prompt('Nombre de places :');
      const nombrePlaces = parseInt(placesString, 10) || 0;

      const newEvent = {
        start: new Date(Date.parse(start)),
        end: new Date(Date.parse(end)),
        title: titre,
        nombreDePlaces: nombrePlaces,
        module: selectedModule,
      };
      setEvents([...events, newEvent]);
    }
  };

  const ModuleGet = () => {
    axios.get(`http://localhost:4000/api/module/modules/${idformation}`)
      .then(response => {
        setModules(response.data);
      })
      .catch(error => {
        console.error('Error fetching modules:', error);
      });
  };

  useEffect(() => {
    ModuleGet();
  }, []);

  const handleSave = () => {
    axios.post('http://localhost:4000/api/agenda/agenda', { events, idformation })
      .then(response => {
        console.log(response.data);
        navigate(`/admin/formation/${idformation}`);
      })
      .catch(error => {
        console.error('Error saving events:', error);
      });
  };

  return (
    <div style={{ height: '500px' }}>
      <div>
        <label htmlFor="moduleSelect">Select Module:</label>
        <select
          id="moduleSelect"
          value={selectedModule}
          onChange={e => setSelectedModule(e.target.value)}
        >
          <option value="">Select a module</option>
          {modules.map(module => (
            <option key={module.id} value={module.id}>{module.titreModule}</option>
          ))}
        </select>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        resizable
        onSelectSlot={handleSelect}
        step={1}
        style={{ margin: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}
      />
      <button type="button" onClick={handleSave}>
        Enregistrer
      </button>
    </div>
  );
}

export default CalendarForm;
