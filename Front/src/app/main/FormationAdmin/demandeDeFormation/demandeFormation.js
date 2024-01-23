import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './demandeFormation.css'
import { Link } from 'react-router-dom'
import { Typography} from '@mui/material'
import MesDemandes from '../MesDemandes/MesDemandes'
import Avatar from '@mui/material/Avatar';


const DemandeFormations = () => {
  const[DemandeFormations,setDemandes] = useState([])
  const[DemandeConsExt, setDemandeConsExt] = useState([])
  const[DemandeCoatch, setDemandeCoatch] = useState([])
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user.RoleHierarchique.roleHierarchique;
  const [showButtons, setShowButtons] = useState(false);
  const[formExt, setFormExt] = useState(null);

  const Approuver =(id)=>{
    axios.post(`http://localhost:4000/api/demande_formation/approuver/${id}`)
    .then(res=>{1
      console.log(res.data)
      window.location.reload();
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const Desapprouver=(id)=>{
    axios.post(`http://localhost:4000/api/demande_formation/desapprouver/${id}`)
    .then(res=>{
      console.log(res)
      window.location.reload();
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const fetchDemandes = ()=>{
    axios.get('http://localhost:4000/api/demande_formation/all')
    .then((res)=>
      { 
        setDemandes(res.data)
        // console.log(res.data)
      })
    .catch(err=>console.log(err))

    axios.get('http://localhost:4000/api/demande_formation/allWithoutForm')
    .then((res)=>
      { 
        setDemandeConsExt(res.data)
        console.log(res.data)
      })
    .catch(err=>console.log(err))

    axios.get('http://localhost:4000/api/demande_formation/alldemande/coatch')
    .then((res)=>
      { 
        setDemandeCoatch(res.data)
        // console.log(res.data)
      })
    .catch(err=>console.log(err))
  }

  const addFormateur = (id) => {
    axios
      .post(`http://localhost:4000/api/formations/addFormExt/${id}`, {
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

  useEffect(()=>{
    fetchDemandes();
  },[])
  
  return (
    <div className="bg-gray-100 p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">Demandes de formations</h1>
      <MesDemandes />

      {(role.toLowerCase() === 'superadministrateur' || role.toLowerCase() === 'rh') && (
        <>
          {DemandeFormations.length !== 0 && (
            <Typography className="mt-6 mb-4">Les demandes de formation</Typography>
          )}
          {DemandeFormations.map((demande, index) => (
            <div key={index} className="training-request-item flex items-center">

              {demande.Auteur.image ? (
                  <Avatar
                      key={demande.Auteur.id}
                      className="w-96 h-96 mr-10"
                      alt={demande.Auteur.nom}
                      src={`http://localhost:4000/${demande.Auteur.image}`}
                  />
              ) : (
                  <Avatar
                      key={demande.Auteur.id}
                      className="w-96 h-96 mr-10"
                      alt={demande.Auteur.nom}
                  >
                      {demande.Auteur.nom ? demande.Auteur.nom[0] : '?'}
                  </Avatar>
              )}

          <div>
            <Typography className="font-bold">
              {demande.Auteur.nom} {demande.Auteur.prenom}
            </Typography>
            <Typography className="text-gray-600">{demande.theme}</Typography>
            <Link to={`/voirPlus/demande/${demande.id}`} className="text-blue-500 underline mb-2 block">
              Voir plus
            </Link>
            <div className="flex">
              <button onClick={() => Approuver(demande.id)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                Approuver
              </button>
              <button onClick={() => Desapprouver(demande.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                Desapprouver
              </button>
            </div>
          </div>
          </div>

          ))}

          {DemandeConsExt.length !== 0 && (
            <Typography className="mt-6 mb-4">Les demandes approuvées sans consultant externe</Typography>
          )}

          {DemandeConsExt.length!==0 && DemandeConsExt.map((demande, index) => (
            <div key={index} className="training-request-item">
              {demande.Formateur.image ? (
                  <Avatar
                      key={demande.Formateur.id}
                      className="w-96 h-96 mr-10"
                      alt={demande.Formateur.nom}
                      src={`http://localhost:4000/${demande.Formateur.image}`}
                  />
              ) : (
                  <Avatar
                      key={demande.Formateur.id}
                      className="w-96 h-96 mr-10"
                      alt={demande.Formateur.nom}
                  >
                      {demande.Formateur.nom ? demande.Formateur.nom[0] : '?'}
                  </Avatar>
              )}
              <Typography className="font-bold">{demande.Formateur.nom} {demande.Formateur.prenom}</Typography>
              <Typography className="text-gray-600">{demande.theme}</Typography>
              <Link to={`/voirPlus/demande/${demande.id}`} className="text-blue-500 underline mb-2 block">
                Voir plus
              </Link>
              <button onClick={() => { Click() }} className="bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none">
                Ajouter un formateur
              </button>

              {showButtons &&
                <div className="popup mt-2">
                  <div className="popupContent p-4 bg-white rounded-md shadow-l">
                    <input type='text' placeholder='Nom du formateur' value={formExt} onChange={(e) => setFormExt(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none" />
                    <button type='submit' onClick={(e) => handleFormSubmit(e, demande.id)} className="bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none">
                      Valider
                    </button>
                  </div>
                </div>
              }
            </div>
          ))}
        </>
      )}

      {(role.toLowerCase() === 'coatch' || role.toLowerCase() === 'superadministrateur') && (
        <>
          <Typography className="mt-6 mb-4">Les demandes de formation pour le coatch</Typography>

          {DemandeCoatch.map((demande, index) => (
            <div key={index} className="training-request-item">
              <Typography className="font-bold">{demande.Auteur.nom} {demande.Auteur.prenom}</Typography>
              <Typography className="text-gray-600">{demande.theme}</Typography>
              <Link to={`/voirPlus/demande/${demande.id}`} className="text-blue-500 underline mb-2 block">
                Voir plus
              </Link>

              {role === 'Coatch' && (
                <>
                  <button onClick={() => Approuver(demande.id)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                    Approuver
                  </button>
                  <button onClick={() => Desapprouver(demande.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                    Desapprouver
                  </button>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
)
}

export default DemandeFormations