import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import './listCollab.css'
import { Link } from "react-router-dom";


const ListeCollab = () => {

  const [Collabs, setCollabs] = useState([]);
  useEffect(()=> {
    axios.get('http://localhost:4000/api/collaborateur/all_collaborateurs')
    .then(res => setCollabs(res.data))
    .catch(err => console.log(err));
  },[])  


  return (
    <div className="bodyliste">
      <button className="ajout"><Link to='/admin/add'>+</Link></button>
      <h1>Liste des Collaborateurs</h1>
      <table className="listeCollabo">
        <thead>
        <tr>
            <th>Photo</th>
            <th>Numéro matricule</th>
            <th>Nom</th>
            <th>Prenoms</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Date de naissance</th>
            <th>Poste</th>
            <th>Departement</th>
            <th rowSpan={2}>Actions</th>
        </tr>
        </thead>
        <tbody>
          {Collabs.map(Collab =>
           <tr key={Collab.id}>
            <td><img src={`http://localhost:4000/${Collab.image}`} alt={Collab.nom}/></td>
            <td>{Collab.matricule}</td>
            <td>{Collab.nom}</td>
            <td>{Collab.prenom}</td>
            <td>{Collab.lot}</td>
            <td>{Collab.tel}</td>
            <td>{Collab.dateNaissance}</td>
            <td>{Collab.titrePoste}</td>
            <td>{Collab.departement}</td>
            <td><button className="update"><Link to={`/admin/update/${Collab.id}`}>Modifier</Link></button></td>
            </tr>
          )}
          </tbody>    
        </table>
    </div>
  )
}

export default ListeCollab