import React, { useState } from 'react'
import { useEffect } from 'react'
import './demandeFormation.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Formations = () => {

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
            <h2 className="formation_title">{formation.theme}</h2>
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