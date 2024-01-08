import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography} from '@mui/material'
import { FiUser, FiUsers, FiCheck, FiX } from 'react-icons/fi';


function VoirPlusDemande() {
  const param = useParams();
  const idDemande = param.id;

  const [demandes, setDemandes] = useState({ demandes: [], Collabs: [], equipe: [] });

  const fetchDemandes = () => {
    axios.get(`http://localhost:4000/api/demande_formation/demande/${idDemande}`)
      .then(res => {
        setDemandes(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchDemandes();
  }, [idDemande]);

  return (
    <div className="container mx-auto my-16 px-16 lg:px-52 pt-16">
    {demandes.demandes && demandes.demandes.length > 0 &&
      demandes.demandes.map((demande) => (
        <div key={demande.id} className="bg-white p-10 rounded-lg shadow mb-10">
          <h1 className="text-2xl font-bold mb-10">{demande.Auteur.nom} {demande.Auteur.prenom}</h1>
          <Typography className="mb-10">{demande.theme}</Typography>
          <Typography>{demande.description}</Typography>
        </div>
      ))}
    
    <div className="flex space-x-10">
      <div className="bg-white p-10 rounded-lg shadow flex-1">
        <h2 className="text-l font-bold mb-6">Demande pour former :</h2>
        {demandes.Collabs && demandes.Collabs.length > 0 ?
          demandes.Collabs.map((collab) => (
            <div key={collab.id} className="mb-4">
              <FiUser className="inline mr-2" />
              <span>{collab.Collab.matricule} {collab.Collab.nom} {collab.Collab.prenom}</span>
            </div>
          ))
          :
          (
            <p className="mb-4">Pas de destinataire spécifique</p>
          )
        }
      </div>
  
      <div className="bg-white p-10 rounded-lg shadow flex-1">
        <h2 className="text-l font-bold mb-10">Equipe :</h2>
        {demandes.equipe.length !== 0 ? (
          demandes.equipe.length > 0 &&
          demandes.equipe.map((equipe) => (
            <div key={equipe.id} className="mb-10">
              <FiUsers className="inline mr-2" />
              <span>Equipe {equipe.Equipe.nomEquipe}</span>
            </div>
          ))
        ) : (
          <p className="mb-4">Pas d'équipe spécifique</p>
        )}
      </div>
    </div>
  </div>
  
  );
}

export default VoirPlusDemande;
