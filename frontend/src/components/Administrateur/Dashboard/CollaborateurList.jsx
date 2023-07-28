import axios from 'axios'
import React from 'react'


const CollaborateurList = () => {
    const [data, setData] = useStatr([])
    axios.get("http://192.168.16.244:4001/api/collaborateur/collaborateur")
    .then((response) => {
        setData(response.data)
    })
    .catch((err)=>{
        console.error(err)
    }, [])
  return (
    <div>
        <h2>Liste des 10 derniers collaborateurs</h2>
        <table>
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Département</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((collaborateur) => (
                    <tr key={collaborateur.id}>
                        <td>{collaborateur.matricule}</td>
                        <td>{collaborateur.nom}</td>
                        <td>{collaborateur.prenom}</td>
                        <td>{collaborateur.dateEmbache}</td>
                        <td>{collaborateur.titrePoste}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default CollaborateurList
