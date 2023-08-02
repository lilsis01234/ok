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
     <div className='block2'>
  {listePoste.map(poste => (
    <div className='com' key={poste.id}>
      <div className='background-image'></div>
      <h4>{poste.titrePoste}</h4>
      <Link to={`/admin/postes/collab/${poste.id}`}>
        <h5>Voir qui ont ce poste</h5>
      </Link>
    </div>
  ))}
</div>
    </div>
  )
}

export default Postes