import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Postes = () => {
    const[listePoste,setListePoste]= useState([])
    useEffect(()=>{
        axios.get('http://localhost:4000/api/poste/all_postes')
        .then((res) => {setListePoste(res.data)
                     console.log(listePoste)})
        .catch(err => console.log(err));
       }
       )
  return (
    <div className='poste'>
     <h1>Les postes</h1>
        {listePoste.map(poste=>(
            <Link to={`collab/${poste.id}`}><h3>{poste.titrePoste}</h3></Link>
        ))}
    </div>
  )
}

export default Postes