import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './demandeFormation.css'
import { Link } from 'react-router-dom'
import { Typography} from '@mui/material'
import MesDemandes from './MesDemandes'


const DemandeFormations = () => {
  const[DemandeFormations,setDemandes] = useState([])

  const user = JSON.parse(localStorage.getItem('user'));
  const role = user.RoleHierarchique.roleHierarchique;
  console.log(role)


  const Approuver =(id)=>{
    console.log("demande approuvé pour n°" + id);
    axios.post(`http://localhost:4000/api/demande_formation/approuver/${id}`)
    .then(res=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const Desapprouver=(id)=>{
    console.log("demande refusé pour n°" + id);
  }

  useEffect(()=>{
    axios.get('http://localhost:4000/api/demande_formation/all')
    .then((res)=>
      { 
        setDemandes(res.data)
        console.log(res.data)
      })
    .catch(err=>console.log(err))
  })
  
  return (
    <div className="training-request-container">
      <h1 className="collabListes_title font-bold">Demandes de formations</h1>
      <Typography>Vos demandes</Typography>

      <MesDemandes/>

      {role === "SuperAdministrateur" &&
      (
      <>
      <Typography>Les demandes de formation</Typography>
      {DemandeFormations.map((demande, index) => (
        <div key={index} className="training-request-item">
          <Typography className="name">{demande.Auteur.nom} {demande.Auteur.prenom}</Typography>
          <Typography className="theme">{demande.theme}</Typography>
          <Link to={`/voirPlus/demande/${demande.id}`} className="description">Voir plus </Link>
          <button onClick={()=>{Approuver(demande.id)}}>Approuver</button>
          <button onClick={()=>{Desapprouver(demande.id)}}>Desapprouver</button>
        </div>
      ))}
      </>
      )  
    }
    </div>
  )
}

export default DemandeFormations