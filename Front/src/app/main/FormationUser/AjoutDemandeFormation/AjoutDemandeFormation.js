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
  const [confidentialite,setConfidentialite]= useState(null);
  const parsedAuteur = JSON.parse(localStorage.getItem('user'));
  const auteur = parsedAuteur.id;

  const confident = [{
                      id:0,
                      status:"Tout publique"
                    },{
                      id:1,
                      status:"Besoin spécifique"
                    }];

  const roleHierarchique = [{
                              id:1,
                              roleHierarchique:"SuperAdministrateur"
                           },{
                              id:4,
                              roleHierarchique:"Coatch"
                           }]

  const fetchEquipe = () => {
    axios.get('http://localhost:4000/api/equipe/all')
      .then((response) => {
        setEquipeData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
}, []) 

  const handleSubmitPrivate = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:4000/api/demande_formation/addDemandeFormationPrivate', {
        theme,
        description,
        auteur,
        destinataire,
        equipe,
        collaborateurs,
        confidentialite
      })
      .then((res) => {
        console.log(res);
        navigate('/dashboards/listeFormation');
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit=(event)=>{
    event.preventDefault();
    console.log(confidentialite)
    axios
      .post('http://localhost:4000/api/demande_formation/addDemandeFormationPublic', {
        theme,
        description,
        auteur,
        destinataire,
        confidentialite
      })
      .then((res) => {
        console.log(res);
        navigate('/dashboards/listeFormation');
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="form2-container">
      <form onSubmit={confidentialite === '0' ? (handleSubmit) : (handleSubmitPrivate)}>
          <div className="form2-group">
            <label>Thème</label>
            <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} />
          </div>
          <div className="form2-group">
            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="form2-group">
          <label>Pour le publique ou des personnes spécifiques?</label>
          <select
            value={confidentialite}
            onChange={(e) => {
              setConfidentialite(e.target.value);
            }}
          >
            {confident.map((conf) => (
              <option key={conf.id} value={conf.id}>
                {conf.status}
              </option>
            ))}
          </select>
        </div>

        <div className="form2-group">
        <label>Destinataire de votre demande</label>
        <select value={destinataire} onChange={(e) => setDestinataire(e.target.value)}>
          <option value="">Select Destinataire</option>
          {roleHierarchique.map((role) => (
            <option key={role.id} value={role.id}>
              {role.roleHierarchique}
            </option>
          ))}
        </select>
      </div>

        
         {confidentialite === '1' && (
          <>
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
                    {eq.nomEquipe}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="form2-group">
            <button type="submit">Ajouter</button>
        </div>
        </form>
      </div>
    )
}

export default AjoutDemandeFormation