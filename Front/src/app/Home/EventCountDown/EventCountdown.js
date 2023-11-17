import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Countdown from 'react-countdown';

const EventCountdown = () => {
    const [events, setEvents] = useState([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [currentYear, setCurrentYear] = useState(2023);
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining())
    const api = `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/MG`


    //Récupérer les évènements stockés dans l'API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(api);
                setEvents(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des jour fériés:', error)
            }
        }

        fetchEvents();
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            const newTimeRemaining = calculateTimeRemaining();
            setTimeRemaining(newTimeRemaining);

            if (newTimeRemaining.total <= 0) {
                setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length)
            }


            if (currentEventIndex === events.length - 1) {
                setCurrentYear((prevYear) => prevYear + 1);
            }
        }, 1000)


        return () => clearInterval(interval);
    }, [currentEventIndex, events, currentYear])


    function calculateTimeRemaining() {
        const now = moment;
        const target = moment(events[currentEventIndex]?.date);
        const duration = moment.duration(target.diff(now));

        return {
            total: duration.asSeconds(),
            days: duration.days(),
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
        }
    }


    const getCurrentEvent = () => events[currentEventIndex];

    const handleCountdownEnd = () => {
        console.log(`Jour férié ${getCurrentEvent()?.name} terminé!`)
    }

    const targetDate = new Date(new Date().getFullYear(), 11, 25).getTime();
    return (
        <div>
            <Countdown date={targetDate}  />
            <Countdown date={events[currentEventIndex]?.date} onComplete={handleCountdownEnd} />
        </div>
    )
}

export default EventCountdown
