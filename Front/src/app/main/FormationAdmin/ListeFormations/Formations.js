import React, { useState } from 'react'
import { useEffect } from 'react'
import '../demandeDeFormation/demandeFormation.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import EditFormation from '../../FormationUser/Formateur/EditFormation/EditFormation';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import {Paper, Typography} from "@mui/material";
import Avatar from '@mui/material/Avatar';


const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '& > .container': {
      maxWidth: '100%',
    },
  },
}));


const Formations = () => {

  const[Formation,setFormations] = useState([]);
  const [FormationAdmin, setFormationAdmin] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user.RoleHierarchique.roleHierarchique;
  const userId = user.id;
  const [editingFormation, setEditingFormation] = useState(null);

  const fetchFormation = () => {
    axios.get('http://localhost:4000/api/formations/all_formations')
      .then(res => {
        console.log(res.data)
        setFormations(res.data)
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
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?");
    if (isConfirmed) {
    try {
      const response = await axios.delete(`http://localhost:4000/api/demande_formation/formation/${id}`);
      if (response.status === 204) {
        // Suppression réussie, mise à jour de la liste des événements
        fetchFormation()
      } else {
        console.error('Erreur lors de la suppression de la formation', error);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la formation :', error);
    }
  }};    


  useEffect(() => {
    fetchFormation();
    fetchFormationAdmin();
  },[])


  const [recherche,setRecherche] = useState(null);
  
  return (
    <>
    <Paper elevation={3} style={{ padding: 64, width: '100%' }}>
    <Root
      header = {
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
      }
      content={
        <div  className='text-center w-full'>
          {role === "SuperAdministrateur" && (
            <>
      
              {FormationAdmin.length !== 0 ? (
                recherche === '' || recherche === null ? (
                  <div className='lg:grid lg:grid-cols-3  md:block sm:block'>
                  {FormationAdmin.map((formation) => (
                    <div key={formation.id} className="mt-20 bg-white ml-20 mr-20 py-32 text-center rounded-xl mb-20 shadow-md">

                      <div  className='items-center'>
                          {formation.Formateur.image ? (
                              <Avatar
                                  key={formation.Formateur.id}
                                  className="w-84 h-84 m-4"
                                  alt={formation.Formateur.nom}
                                  src={`http://localhost:4000/${formation.Formateur.image}`}
                              />
                          ) : (
                              <Avatar
                                  key={formation.Formateur.id}
                                  className="w-84 h-84 m-4"
                                  alt={formation.Formateur.nom}
                              >
                                  {formation.Formateur.nom ? formation.Formateur.nom[0] : '?'}
                              </Avatar>
                          )}
                      </div>

                      {formation.Formateur && (
                        <Typography className="mt-2 text-gray-700">
                          {formation.Formateur && `${formation.Formateur.nom} ${formation.Formateur.prenom}`} 
                        </Typography>
                      )}
                      {formation.formateurExterne && (
                        <Typography className="mt-2 text-gray-700">
                        {formation.formateurExterne} 
                        </Typography>
                      )}

                      <Link to={`/admin/formation/${formation.id}`}>
                        <Typography variant="h4" className="text-xl font-semibold text-blue-500 hover:underline">
                          {formation.theme}
                        </Typography>
                      </Link>
      
                      <Typography className="mt-2 text-gray-700">
                        {formation.description}
                      </Typography>
      
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
                  ))}
                  </div>
                ) : (
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


                    <div key={formation.id} className="mt-20 bg-white ml-20 mr-20 py-32 text-center rounded-xl mb-20 shadow-md">
                      <Typography variant="h4" className="text-xl font-semibold text-blue-500 hover:underline">
                        <Link to={`/admin/formation/${formation.id}`}>{formation.theme}</Link>
                      </Typography>
      
                      <Typography className="mt-2 text-gray-700">
                        {formation.description}
                      </Typography>
      
                      {formation.Formateur ? (
                        <Typography className="mt-2 text-gray-700">
                          Ajouté par: {formation.Formateur.nom} {formation.Formateur.prenom}
                        </Typography>
                      ) : (
                        <Typography className="mt-2 text-gray-700">Formateur externe</Typography>
                      )}
      
                      <Link to={`/discussion/formation/${formation.id}`} className="text-blue-500 mt-2 hover:underline">
                        Accéder à la discussion
                      </Link>
      
                      <button className="mt-2">
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

            </>
          )}
          <div className="lg:grid lg:grid-cols-3  md:block sm:block">
            {Formation.length !== 0 ? (
              recherche === '' || recherche === null ? (
                Formation.map((formation) => (
                  <div key={formation.id} className="mt-20 bg-white ml-20 mr-20 py-32 text-center rounded-xl mb-20 shadow-md">
                     
                     <div  className='flex items-center mx-auto justify-center'>
                          {formation.Formateur.image ? (
                              <Avatar
                                  key={formation.Formateur.id}
                                  className="w-96 h-96"
                                  alt={formation.Formateur.nom}
                                  src={`http://localhost:4000/${formation.Formateur.image}`}
                              />
                          ) : (
                              <Avatar
                                  key={formation.Formateur.id}
                                  className="w-96 h-96"
                                  alt={formation.Formateur.nom}
                              >
                                  {formation.Formateur.nom ? formation.Formateur.nom[0] : '?'}
                              </Avatar>
                          )}
                      </div>

                      {formation.Formateur && (
                        <Typography className="mt-2 text-gray-700">
                          Ajouté par: {formation.Formateur && `${formation.Formateur.nom} ${formation.Formateur.prenom}`} 
                        </Typography>
                      )}
                      {formation.formateurExterne && (
                        <Typography className="mt-2 text-gray-700">
                          Consultant externe: {formation.formateurExterne} 
                        </Typography>
                      )}

                    <Link to={`/admin/formation/${formation.id}`}>
                      <Typography variant="h4" className="text-xl font-semibold text-blue-900 hover:underline uppercase">
                        {formation.theme}
                      </Typography>
                    </Link>
      
                    <Typography className="mt-2 text-gray-700 ">
                      {formation.description}
                    </Typography>

                    <div className="grid grid-cols-4 mt-32 border-t-2 pt-32">

                      <Link to={`/discussion/formation/${formation.id}`} className="text-blue-500 mt-2 hover:underline">
                        Message
                      </Link>
        
        
                      {userId === formation.Formateur.id && (
                        <>
                        <button onClick={() => setEditingFormation(formation)} className="bg-blue-500 text-white rounded-md mt-2 focus:outline-none">
                          Modifier
                        </button>
                        </>
                      )}

                      {userId === formation.Formateur.id && (
                        <>
                        <button onClick={() => { DeleteFormation(formation.id) }}>Supprimer</button>
                        </>
                      )}

                    </div>

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
                  <div key={formation.id} className="mt-20 bg-white ml-20 mr-20 py-32 text-center rounded-xl mb-20 shadow-md">
                    <Typography variant="h4" className="text-xl font-semibold text-blue-800 hover:underline">
                      <Link to={`/admin/formation/${formation.id}`}>{formation.theme}</Link>
                    </Typography>
      
                    <Typography className=" mt-2 text-gray-700">
                      {formation.description}
                    </Typography>
      
                    {formation.Formateur ? (
                      <Typography className=" mt-2 text-gray-700">
                        Ajouté par: {formation.Formateur.nom} {formation.Formateur.prenom}
                      </Typography>
                    ) : (
                      <Typography className=" mt-2 text-gray-700">Formateur externe</Typography>
                    )}
      
                    <Link to={`/discussion/formation/${formation.id}`} className="text-yellow-800 mt-2 hover:underline">
                      Accéder à la discussion
                    </Link>
      
                    <button className="mt-2">
                      <Link to={`/admin/formation/${formation.id}`} className="text-blue-500">?</Link>
                    </button>
      
                    {userId === formation.Formateur.id && (
                      <button onClick={() => setEditingFormation(formation)} className="bg-blue-500 text-white p-2 mt-2">
                        Edit
                      </button>
                    )}

                    {userId === formation.Formateur.id && (
                      <>
                      <br></br><button onClick={() => { DeleteFormation(formation.id) }}>Supprimer la formation</button>
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
        </div>
      }
    />
    </Paper>
    </>
  );
  
  
}

export default Formations