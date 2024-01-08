import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Typography} from '@mui/material'
import { Link } from 'react-router-dom';


const  MesDemandes =()=>{
    const[mesDemandesFormations, setMesDemandesFormations] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const idPersonne = user.id;
    const [demandesPourMoi, setDemandePourMoi] = useState([]);

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

    const fetchDemandePourmoi = () =>{
      axios.get(`http://localhost:4000/api/demande_formation/demandesPourVous/${idPersonne}`)
        .then((res)=>{
            setDemandePourMoi(res.data)
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchDemande()
        fetchDemandePourmoi()
    },[])

    const DeleteDemande = async (id) => {
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
    };   
    } 

    return(
        <>  
        <div>
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
            {demandesPourMoi.length !== 0 && demandesPourMoi.map((demande)=>(
              <>
               
              </>
            ))}
        </div>
        </>
    )
  }
export default MesDemandes
