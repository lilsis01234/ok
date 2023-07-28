import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import './listCollab.css'


const ListeCollab = () => {

  const [Collabs, setCollabs] = useState([]);
  useEffect(()=> {
    axios.get('http://localhost:4000/api/collaborateur/all_collaborateurs')
    .then(res => setCollabs(res.data))
    .catch(err => console.log(err));
  },[])  


  return (
    <div>
      <h1>Liste des Collaborateurs</h1>
      <table>
        <thead>
        <tr>
            <th>Photo</th>
            <th>Numéro matricule</th>
            <th>Nom</th>
            <th>Prenoms</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Site</th>
            <th>Poste</th>
            <th>Departement</th>
            <th rowSpan={2}>Actions</th>
        </tr>
        </thead>
        <tbody>
          {Collabs.map(Collab =>
           <tr>
            <td><img src={Collab.image} alt={Collab.nom}/></td>
            <td>{Collab.matricule}</td>
            <td>{Collab.nom}</td>
            <td>{Collab.prenom}</td>
            <td>{Collab.lot}</td>
            <td>{Collab.tel}</td>
            <td>{Collab.site}</td>
            <td>{Collab.titrePoste}</td>
            <td>{Collab.departement}</td>
            <td><button>Modifier</button></td>
            </tr>
          )}
          </tbody>    
        </table>
    </div>
  )
}

export default ListeCollab