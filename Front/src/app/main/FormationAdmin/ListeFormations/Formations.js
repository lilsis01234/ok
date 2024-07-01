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
  const [formations, setFormations] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.id;
  const [editingFormation, setEditingFormation] = useState(null);

  const fetchFormation = () => {
    axios.get('http://localhost:4000/api/formations/all_formations')
      .then(res => {
        setFormations(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchFormation();
  }, []);

  const deleteFormation = async (id) => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?");
    if (isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:4000/api/demande_formation/formation/${id}`);
        if (response.status === 204) {
          fetchFormation();
        } else {
          console.error('Erreur lors de la suppression de la formation', error);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de la formation :', error);
      }
    }
  };

  const [recherche, setRecherche] = useState('');

  return (
    <>
      <Paper elevation={3} style={{ padding: 64, width: '100%' }}>
        <Root
          header={
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
                  onChange={(e) => setRecherche(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          }
          content={
            <div className='text-center w-full'>
              <div className="lg:grid lg:grid-cols-3 md:block sm:block">
                {formations.length !== 0 ? (
                  (recherche === '' || recherche === null ? formations : formations.filter((formation) =>
                    formation.theme.toLowerCase().includes(recherche.toLowerCase()) ||
                    formation.description.toLowerCase().includes(recherche.toLowerCase()) ||
                    (formation.Formateur && formation.Formateur.nom && formation.Formateur.nom.toLowerCase().includes(recherche.toLowerCase())) ||
                    (formation.Formateur && formation.Formateur.prenom && formation.Formateur.prenom.toLowerCase().includes(recherche.toLowerCase()))
                  )).map((formation) => (
                    <div key={formation.id} className="mt-20 bg-white ml-20 mr-20 py-32 text-center rounded-xl mb-20 shadow-md">
                      <div className='flex items-center mx-auto justify-center'>
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
                          Flux
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
                            <button onClick={() => { deleteFormation(formation.id) }}>Supprimer</button>
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
                  <Typography variant="h5" className="mt-4 text-gray-800 text-center">Aucune formation pour le moment</Typography>
                )}
              </div>
            </div>
          }
        />
      </Paper>
    </>
  );
};

export default Formations;
