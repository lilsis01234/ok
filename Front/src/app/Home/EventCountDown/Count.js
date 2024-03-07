import React, { useState, useEffect } from 'react';

const CountdownComponent = () => {
  const targetDate = new Date(new Date().getFullYear(), 6, 26).getTime();
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  const handleCountdown = ({ days, hours, minutes, seconds }) => {
    setTimeRemaining({
      days,
      hours: formatNumber(hours),
      minutes: formatNumber(minutes),
      seconds: formatNumber(seconds),
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      handleCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-row justify-center align-center w-full xs:text-5xl sm:text-7xl">
      <div className="grid w-1/3">
        <span className="font-medium">{timeRemaining.days}</span>
        <span className="text-base font-normal">Jours</span>
      </div>
        <div>:</div>
      <div className="grid w-1/3">
        <span className="font-medium">{timeRemaining.hours}</span> 
        <span className="text-base font-normal">Heures</span>
      </div>
        <div>:</div>
      <div className="grid w-1/3">
        <span className="font-medium">{timeRemaining.minutes}</span> 
        <span className="text-base font-normal">Minutes</span>
      </div>
        <div>:</div>
      <div className="grid w-1/3">
        <span className="font-medium">{timeRemaining.seconds}</span> 
        <span className="text-base font-normal">Secondes</span>
      </div>
    </div>
  );
};

export default CountdownComponent;
