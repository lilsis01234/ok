import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Typography} from '@mui/material'
import { Link } from 'react-router-dom';


function MesDemandes (){
    const[mesDemandesFormations, setMesDemandesFormations] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const idPersonne = user.id;

    const fetchDemande = () =>{
        axios.get(`http://localhost:4000/api/demande_formation/all_demande/${idPersonne}`)
        .then((res)=>{
            setMesDemandesFormations(res.data)
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchDemande()
    })

    return(
        <div>
        {mesDemandesFormations.map((demande, index) => (
            
            <div key={index} className="training-request-item">
              <Typography className="theme">{demande.theme}</Typography>
              <Typography className="description">{demande.description}</Typography>
              <Typography>Destinataire : {demande.RoleHierarchique.roleHierarchique}</Typography>
              
              <Typography
                className={`${
                    demande.approbation === true ? 'text-green-500' :
                    demande.approbation === null ? 'text-yellow-800' :
                    'text-red-500'
                }`}
              >
                {demande.approbation === true ? 'APPROUVÉE ' :
                demande.approbation === null ? 'PAS ENCORE APPROUVÉE ' :
                'REFUSÉE'}
              </Typography>


              <Link to={`/voirPlus/demande/${demande.id}`} className="description">Voir plus </Link>
              <br></br><button>Supprimer</button>
            </div>
        
        ))}
        </div>
    )
}

export default MesDemandes
