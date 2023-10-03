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
        scheduleNotification(formattedEvents);
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

  const handleSetReminderClick = (event) => {
    scheduleNotification(event);
  };

  // const scheduleNotifications = (events) => {
  //   console.log("Scheduling notifications for events:", events);
  //   events.forEach((event) => {
  //       const notificationTime = new Date(event.start.getTime() - 10 * 60 * 1000); // 10 minutes before the event
  //       console.log(notificationTime)
  //       const currentTime = new Date();

  //       // if (notificationTime > currentTime) {
  //       //     const timeDifference = notificationTime - currentTime;
  //       //     setTimeout(() => {
  //       //         showNotification(event.title);
  //       //     }, timeDifference);
  //       // }

  //       const message = "Dans 10 minutes";
  //       if (notificationTime.getTime() === currentTime.getTime()) {
  //         showNotification(event.title,message);
  //     }
  //   });
  // };

  const scheduleNotification = (event) => {
    const notificationTime = new Date(event.start.getTime() - 10 * 60 * 1000); // 10 minutes before the event
    const currentTime = new Date();
  
    if (notificationTime > currentTime) {
      setTimeout(() => {
        showNotification(event.title, 'Dans 10 minutes');
      }, notificationTime - currentTime);
    } else {
      console.log('Event has already passed.');
    }
  };s

    const showNotification = (title,costumMessage) => {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
        } else {
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    const confirmed = window.confirm(`Do you want to receive a notification for "${title}"?`);
                    if (confirmed) {
                        try {
                            const notification = new Notification(title + ''+costumMessage, { requireInteraction: true });
                            console.log('lasa le notif')
                            notification.onclick = function () {
                                Navigate('/dashboard/calendarSeance');
                            };
                        } catch (err) {
                            console.error("Error showing notification:", err);
                        }
                    }
                }
            });
        }
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
          <button onClick={() => handleSetReminderClick(selectedEvent)}>Me rappeler cette formation</button>
        </div>
      )}
    </div>
  );
}

export default CalendarTraining;
