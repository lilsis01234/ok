import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../AjoutPoste/AjoutPoste.css'

const ModifPoste = ({posteToEdit, onPosteUpdated}) => {
    const [titrePoste, setTitrePoste] = useState(posteToEdit?.titrePoste || '')
    const [departement, setDepartement] = useState(posteToEdit?.departement || '') 
    const [departementList, setDepartementList] = useState([]);

    useEffect(() => {
        axios.get('http;//localhost:4000/api/departement/all_departement')
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

    useEffect(() => {
        if(posteToEdit){
            setTitrePoste(posteToEdit.titrePoste)
            setDepartement(posteToEdit.departement)
        } else {
            setTitrePoste("");
            setDepartement("")
        }
    }, [posteToEdit])

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

        axios.put(`http;//localhost:4000/api/poste/edit/${posteToEdit.id}`, formData)
        .then((response) => {
            onPosteUpdated();
            alert('Département modifier avec succès')
        })
        .catch((error) => {
            console.error(error)
        })

    
    }



  return (
    <div>
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
            <button type="submit" onClick={handleSubmit} className="addPoste_Submit">Modifier</button>
      </form>
    </div>
    </div>
  )
}

export default ModifPoste
