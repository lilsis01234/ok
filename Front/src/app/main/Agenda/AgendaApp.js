import FusePageSimple from '@fuse/core/FusePageSimple';
import { useThemeMediaQuery } from '@fuse/hooks';
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react'
import AgendaHeader from './AgendaHeader';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import AgendaAppSideBar from './AgendaAppSideBar';
import EventDialog from './dialog/event/EventDialog';
import { useDispatch } from 'react-redux';
import { getSeanceEvents, openNewEventDialog, selectFilteredEvents } from './store/eventsSlice';
import axios from 'axios';
import moment from 'moment-timezone';
import AgendaAppEventContent from './AgendaAppEventContent';
import { showMessage } from 'app/store/fuse/messageSlice';

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& a': {
        color: `${theme.palette.text.primary}!important`,
        textDecoration: 'none!important',
    },
    '&  .fc-media-screen': {
        minHeight: '100%',
        width: '100%',
    },
    '& .fc-scrollgrid, & .fc-theme-standard td, & .fc-theme-standard th': {
        borderColor: `${theme.palette.divider}!important`,
    },
    '&  .fc-scrollgrid-section > td': {
        border: 0,
    },
    '& .fc-daygrid-day': {
        '&:last-child': {
            borderRight: 0,
        },
    },
    '& .fc-col-header-cell': {
        borderWidth: '0 1px 0 1px',
        padding: '8px 0 0 0',
        '& .fc-col-header-cell-cushion': {
            color: theme.palette.text.secondary,
            fontWeight: 500,
            fontSize: 12,
            textTransform: 'uppercase',
        },
    },
    '& .fc-view ': {
        '& > .fc-scrollgrid': {
            border: 0,
        },
    },
    '& .fc-daygrid-day.fc-day-today': {
        backgroundColor: 'transparent!important',
        '& .fc-daygrid-day-number': {
            borderRadius: '100%',
            backgroundColor: `${theme.palette.secondary.main}!important`,
            color: `${theme.palette.secondary.contrastText}!important`,
        },
    },
    '& .fc-daygrid-day-top': {
        justifyContent: 'center',

        '& .fc-daygrid-day-number': {
            color: theme.palette.text.secondary,
            fontWeight: 500,
            fontSize: 12,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 26,
            height: 26,
            margin: '4px 0',
            borderRadius: '50%',
            float: 'none',
            lineHeight: 1,
        },
    },
    '& .fc-h-event': {
        background: 'initial',
    },
    '& .fc-event': {
        border: 0,
        padding: '0 ',
        fontSize: 12,
        margin: '0 6px 4px 6px!important',
    },
}));

function AgendaApp() {
    const [currentDate, setCurrentDate] = useState();
    const [events, setEvents] = useState();
    // const events = dispatch(selectFilteredEvents)
    const calenderRef = useRef();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile)
    const theme = useTheme()
    const [labels, setLabels] = useState();

    const dispatch = useDispatch();



    //Récupérer les labels et les évenements ici 
    useEffect(() => {
        setLeftSidebarOpen(!isMobile);
    }, [isMobile])

    useEffect(() => {
        // Correct calendar dimentions after sidebar toggles
        setTimeout(() => {
            calenderRef.current?.getApi()?.updateSize();
        }, 300);
    }, [leftSidebarOpen]);


    //Pour récupérer la position de la boîte de dialogue
    const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 })


    //Pour ouvrir la boîte de dialogue
    const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);


    //Pour fermer la boîte de dialogue
    const handleDialogClose = (e) => {
        setIsEventDialogOpen(false)
    }

    //pour définir le type de la boite de dialogue (édition ou ajout)
    const [type, setType] = useState('')

    const [data, setData] = useState({});

    const handleDateSelect = (selectInfo) => {
        const { start, end, jsEvent } = selectInfo || 'null';
        //Mettre le code qui permet de faire quelque chose quand une date est selectionnée
        // setType('new');
        setIsEventDialogOpen(true);
        const positionX = jsEvent?.clientX;
        const positionY = jsEvent?.clientY;

        setData({
            eventStart: start,
            eventEnd: end
        })

        setDialogPosition({ x: positionX, y: positionY })
    }

    
    //Pour mettre à jour les séances existants quand on change l'emplacement des evenements
    const updateEvents = (id, data) =>{
        axios.put(`http://localhost:4000/api/calendrier/edit/${id}`, data)
           .then(response => {
                dispatch(showMessage({message : 'Séance mise à jour avec succès'}))
           })
           .catch(error => {
                dispatch(showMessage({message : 'Erreur lors de la mise à jour des calendrier'}))
                console.error(error);
            })
    }

    const handleDates = (rangeInfo) => {
        setCurrentDate(rangeInfo)
    }

    const handleEventDrop = (eventDropInfo) => {
        //Mettre le code qui s'execute quand on change l'emplacement d'une évenement
        console.log(eventDropInfo)
        const {event} = eventDropInfo;
        const {start, end} = event;

        const idEvent = event?._def?.publicId
        const id = parseInt(idEvent, 10);

        const data = {
            start,
            end,
        }
        updateEvents(id, data);

    }




    //Récupérer l'id de l'évenement cliqué
    const [idEventClick, setIdEventClick] = useState();

    //Récupérer les informations concernant l'évenement cliqué
    //Evenement de type séance
    const getSeanceEvent = (id) => {
        axios.get(`http://localhost:4000/api/calendrier/view/${id}`)
            .then((response) => {
                setData({
                    eventStart: moment.tz(response.data.heureStart, 'Africa/Nairobi').toDate(),
                    eventEnd: moment.tz(response.data.heureEnd, 'Africa/Nairobi').toDate(),
                    titleEvents: response.data.title,
                    nombrePlaces: response.data.nombreDePlaces,
                    formation: response.data.formation,
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }


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

    const handleEventClick = (clickInfo) => {
        //Mettre le code qui s'execute quand un évenement est cliqué
        const { event, jsEvent } = clickInfo || 'null';
        const idEvent = event?._def?.publicId
        const id = parseInt(idEvent, 10);

        setType('edit');
        setIsEventDialogOpen(true);
        setIdEventClick(id);
        getSeanceEvent(id);

        const positionX = jsEvent?.clientX;
        const positionY = jsEvent?.clientY;

        setDialogPosition({ x: positionX, y: positionY })
    }
    

    // const handleEventAdd = (addInfo) => { };

    const handleEventChange = (changeInfo) => { };

    const handleEventRemove = (removeInfo) => { };

    function handleToggleLeftSidebar() {
        setLeftSidebarOpen(!leftSidebarOpen);
    }

    //Récupération des evenements type Séances
    useEffect(() => {
        axios.get('http://localhost:4000/api/calendrier/agenda')
            .then((response) => {
                const formattedEvents = response.data.filter((res) => res.Formation?.confidentialite.toString() === "0").map((event) => {
                    return {
                        auteur: event.Formation.formateur,
                        id: event.id,
                        title: `${event.title} - ${event.nombreDePlaces} places`,
                        start: moment.tz(event.heureStart, 'Africa/Nairobi').toDate(),
                        end: moment.tz(event.heureEnd, 'Africa/Nairobi').toDate(),
                    };
                });
                setEvents(formattedEvents);
                formattedEvents.forEach((event) => scheduleNotification(event));
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])



    return (
        <>
            <Root
                header={
                    <AgendaHeader
                        calendarRef={calenderRef}
                        currentDate={currentDate}
                        onToggleLeftSidebar={handleToggleLeftSidebar}
                    />
                }
                content={
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        locale={frLocale}
                        headerToolbar={false}
                        initialView="dayGridMonth"
                        editable
                        selectable
                        selectMirror
                        dayMaxEvents
                        weekends
                        datesSet={handleDates}
                        select={handleDateSelect}
                        events={events}
                        eventContent={(eventInfo) => <AgendaAppEventContent eventInfo={eventInfo} />}
                        eventClick={handleEventClick}
                        // eventAdd={handleEventAdd}
                        eventChange={handleEventChange}
                        eventRemove={handleEventRemove}
                        eventDrop={handleEventDrop}
                        initialDate={new Date()}
                        ref={calenderRef}
                    />
                }
                leftSidebarContent={<AgendaAppSideBar />}
                leftSidebarOpen={leftSidebarOpen}
                leftSidebarOnClose={() => setLeftSidebarOpen(false)}
                leftSidebarWidth={240}
                scroll="content"
            />
            <EventDialog
                open={isEventDialogOpen}
                type={type}
                position={dialogPosition}
                closePopover={handleDialogClose}
                data={data}
                idEvent={idEventClick}
            />
        </>
    )
}

export default AgendaApp

