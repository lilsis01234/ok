import axios from 'axios'
import React, { useEffect, useState } from 'react'


const ListeCollaborateurDernierEmbauche = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:4000/api/collaborateur/listes_derniers_embauches")
        .then((response) => {
            setData(response.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])
  return (
    <>
      <h2 className="dashboard_table_title">Liste des nouveaux collaborateurs </h2>
      <table className="dashboard_table_item">
          <thead>
              <tr>
                  <th className="table_item_matricule">Matricule</th>
                  <th className="table_item_nom">Nom</th>
                  <th className="table_item_prenom">Prénom</th>
                  <th className="table_item_site">Site</th>
                  <th className="table_item_poste">Poste</th>
                  <th className="table_item_departement">Département</th>
              </tr>
          </thead>
          <tbody>
              {data.map((collaborateur) => (
                  <tr key={collaborateur.id}>
                      <td className="table_item_matricule">{collaborateur.matricule}</td>
                      <td className="table_item_nom">{collaborateur.nom}</td>
                      <td className="table_item_prenom">{collaborateur.prenom}</td>
                      <td className="table_item_site">{collaborateur.site}</td>
                      <td className="table_item_poste">{collaborateur.titrePoste}</td>
                      <td className="table_item_departement">{collaborateur.departement}</td>
                  </tr>
              ))}
          </tbody>
      </table>
    </>
  )
}

export default ListeCollaborateurDernierEmbauche
