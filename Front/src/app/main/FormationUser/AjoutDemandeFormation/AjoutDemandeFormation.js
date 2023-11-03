import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Formateur/AjoutFormation/AjoutFormation.css';

const AjoutDemandeFormation = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('');
  const [description, setDescription] = useState('');
  const [destinataire, setDestinataire] = useState('');
  const [personneAFormer, setPersonneAFormer] = useState('');
  const [departementAFormer, setDepartementAFormer] = useState('');
  const auteur =2; 
  const[departement,setDepartementData]=useState([]);
  const[collabs,setCollabs]=useState([]);


  const fetchDepartement = () => {
    axios.get('http://localhost:4001/api/departement/all')
      .then((response) => {
        setDepartementData(response.data);
        console.log(response.data); // Log the response.data after setting the state
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  const fetchCollab = () => {
    axios.get('http://localhost:4001/api/collaborateur/all')
      .then((response) => {
        setCollabs(response.data);
        console.log(response.data); // Log the response.data after setting the state
      })
      .catch((err) => {
        console.error(err);
      });
  };
 useEffect(() => {
  fetchDepartement()
  fetchCollab()
}, []) 

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:4001/api/demande_formations/addDemandeFormation', {
        theme,
        description,
        auteur,
        destinataire,
        departementAFormer,
        personneAFormer,
      })
      .then((res) => {
        console.log(res);
        navigate('/dashboards/listeFormation');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form2-container">
      <form onSubmit={handleSubmit}>
          <div className="form2-group">
            <label>Thème</label>
            <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} />
          </div>
          <div className="form2-group">
            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form2-group">
          <label>Destinataire de votre demande</label>
          <select value={destinataire} onChange={(e) => setDestinataire(e.target.value)}>
            <option value="">Sélectionnez un destinataire</option>
            <option value="formateur">Formateur</option>
            <option value="rh">RH</option>
            <option value="coatch">Coatch</option>
          </select>
        </div>
        <div className="form2-group">
          <label>Si pour une personne, personne à former:</label>
          <select value={personneAFormer} onChange={(e) => setPersonneAFormer(e.target.value)}>
          {collabs.map((collab)=>(
            <>
            <option value={collab.id}>{collab.nom} {collab.prenom}</option>
            </>
            ))}
          </select>
        </div>
        <div className="form2-group">
          <label>Si pour un département, département à former:</label>
          <select value={departementAFormer} onChange={(e) => setDepartementAFormer(e.target.value)}>
            {departement.map((departement)=>(
            <>
            <option value={departement.id}>{departement.nomDepartement}</option>
            </>
            ))}
          </select>
        </div>
          <div className="form2-group">
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    )
}

export default AjoutDemandeFormation