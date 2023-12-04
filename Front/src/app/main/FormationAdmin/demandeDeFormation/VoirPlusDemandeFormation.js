import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography} from '@mui/material'


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
    <>
      <div>
        {demandes.demandes && demandes.demandes.length > 0 &&
          demandes.demandes.map((demande) => (
            <div key={demande.id}>
              <h1>{demande.Auteur.nom} {demande.Auteur.prenom}</h1>
              <Typography>{demande.theme}</Typography>
              <Typography>{demande.description}</Typography>
            </div>
          ))}

      </div>
      <div>
      Demande pour :
        {demandes.Collabs && demandes.Collabs.length > 0 ?
          demandes.Collabs.map((collab) => (
            <div key={collab.id}>
              <h4>{collab.Collab.matricule} {collab.Collab.nom} {collab.Collab.prenom}</h4>
            </div>
        ))
          :
          (
            <h1>Pas de destinataire spécifique</h1>
          )
        }

      </div>
      <div>

        {demandes.equipe && demandes.equipe.length > 0 &&
          demandes.equipe.map((equipe) => (
            <div key={equipe.id}>
              <h4>Equipe {equipe.Equipe.nomEquipe}</h4>
            </div>
        ))}
        
      </div>
    </>
  );
}

export default VoirPlusDemande;
