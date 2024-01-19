import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Formateur/AjoutFormation/AjoutFormation.css';
import {TextField, Grid, Button, Paper, Typography} from "@mui/material";

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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
      className='mt-32'
    >
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Paper elevation={3} style={{ padding: 72, width: '100%' }}>

        <Typography
            className="text-32 md:text-32 font-extrabold tracking-tight"
        >
            Nouvelle demande de formation
        </Typography>

      <form onSubmit={confidentialite === '0' ? (handleSubmit) : (handleSubmitPrivate)}>
          
          <div className='flex items-stretch'>
            
            <TextField type="text" className="mt-8 mb-16" value={theme} label="Thème" onChange={(e) => setTheme(e.target.value)} />

            <TextField type="text" className="mt-8 mb-16 lg:ml-20" value={description} label="Description" onChange={(e) => setDescription(e.target.value)} />
          
          </div>
          
          <div className="form2-group">
          <Typography className="mt-8 mb-16">Pour le publique ou des personnes spécifiques?</Typography>
          <select
            className="mt-8 mb-16"
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
        <Typography className="mt-8 mb-16">Destinataire de votre demande</Typography>
        <select className="mt-8 mb-16" value={destinataire} onChange={(e) => setDestinataire(e.target.value)}>
          <option value="">Destinataire</option>
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
            <Typography className="mt-8 mb-16" >Si pour des personnes, personnes à former:</Typography>
            <select className="mt-8 mb-16" multiple value={collaborateurs} onChange={(e) => setPersonneAFormer(Array.from(e.target.selectedOptions, option => option.value))}>
              {collabs.map((collab) => (
                <option key={collab.id} value={collab.id}>
                  {collab.nom} {collab.prenom}
                </option>
              ))}
            </select>

            </div>
            <div className="form2-group">
              <Typography className="mt-8 mb-16" >Si pour une équipe, équipe à former:</Typography>
              <select className="mt-8 mb-16" multiple value={equipe} onChange={(e) => setEquipeAFormer(Array.from(e.target.selectedOptions, option => option.value))}>
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
            <Button type="submit">Ajouter</Button>
        </div>
        </form>
        </Paper>
      </Grid>
    </Grid>
    )
}

export default AjoutDemandeFormation