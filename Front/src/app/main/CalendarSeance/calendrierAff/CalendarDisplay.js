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


  useEffect(() => {
    // Récupérer les données de l'API backend
    axios.get('http://localhost:4000/api/calendrier/agenda')
      .then((response) => {
        // Formatter les données pour les rendre compatibles avec React Big Calendar
        const formattedEvents = response.data.map((event) => {
          return {
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
    console.log('zany kitihandry zany')
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
            <button className="popupButton" onClick={handleParticipateNowClick}>Participer par appel vidéo</button>
            <button className="popupButton" onClick={handleReserveClick}>Réserver une place</button>
            {/* <button className="popupButton" onClick={() => { handleSetReminderClick(selectedEvent); console.log('vokitika'); }}>Me rappeler cette formation</button> */}
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
