import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import ListeFormationAdmin from '../listeFormationsAdmin/listeFormationsAdmin'
import './demandeFormation.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Formations = () => {
  // const navigate = useNavigate();
  // const [listevisible,setVisible] = useState(false);
  
  // useEffect(() => {
  //   // const token = Cookies.get('jwt');
  //   const token = localStorage.getItem('jwt');
  //   if (!token){
  //       navigate('/');
  //   }

  //   const role = localStorage.getItem('role'); 
  //   if (!(role === "Administrateur")){
  //       navigate('/home');
  //   }
  //   }, [navigate])
    

const Formation = ()=>{
  // const idrole = localStorage.getItem('idrole');
  // console.log(idrole);

  const[Formation,setFormations] = useState([]);

  const fetchFormation = () => {
    axios.get('http://localhost:4001/api/formations/all_formations')
      .then(res => {setFormations(res.data)
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchFormation();
  })


  const [recherche,setRecherche] = useState(null);
  return (
    <>
    <center>
    <div className='content'>
      <div className='collabListes'>
        <h1 className="collabListes_title font-bold">Liste des formations</h1>
          <div className="collabListes_Item">
            <div className="search_form">
            <input type='text' placeholder='rechercher ici' onChange={(e) => {
              setRecherche(e.target.value);
            }}
          onKeyUp={(e) => {
               if (e.key === "Enter") {
                e.target.focus(); // Maintenir le focus sur l'input après avoir appuyé sur "Enter"
              }}}/>
            </div>
          </div>
      </div>
    </div>
    </center>

    <div className="training_container">
      {Formation.length !== 0 ? (

        recherche === ''||recherche === null ?(

        Formation.map((formation) => (
          <div key={formation.id} className="formation_item">
            <h2 className="formation_title">{formation.theme}</h2>
            <p className="formation_description">{formation.description}</p>
            {formation.Formateur ? (
              <p className="formateur_name">
                Formateur: {formation.Formateur.nom} {formation.Formateur.prenom}
              </p>
            ) : (
              <p className="formateur_name">Formateur inconnu</p>
            )}
            <button className="voir_plus_button">
              <Link to={`/admin/formation/${formation.id}`}>?</Link>
            </button>
          </div>
        ))
        
        ):(

          Formation.filter(Formation=>Formation.theme.includes(recherche)||Formation.description.includes(recherche)).map((formation) => (
            <div key={formation.id} className="formation_item">
              <h2 className="formation_title">{formation.theme}</h2>
              <p className="formation_description">{formation.description}</p>
              {formation.Formateur ? (
                <p className="formateur_name">
                  Formateur: {formation.Formateur.nom} {formation.Formateur.prenom}
                </p>
              ) : (
                <p className="formateur_name">Formateur inconnu</p>
              )}
              <button className="voir_plus_button">
                <Link to={`/admin/formation/${formation.id}`}>?</Link>
              </button>
            </div>
        )))

        ) : (
        <h3>Aucune formation pour le moment</h3>
        )}
    </div>
    </>
  )
}

  return (
            <div>
              <div className="collabListes">
                {/* <button className="visible" onClick={() => setVisible(!listevisible)}>
                <h1>{listevisible ? 'Voir les demandes de formations' : 'Voir les formations disponibles'}</h1>
                </button> */}
               <Formation />
              </div>
            </div>
  )
}

export default Formations