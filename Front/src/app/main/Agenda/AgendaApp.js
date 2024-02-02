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
    const calenderRef = useRef();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile)
    const theme = useTheme()
    const [labels, setLabels] = useState();

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


    const handleDateSelect = (selectInfo) => {
        const { start, end } = selectInfo;
        //Mettre le code qui permet de faire quelque chose quand une date est selectionnée
    }

    const handleEventDrop=(eventDropInfo) => {
        //Mettre le code qui s'affiche quand un évenement est cliqué
    }

    const handleEventClick = (clickInfo) => {
        //Mettre le code qui permet de faire quelque chose quand une date est cliquée
    }

    const handleDates = (rangeInfo) => {
        setCurrentDate(rangeInfo)
    }

    const handleEventAdd = (addInfo) => { };

    const handleEventChange = (changeInfo) => { };

    const handleEventRemove = (removeInfo) => { };

    function handleToggleLeftSidebar() {
        setLeftSidebarOpen(!leftSidebarOpen);
    }



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
                        // eventContent={(eventInfo) => <CalendarAppEventContent eventInfo={eventInfo} />}
                        eventClick={handleEventClick}
                        eventAdd={handleEventAdd}
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
        </>
    )
}

export default AgendaApp

