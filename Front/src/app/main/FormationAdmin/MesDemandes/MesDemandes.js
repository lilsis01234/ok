import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Typography} from '@mui/material'
import { Link } from 'react-router-dom';

const  MesDemandes = () => {

    const[mesDemandesFormations, setMesDemandesFormations] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const idPersonne = user.id;
    const [formationsPourMoi, setFormationsPourMoi] = useState([]);

    const fetchDemande = () =>{
        axios.get(`http://localhost:4000/api/demande_formation/all_demande/${idPersonne}`)
        .then((res)=>{
            setMesDemandesFormations(res.data)
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const fetchFormationPourmoi = () =>{
      axios.get(`http://localhost:4000/api/formations/formationsPourMoi/${idPersonne}`)
        .then((res)=>{
          setFormationsPourMoi(res.data)
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchDemande()
        fetchFormationPourmoi()
    },[])

    const DeleteDemande = async (id) => {
      const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette demande ?");
        if (isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:4000/api/demande_formation/demande_formation/${id}`);
                if (response.status === 204) {
                  // Suppression réussie, mise à jour de la liste des événements
                  fetchDemande()
                } else {
                  console.error('Erreur lors de la suppression');
                }
            } catch (error) {
              console.error('Erreur lors de la suppression:', error);
            }
        };   
    }  

    return(
        <>  
          <div>
            {mesDemandesFormations.length!==0 && <Typography className="mt-6 mb-4">Les demandes de formation</Typography> }
              {mesDemandesFormations.map((demande, index) => (
                
                <div key={index} className="training-request-item">
                  
                  <Typography className="theme">{demande.theme}</Typography>
                  <Typography className="description">{demande.description}</Typography>
                  <Typography>Destinataire : {demande.RoleHierarchique.roleHierarchique}</Typography>
                  
                  <Typography
                    className={`${
                        demande.approbation === true ? 'text-green-500' :
                        demande.approbation === null ? 'text-yellow-800' :
                        'text-red-500'
                    }`}
                  >
                    {demande.approbation === true ? 'APPROUVÉE ' :
                    demande.approbation === null ? 'PAS ENCORE APPROUVÉE ' :
                    'REFUSÉE'}
                  </Typography>

                  {demande.approbation === true &&
                  <>
                    <button>
                      <Link to={`/admin/formation/${demande.id}`}>Modules & séances</Link>
                    </button>
                  <br></br>
                  </>
                  }
                  <Link to={`/voirPlus/demande/${demande.id}`} className="description">Voir plus </Link>
                                
                  {demande.approbation === null &&
                    <>
                      <br></br><button onClick={() => { DeleteDemande(demande.id) }}>Annuler la demande</button>
                    </>
                  }

                  {demande.approbation === false &&
                    <>
                      <br></br><button onClick={() => { DeleteDemande(demande.id) }}>Supprimer la demande</button>
                    </>
                  }

                </div>

              ))}
          </div>

          <div>
              {formationsPourMoi.length !== 0 && formationsPourMoi.map((formation)=>(
                <>
                  
                </>
              ))}
          </div>
        </>
    )
  }
export default MesDemandes
