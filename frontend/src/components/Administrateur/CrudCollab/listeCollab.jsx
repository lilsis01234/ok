import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";


const ListeCollab = () => {

  const [Collabs, setCollab] = useState([]);

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
            <td>Nom</td>
            <td>Prenoms</td>
          </tr>
          <tr>
            <td>{Collab.nom}</td>
            <td>{Collab.prenom}</td>
          </tr>
        </table>
        )}
    </div>
  )
}

export default ListeCollab