import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AjoutFormation.css'

const AjoutDemandeFormation = ()=>{

    const navigate = useNavigate()
    const[theme,setTheme] = useState('');
    const[description,setDescription]= useState('');
    const[destinataire,setDestinataire] = useState('');
    const[personneAFormer,setPersonneAFormer] = useState('');
    const[departementAFormer,setDepartementAFormer] = useState('');

    const duree = 'indefini'
    const auteur = 2
    const formateur = 2

    const handleSubmit =(event)=>{
        event.preventDefault()
        axios.post('http://localhost:4001/api/demande_formations', {theme,description, duree,auteur,formateur})
        .then(res => {
            console.log(res);
            navigate('/dashboards/listeFormation');
        }).catch(err =>console.log(err));
    }
    return(
        <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Thème</label>
            <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Destinataire de votre demande</label>
            <input type="text" value={destinataire} onChange={(e) => setDestinataire(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Si pour une personne, personne à former:</label>
            <input type="text" value={personneAFormer} onChange={(e) => setPersonneAFormer(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Si pour un département, département à former:</label>
            <input type="text" value={departementAFormer} onChange={(e) => setDepartementAFormer(e.target.value)} />
          </div>
          <div className="form-group">
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    )
}

export default AjoutDemandeFormation