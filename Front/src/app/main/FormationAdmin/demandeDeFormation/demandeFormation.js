import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './demandeFormation.css'
import { Link } from 'react-router-dom'
import { Typography} from '@mui/material'


const DemandeFormations = () => {
  const[DemandeFormations,setDemandes] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:4000/api/demande_formation/all')
    .then((res)=>
      { setDemandes(res.data)
        console.log(res.data)
      })
    .catch(err=>console.log(err))
  })
  
  return (
    <div className="training-request-container">
      <Typography className="collabListes_title font-bold">Demandes de formations</Typography>
      {DemandeFormations.map((demande, index) => (
        <div key={index} className="training-request-item">
          <Typography className="name">{demande.Auteur.nom} {demande.Auteur.prenom}</Typography>
          <Typography className="theme">{demande.theme}</Typography>
          {/* <p className="description">{demande.description}</p> */}
          <Link to={`/voirPlus/demande/${demande.id}`} className="description">Voir plus </Link>
          {/* <button onClick={Approuver(demande.id)}>Approuver</button>
          <button onClick={Desapprouver(demande.id)}>Approuver</button> */}
        </div>
      ))}
    </div>
  )
}

export default DemandeFormations