import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCollab = () => {

 const navigate = useNavigate();
 const [nom,setNom]=useState('');
 const [prenom,setPrenom]=useState('');
 const [lot,setLot]=useState('');
 const [quartier,setQuartier]=useState('');
 const [ville,setVille]=useState('');
 const [telephone,setTelephone]=useState('');

 
 const Validation=(event)=>{
    event.preventDefault();
    const Collabs = {
        nom:nom,
        prenom:prenom,
        lot:lot,
        quartier:quartier,
        ville:ville,
        telephone:telephone
    }

    axios.post('http://localhost:4000/api/collaborateur/add', Collabs)
    .then(res => {
        console.log(res);
        navigate('/');
    }).catch(err =>console.log(err));
 } 
  return (
    <div>
        <h1>Ajouter un collaborateur</h1>
        <form onSubmit={Validation}>
           Nom: <input type='text'></input>
           Prenom: <input type='text'></input>
           Lot: <input type='text'></input>
           Quartier: <input type='text'></input>
           Ville: <input type='text'></input>
           Téléphone: <input type='text'></input>
        </form>
    </div>
  )
}

export default AddCollab