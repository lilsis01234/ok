import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";


const ListeCollab = () => {

  const [Collabs, setCollab] = useState([]);

  
  const Supprimer =async (id) =>{
    try{
        await axios.delete('http://localhost:4000/delete/'+id)
        window.location.reload()
    }catch(err) {
        console.log(err)
    }
  }


    useEffect(()=> {
      axios.get('http://localhost:"4000"/all_collaborateurs')
      .then(res => setCollab(res.data))
      .catch(err => console.log(err));
    },[])  


  return (
    <div>
      <h4>Liste des Collaborateurs</h4>
      {Collabs.map(Collab =>
        <table>
          <tr>
            <td>Photo</td>
            <td>Numéro matricule</td>
            <td>Nom</td>
            <td>Prenoms</td>
            <td>Sexe</td>
            <td>Date de naissance</td>
            <td>Adresse</td>
            <td>Quartier</td>
            <td>Ville</td>
            <td>Téléphone</td>
            <td>Date d'embauche</td>
            <td>Site</td>
            <td>Poste</td>
            <td rowSpan={2}>Actions</td>
          </tr>

          <tr>
            <td><img src={Collab.image} alt={Collab.nom}/></td>
            <td>{Collab.matricule}</td>
            <td>{Collab.nom}</td>
            <td>{Collab.prenom}</td>
            <td>{Collab.sexe}</td>
            <td>{Collab.dateNaissance}</td>
            <td>{Collab.lot}</td>
            <td>{Collab.quartier}</td>
            <td>{Collab.ville}</td>
            <td>{Collab.tel}</td>
            <td>{Collab.dateEmbauche}</td>
            <td>{Collab.site}</td>
            <td>{Collab.poste}</td>
            <td><button>Modifier</button></td>
            <td><button onClick={(e) =>Supprimer(Collab.id)}>Supprimer</button></td>
          </tr>
        </table>
        )}
    </div>
  )
}

export default ListeCollab