import React, { useState } from 'react'
import { useEffect } from 'react'
import './demandeFormation.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Formations = () => {

  const[Formation,setFormations] = useState([]);

  const fetchFormation = () => {
    axios.get('http://localhost:4000/api/formations/all_formations')
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
    <div className='header'>
      <h1>Explorez nos Formations</h1>
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
      {Formation.length !== 0 ? (

        recherche === ''||recherche === null ?(

        Formation.map((formation) => (
          <div key={formation.id} className="formation_item">
           <Link to={`/admin/formation/${formation.id}`}><h2 className="formation_title">{formation.theme}</h2></Link>
            <p className="formation_description">{formation.description}</p>
            {formation.Formateur ? (
              <p className="formateur_name">
                Formateur: {formation.Formateur.nom} {formation.Formateur.prenom}
              </p>
            ) : (
              <p className="formateur_name">Formateur externe</p>
            )}
            <Link to={`/discussion/formation/${formation.id}`}><span className="lien">Accéder à la discussion</span></Link>

            <button className="voir_plus_button">
              <Link to={`/admin/formation/${formation.id}`}>?</Link>
            </button>
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
              <p className="formation_description">{formation.description}</p>
              {formation.Formateur ? (
                <p className="formateur_name">
                  Formateur: {formation.Formateur.nom} {formation.Formateur.prenom}
                </p>
              ) : (
                <p className="formateur_name">Formateur externe</p>
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

export default Formations