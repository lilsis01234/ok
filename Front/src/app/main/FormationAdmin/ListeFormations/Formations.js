import React, { useState } from 'react'
import { useEffect } from 'react'
import '../demandeDeFormation/demandeFormation.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Typography} from '@mui/material'
import EditFormation from '../../FormationUser/Formateur/EditFormation/EditFormation';


const Formations = () => {

  const[Formation,setFormations] = useState([]);
  const[formExt, setFormExt] = useState(null);
  const [FormationAdmin, setFormationAdmin] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user.RoleHierarchique.roleHierarchique;
  const userId = user.id;
  const [editingFormation, setEditingFormation] = useState(null);


  const addFormateur = (id) => {
    console.log(id);
    axios
      .post(`http://localhost:4000/api/demande_formation/addFormExt/${id}`, {
        formateurExt: formExt,
      })
      .then((res) => {
        console.log(res);
        setFormExt(null);
        setShowButtons(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFormSubmit = (e, id) => {
    e.preventDefault();
    addFormateur(id);
  };

  const Click = () =>{
    setShowButtons(!showButtons);
  }

  const fetchFormation = () => {
    axios.get('http://localhost:4000/api/formations/all_formations')
      .then(res => {setFormations(res.data)
      })
      .catch(err => console.log(err));
  }

  const fetchFormationAdmin = ()=>{
    axios.get('http://localhost:4000/api/formations/all/admin')
    .then(res => {
      setFormationAdmin(res.data)
    })
  }

  useEffect(() => {
    fetchFormation();
    fetchFormationAdmin();
  })


  const [recherche,setRecherche] = useState(null);
  
  return (

          <>
          <div className='header'>
            <h1>Explorez nos Formations</h1>
            <h2><Link to='/mesFormations'>Mes Formations</Link></h2>
            <div className="search_form">
              
              <input
                type='text'
                placeholder='Rechercher ici...'
                onChange={(e) => {
                  setRecherche(e.target.value);
                }}
              />
            </div>

          </div>
          {role === "SuperAdministrateur" && (
              <>
                <Typography>
                  <h2>Les formations approuvées</h2>
                </Typography>

                {FormationAdmin.length !== 0 ? (
                  recherche === '' || recherche === null ? (
                    FormationAdmin.map((formation) => (
                      <div key={formation.id} className="formation_item">
                        <Link to={`/admin/formation/${formation.id}`}>
                          <h2 className="formation_title">{formation.theme}</h2>
                        </Link>

                        <Typography className="formation_description">{formation.description}</Typography>
                        {formation.Formateur || formation.formateurExt ? (
                          <Typography className="formateur_name">
                            Formateur: {formation.Formateur ? `${formation.Formateur.nom} ${formation.Formateur.prenom}` : ''} {formation.Formateur && formation.formateurExt ? '|| ' : ''} {formation.formateurExt}
                          </Typography>
                        ) : (
                          <button onClick={()=>{Click()}}> Ajouter un formateur </button>
                        )}

                        {showButtons &&
                        <div className="popup">
                        <div className="popupContent">
                          <input type='text' placeholder='nom du formateur' value={formExt} onChange={(e) => setFormExt(e.target.value)}></input>
                          <button type='submit' onClick={(e) => handleFormSubmit(e, formation.id)}>Valider</button>
                        </div>
                        </div>
                        }

                        <Link to={`/discussion/formation/${formation.id}`}>
                          <span className="lien">Accéder à la discussion</span>
                        </Link>

                        <button className="voir_plus_button">
                          <Link to={`/admin/formation/${formation.id}`}>?</Link>
                        </button>
                        
                        <button onClick={() => setEditingFormation(formation)}>
                          Edit
                        </button>
                        
                        {editingFormation && editingFormation.id === formation.id && (
                          <EditFormation
                            formationId={formation.id}
                            theme={formation.theme}
                            description={formation.description}
                          />
                        )} 
                        
                      </div>
                    ))
                  ) : (
                    // If recherche has a value, filter and display matching formations
                    FormationAdmin.filter((formation) =>
                      formation.theme.toLowerCase().includes(recherche.toLowerCase()) ||
                      formation.description.toLowerCase().includes(recherche.toLowerCase()) ||
                      (formation.Formateur &&
                        formation.Formateur.nom &&
                        formation.Formateur.nom.toLowerCase().includes(recherche.toLowerCase())) ||
                      (formation.Formateur &&
                        formation.Formateur.prenom &&
                        formation.Formateur.prenom.toLowerCase().includes(recherche.toLowerCase()))
                    ).map((formation) => (
                      <div key={formation.id} className="formation_item">
                        <h2 className="formation_title">
                          <Link to={`/admin/formation/${formation.id}`}>{formation.theme}</Link>
                        </h2>

                        <Typography className="formation_description">{formation.description}</Typography>

                        {formation.Formateur ? (
                          <Typography className="formateur_name">
                            Formateur: {formation.Formateur.nom} {formation.Formateur.prenom}
                          </Typography>
                        ) : (
                          <Typography className="formateur_name">Formateur externe</Typography>
                        )}

                        <Link to={`/discussion/formation/${formation.id}`}>
                          <span className="lien">Accéder à la discussion</span>
                        </Link>

                        <button className="voir_plus_button">
                          <Link to={`/admin/formation/${formation.id}`}>?</Link>
                        </button>

                        <button onClick={() => setEditingFormation(formation)}>
                          Edit
                        </button>
                        
                        {editingFormation && editingFormation.id === formation.id && (
                          <EditFormation
                            formationId={formation.id}
                            theme={formation.theme}
                            description={formation.description}
                          />
                        )} 
                        
                      </div>
                    ))
                  )
                ) : null}

                <Typography>
                  <h2>Les formations de l'entreprise</h2>
                </Typography>
                
              </>
            )}
          <div className="training_container">
            
            {Formation.length !== 0 ? (

              recherche === ''||recherche === null ?(

              Formation.map((formation) => (
                
                <div key={formation.id} className="formation_item">
                
                <Link to={`/admin/formation/${formation.id}`}><h2 className="formation_title">{formation.theme}</h2></Link>
                  
                  <Typography className="formation_description">{formation.description}</Typography>
                  
                  {formation.Formateur ? (
                    
                    <Typography className="formateur_name">
                      Formateur: {formation.Formateur.nom} {formation.Formateur.prenom}
                    </Typography>
                  
                  ) 
                  : 
                  (
                    <Typography className="formateur_name">Formateur externe</Typography>
                  )
                  }
                  
                  <Link to={`/discussion/formation/${formation.id}`}><span className="lien">Accéder à la discussion</span></Link>

                  <button className="voir_plus_button">
                    <Link to={`/admin/formation/${formation.id}`}>?</Link>
                  </button>
                
                 {userId === formation.Formateur.id &&
                  <button onClick={() => setEditingFormation(formation)}>
                    Edit
                  </button>
                  }
                  {editingFormation && editingFormation.id === formation.id && (
                    <EditFormation
                      formationId={formation.id}
                      theme={formation.theme}
                      description={formation.description}
                    />
                  )}
                </div>
              ))
              
              ):(

                Formation.filter((formation) => (
                  
                  formation.theme.toLowerCase().includes(recherche.toLowerCase()) ||
                  formation.description.toLowerCase().includes(recherche.toLowerCase()) ||
                  (formation.Formateur && formation.Formateur.nom && formation.Formateur.nom.toLowerCase().includes(recherche.toLowerCase()))||
                  (formation.Formateur && formation.Formateur.prenom && formation.Formateur.prenom.toLowerCase().includes(recherche.toLowerCase()))
                
                )).map((formation) => (

                  <div key={formation.id} className="formation_item">
                    
                    <h2 className="formation_title"><Link to={`/admin/formation/${formation.id}`}>{formation.theme}</Link></h2>
                    
                    <Typography className="formation_description">{formation.description}</Typography>
                    
                    {formation.Formateur ? (
                      
                      <Typography className="formateur_name">
                        Formateur: {formation.Formateur.nom} {formation.Formateur.prenom}
                      </Typography>
                    
                    ) 
                    : 
                    (
                      <Typography className="formateur_name">Formateur externe</Typography>
                    )}
                  
                    <Link to={`/discussion/formation/${formation.id}`}><span className="lien">Accéder à la discussion</span></Link>
                    
                    <button className="voir_plus_button">
                      <Link to={`/admin/formation/${formation.id}`}>?</Link>
                    </button>

                    {userId === formation.Formateur.id &&
                      <button onClick={() => setEditingFormation(formation)}>
                        Edit
                      </button>
                      }
                      {editingFormation && editingFormation.id === formation.id && (
                        <EditFormation
                          formationId={formation.id}
                          theme={formation.theme}
                          description={formation.description}
                        />
                      )} 
                  
                  </div>
              )))

              ) 
              : 
              (
                <h3>Aucune formation pour le moment</h3>
              )}
          </div>
          </>

        )
}

export default Formations