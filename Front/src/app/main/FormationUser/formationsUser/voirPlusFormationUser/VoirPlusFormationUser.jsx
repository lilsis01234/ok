import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const VoirPlusFormationUser = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        console.log(token);
        if (!token){
            navigate('/');
        }
    
        const role = localStorage.getItem('role'); 
        if (!(role.toLowerCase === "user")){
            navigate('/home');
        }
        }, [navigate])

        
        
  return (
    <div>
    <h1>Formation</h1>
    {/* theme de la formation */}
    <h2>Description</h2>
    {/* description de la formation */}
    <h3>Les modules</h3>
    {/* modules de la formations */}
    <h3>Les séances</h3>
    {/* séances de la formation */}
    </div>
  )
}

export default VoirPlusFormationUser