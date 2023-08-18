import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './AjoutPoste.css'


const AjoutPoste = ({onPosteAdded}) => {
    const [titrePoste, setTitrePoste] = useState('');
    const [departement, setDepartement] = useState('');
    const [departementList, setDepartementList] = useState([]);

    //Récupération des départements dans la base de données
    useEffect(() => {
       axios.get('http://localhost:4000/api/departement/all_departement')
       .then(response => {
           setDepartementList(response.data);
       }) 
       .catch(error => {
           console.error('Erreur lors de la récupération des données:', error)
       })
    }, []);
    const handleSelectChange = (event) => {
        setDepartement(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            titrePoste,
            departement
        }

        if(!titrePoste.trim() && !departement.trim()){
            alert("Le champ Poste ne peut pas être vide");
            return;
        }
        axios.post('http://localhost:4000/api/poste/add', formData)
        .then((response) => {
            alert('Poste ajoutée avec succès')
            onPosteAdded();
        })
        .catch((error) => {
            console.error(error)
        })

 
        
    }


  return (
    <div>
      <form className="addPoste_form">
          <div >
              <label>Poste</label>
              <input type="text" value={titrePoste} onChange={(e) => setTitrePoste(e.target.value)} placeholder="Entrer un poste"></input>
          </div>
          <div>
              <label>Département</label>
              <select value={departement} onChange={handleSelectChange}>
                    <option value="">Sélectionnez une option</option>
                    {departementList.map(departement => (
                        <option key={departement.id} value={departement.id}>{departement.nomDepartement}</option> ))}
              </select>
          </div>
            <button type="submit" onClick={handleSubmit} className="addPoste_Submit">Ajouter</button>
      </form>
    </div>
  )
}

export default AjoutPoste
