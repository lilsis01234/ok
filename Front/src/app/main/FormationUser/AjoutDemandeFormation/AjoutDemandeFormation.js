import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Formateur/AjoutFormation/AjoutFormation.css';

const AjoutDemandeFormation = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('');
  const [description, setDescription] = useState('');
  const [destinataire, setDestinataire] = useState('');
  const [collaborateurs, setPersonneAFormer] = useState(null);
  const [equipe, setEquipeAFormer] = useState(null);
  const[equipes,setEquipeData]=useState([]);
  const[collabs,setCollabs]=useState([]);
  const [roleHierarchique,setRoleHierarchique]= useState([]);
  const auteurPrep =localStorage.getItem('user'); 

  console.log(auteurPrep);
    const parsedAuteur = JSON.parse(auteurPrep);
    const auteur = parsedAuteur.id;
    const duree = "indefini";
    console.log(auteur);

  const fetchEquipe = () => {
    axios.get('http://localhost:4000/api/equipe/all')
      .then((response) => {
        setEquipeData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  const fetchRoleHierarchique = ()=>{
    axios.get('http://localhost:4000/api/roleHierarchique/all')
    .then((response)=>{
      setRoleHierarchique(response.data);
      console.log(response.data)
    })
    .catch((err)=>{
      console.error(err)
    })
  }

  const fetchCollab = () => {
    axios.get('http://localhost:4000/api/collaborateur/all')
      .then((response) => {
        setCollabs(response.data);
        console.log(response.data); // Log the response.data after setting the state
      })
      .catch((err) => {
        console.error(err);
      });
  };

 useEffect(() => {
  fetchEquipe()
  fetchCollab()
  fetchRoleHierarchique()
}, []) 

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(destinataire)
    axios
      .post('http://localhost:4000/api/demande_formation/addDemandeFormation', {
        theme,
        description,
        auteur,
        destinataire,
        equipe,
        collaborateurs,
        duree
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
          <select value={destinataire} onChange={(e) =>{console.log(e.target.value) 
                                                        setDestinataire(e.target.value)}}>
            {roleHierarchique.map((role) => (
              <option key={role.id} value={role.id}>
                {role.roleHierarchique}
              </option>
            ))}
          </select>
         </div>

         <div className="form2-group">
          <label>Si pour des personnes, personnes à former:</label>
          <select multiple value={collaborateurs} onChange={(e) => setPersonneAFormer(Array.from(e.target.selectedOptions, option => option.value))}>
            {collabs.map((collab) => (
              <option key={collab.id} value={collab.id}>
                {collab.nom} {collab.prenom}
              </option>
            ))}
          </select>
        </div>
        <div className="form2-group">
          <label>Si pour une équipe, équipe à former:</label>
          <select multiple value={equipe} onChange={(e) => setEquipeAFormer(Array.from(e.target.selectedOptions, option => option.value))}>
            {equipes.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.nomEquipe	}
              </option>
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