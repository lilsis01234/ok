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

  const DeleteFormation = async (id) => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette demande ?");
    if (isConfirmed) {
    try {
      const response = await axios.delete(`http://localhost:4000/api/demande_formation/formation/${id}`);
      if (response.status === 204) {
        // Suppression réussie, mise à jour de la liste des événements
        const updatedEvents = events.filter(event => event.id !== id);
        setEvents(updatedEvents);
      } else {
        console.error('Erreur lors de la suppression de la séance');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la séance :', error);
    }
  }};    


  useEffect(() => {
    fetchFormation();
    fetchFormationAdmin();
  },[])


  const [recherche,setRecherche] = useState(null);
  
  return (
    <>
      <div className='header'>
        <Typography variant="h1" className="text-3xl font-bold text-gray-800">
          Explorez nos Formations
        </Typography>
        <Typography variant="h2" className="text-lg text-gray-600">
          <Link to='/mesFormations' className="text-blue-500 hover:underline">Mes Formations</Link>
        </Typography>
        <div className="search_form mt-4">
          <input
            type='text'
            placeholder='Rechercher ici...'
            onChange={(e) => {
              setRecherche(e.target.value);
            }}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
  
      {role === "SuperAdministrateur" && (
        <>
          <Typography variant="h2" className="text-lg mt-12 mb-12 ml-12 text-gray-1000">
            Les formations approuvées
          </Typography>
  
          {FormationAdmin.length !== 0 ? (
            recherche === '' || recherche === null ? (
              FormationAdmin.map((formation) => (
                <div key={formation.id} className="formation_item mt-4 bg-white p-4 rounded-md shadow-md">
                  <Link to={`/admin/formation/${formation.id}`}>
                    <Typography variant="h4" className="text-xl font-semibold text-blue-500 hover:underline">
                      {formation.theme}
                    </Typography>
                  </Link>
  
                  <Typography className="formation_description mt-2 text-gray-700">
                    {formation.description}
                  </Typography>
  
                  {formation.Formateur || formation.formateurExt ? (
                    <Typography className="formateur_name mt-2 text-gray-700">
                      Formateur: {formation.Formateur ? `${formation.Formateur.nom} ${formation.Formateur.prenom}` : ''} {formation.Formateur && formation.formateurExt ? '|| ' : ''} {formation.formateurExt}
                    </Typography>
                  ) : (
                    <button onClick={() => { Click() }} className="bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none">
                      Ajouter un formateur
                    </button>
                  )}
  
                  {showButtons &&
                    <div className="popup mt-2">
                      <div className="popupContent p-4 bg-white rounded-md shadow-md">
                        <input type='text' placeholder='Nom du formateur' value={formExt} onChange={(e) => setFormExt(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none" />
                        <button type='submit' onClick={(e) => handleFormSubmit(e, formation.id)} className="bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none">
                          Valider
                        </button>
                      </div>
                    </div>
                  }
  
                  <Link to={`/discussion/formation/${formation.id}`} className="text-blue-500 mt-2 hover:underline">
                    Accéder à la discussion
                  </Link>
  
                  <button className="voir_plus_button mt-2">
                    <Link to={`/admin/formation/${formation.id}`} className="text-blue-500">?</Link>
                  </button>
  
                  <button onClick={() => setEditingFormation(formation)} className="bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none">
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
                <div key={formation.id} className="formation_item mt-4 bg-white p-4 rounded-md shadow-md">
                  <Typography variant="h4" className="text-xl font-semibold text-blue-500 hover:underline">
                    <Link to={`/admin/formation/${formation.id}`}>{formation.theme}</Link>
                  </Typography>
  
                  <Typography className="formation_description mt-2 text-gray-700">
                    {formation.description}
                  </Typography>
  
                  {formation.Formateur ? (
                    <Typography className="formateur_name mt-2 text-gray-700">
                      Formateur: {formation.Formateur.nom} {formation.Formateur.prenom}
                    </Typography>
                  ) : (
                    <Typography className="formateur_name mt-2 text-gray-700">Formateur externe</Typography>
                  )}
  
                  <Link to={`/discussion/formation/${formation.id}`} className="text-blue-500 mt-2 hover:underline">
                    Accéder à la discussion
                  </Link>
  
                  <button className="voir_plus_button mt-2">
                    <Link to={`/admin/formation/${formation.id}`} className="text-blue-500">?</Link>
                  </button>
  
                  <button onClick={() => setEditingFormation(formation)} className="bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none">
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
  
          <Typography variant="h2" className="text-lg mt-10 mb-12 ml-12 text-gray-800">
            Les formations de l'entreprise
          </Typography>
        </>
      )}
  
      <div className="training_container">
        {Formation.length !== 0 ? (
          recherche === '' || recherche === null ? (
            Formation.map((formation) => (
              <div key={formation.id} className="formation_item mt-4 bg-white p-4 rounded-md shadow-md">
                <Link to={`/admin/formation/${formation.id}`}>
                  <Typography variant="h4" className="text-xl font-semibold text-blue-500 hover:underline">
                    {formation.theme}
                  </Typography>
                </Link>
  
                <Typography className="formation_description mt-2 text-gray-700">
                  {formation.description}
                </Typography>
  
                {formation.Formateur ? (
                  <Typography className="formateur_name mt-2 text-gray-700">
                    Formateur: {formation.Formateur.nom} {formation.Formateur.prenom}
                  </Typography>
                ) : (
                  <Typography className="formateur_name mt-2 text-gray-700">Formateur externe</Typography>
                )}
  
                <Link to={`/discussion/formation/${formation.id}`} className="text-blue-500 mt-2 hover:underline">
                  Accéder à la discussion
                </Link>
  
                <button className="voir_plus_button mt-2">
                  <Link to={`/admin/formation/${formation.id}`} className="text-blue-500">?</Link>
                </button>
  
                {userId === formation.Formateur.id && (
                  <>
                  <br></br><br></br>
                  <button onClick={() => setEditingFormation(formation)} className="bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none">
                    Edit
                  </button>
                  </>
                )}

                {userId === formation.Formateur.id && (
                  <>
                  <br></br><button onClick={() => { DeleteFormation(formation.id) }}>Supprimer la demande</button>
                  </>
                )}
  
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
            Formation.filter((formation) => (
              formation.theme.toLowerCase().includes(recherche.toLowerCase()) ||
              formation.description.toLowerCase().includes(recherche.toLowerCase()) ||
              (formation.Formateur && formation.Formateur.nom && formation.Formateur.nom.toLowerCase().includes(recherche.toLowerCase())) ||
              (formation.Formateur && formation.Formateur.prenom && formation.Formateur.prenom.toLowerCase().includes(recherche.toLowerCase()))
            )).map((formation) => (
              <div key={formation.id} className="formation_item mt-4 bg-white p-4 rounded-md shadow-md">
                <Typography variant="h4" className="text-xl font-semibold text-blue-500 hover:underline">
                  <Link to={`/admin/formation/${formation.id}`}>{formation.theme}</Link>
                </Typography>
  
                <Typography className="formation_description mt-2 text-gray-700">
                  {formation.description}
                </Typography>
  
                {formation.Formateur ? (
                  <Typography className="formateur_name mt-2 text-gray-700">
                    Formateur: {formation.Formateur.nom} {formation.Formateur.prenom}
                  </Typography>
                ) : (
                  <Typography className="formateur_name mt-2 text-gray-700">Formateur externe</Typography>
                )}
  
                <Link to={`/discussion/formation/${formation.id}`} className="text-blue-500 mt-2 hover:underline">
                  Accéder à la discussion
                </Link>
  
                <button className="voir_plus_button mt-2">
                  <Link to={`/admin/formation/${formation.id}`} className="text-blue-500">?</Link>
                </button>
  
                {userId === formation.Formateur.id && (
                  <button onClick={() => setEditingFormation(formation)} className="bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none">
                    Edit
                  </button>
                )}

                {userId === formation.Formateur.id && (
                  <>
                  <br></br><button onClick={() => { DeleteFormation(formation.id) }}>Supprimer la demande</button>
                  </>
                )}
  
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
        ) : (
          <Typography variant="h3" className="mt-4 text-gray-800">Aucune formation pour le moment</Typography>
        )}
      </div>
    </>
  );
  
  
}

export default Formations