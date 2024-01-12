import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './demandeFormation.css'
import { Link } from 'react-router-dom'
import { Typography} from '@mui/material'
import MesDemandes from '../MesDemandes/MesDemandes'


const DemandeFormations = () => {
  const[DemandeFormations,setDemandes] = useState([])
  const[DemandeConsExt, setDemandeConsExt] = useState([])
  const[DemandeCoatch, setDemandeCoatch] = useState([])
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
    axios.post(`http://localhost:4000/api/demande_formation/desapprouver/${id}`)
    .then(res=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    axios.get('http://localhost:4000/api/demande_formation/all')
    .then((res)=>
      { 
        setDemandes(res.data)
        console.log(res.data)
      })
    .catch(err=>console.log(err))

    axios.get('http://localhost:4000/api/demande_formation/allWithoutForm')
    .then((res)=>
      { 
        setDemandeConsExt(res.data)
        console.log(res.data)
      })
    .catch(err=>console.log(err))

    axios.get('http://localhost:4000/api/demande_formation/alldemande/coatch')
    .then((res)=>
      { 
        setDemandeCoatch(res.data)
        console.log(res.data)
      })
    .catch(err=>console.log(err))
  },[])
  
  return (
    <div className="bg-gray-100 p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">Demandes de formations</h1>
      <MesDemandes />

      {(role.toLowerCase() === 'superadministrateur' || role.toLowerCase() === 'rh') && (
        <>
          {DemandeFormations.length !== 0 && (
            <Typography className="mt-6 mb-4">Les demandes de formation</Typography>
          )}
          {DemandeFormations.map((demande, index) => (
            <div key={index} className="training-request-item flex items-center">
          <img
            alt="user photo"
            src={`http://localhost:4000/${demande.Auteur.image}`}
            className="w-96 h-96 rounded-full mr-4"
          />
          <div>
            <Typography className="font-bold">
              {demande.Auteur.nom} {demande.Auteur.prenom}
            </Typography>
            <Typography className="text-gray-600">{demande.theme}</Typography>
            <Link to={`/voirPlus/demande/${demande.id}`} className="text-blue-500 underline mb-2 block">
              Voir plus
            </Link>
            <div className="flex">
              <button onClick={() => Approuver(demande.id)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                Approuver
              </button>
              <button onClick={() => Desapprouver(demande.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                Desapprouver
              </button>
            </div>
          </div>
          </div>

          ))}

          {DemandeConsExt.length !== 0 && (
            <Typography className="mt-6 mb-4">Les demandes approuvées sans consultant externe</Typography>
          )}
          {DemandeConsExt.map((demande, index) => (
            <div key={index} className="training-request-item">
              <Typography className="font-bold">{demande.Auteur.nom} {demande.Auteur.prenom}</Typography>
              <Typography className="text-gray-600">{demande.theme}</Typography>
              <Link to={`/voirPlus/demande/${demande.id}`} className="text-blue-500 underline mb-2 block">
                Voir plus
              </Link>
            </div>
          ))}
        </>
      )}

      {(role === 'Coatch' || role === 'SuperAdministrateur') && (
        <>
          <Typography className="mt-6 mb-4">Les demandes de formation pour le coatch</Typography>

          {DemandeCoatch.map((demande, index) => (
            <div key={index} className="training-request-item">
              <Typography className="font-bold">{demande.Auteur.nom} {demande.Auteur.prenom}</Typography>
              <Typography className="text-gray-600">{demande.theme}</Typography>
              <Link to={`/voirPlus/demande/${demande.id}`} className="text-blue-500 underline mb-2 block">
                Voir plus
              </Link>

              {role === 'Coatch' && (
                <>
                  <button onClick={() => Approuver(demande.id)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                    Approuver
                  </button>
                  <button onClick={() => Desapprouver(demande.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                    Desapprouver
                  </button>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
)
}

export default DemandeFormations