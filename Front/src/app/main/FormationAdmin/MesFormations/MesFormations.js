import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography} from '@mui/material'
import '../demandeDeFormation/demandeFormation.css'


function MesFormations (){
    const[mesFormations, setMesFormations] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const idPersonne = user.id;
    console.log(idPersonne);
    const [recherche,setRecherche] = useState(null);


    const fetchFormation = () =>{
        axios.get(`http://localhost:4000/api/formations/formations/${idPersonne}`)
        .then((res)=>{
            setMesFormations(res.data)
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const DeleteFormation = async (id) => {
      const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?");
      if (isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:4000/api/demande_formation/formation/${id}`);
        if (response.status === 204) {
          fetchFormation()
        } else {
          console.error('Erreur lors de la suppression de la formation', error);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de la formation :', error);
      }
    }};   


    useEffect(()=>{
        fetchFormation()
    },[])

    return (
        <>
        <div className='header'>
            <h1>Vos Formations</h1>
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
          
          <div className="training_container">
            
            {mesFormations.length !== 0 ? (

              recherche === ''||recherche === null ?(

                mesFormations.map((formation) => (
                
                <div key={formation.id} className="formation_item">
                
                <Link to={`/admin/formation/${formation.id}`}><h2 className="formation_title">{formation.theme}</h2></Link>
                  
                  <Typography className="formation_description">{formation.description}</Typography>
                  
                  <Link to={`/discussion/formation/${formation.id}`}><span className="lien">Accéder à la discussion</span></Link>
                  
                  <button onClick={() => { DeleteFormation(formation.id) }}>Supprimer</button>

                  <button className="voir_plus_button">
                    <Link to={`/admin/formation/${formation.id}`}>?</Link>
                  </button>
                
                </div>
              ))
              
              ):(

                mesFormations.filter((formation) => (
                  
                  formation.theme.toLowerCase().includes(recherche.toLowerCase()) ||
                  formation.description.toLowerCase().includes(recherche.toLowerCase()) ||
                  (formation.Formateur && formation.Formateur.nom && formation.Formateur.nom.toLowerCase().includes(recherche.toLowerCase()))||
                  (formation.Formateur && formation.Formateur.prenom && formation.Formateur.prenom.toLowerCase().includes(recherche.toLowerCase()))
                
                )).map((formation) => (

                  <div key={formation.id} className="formation_item">
                    
                    <h2 className="formation_title"><Link to={`/admin/formation/${formation.id}`}>{formation.theme}</Link></h2>
                    
                    <Typography className="formation_description">{formation.description}</Typography>
                   
                    <Link to={`/discussion/formation/${formation.id}`}><span className="lien">Accéder à la discussion</span></Link>
                    
                    <button onClick={() => { DeleteFormation(formation.id) }}>Supprimer</button>

                    <button className="voir_plus_button">
                      <Link to={`/admin/formation/${formation.id}`}>?</Link>
                    </button>
                  
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

export default MesFormations
