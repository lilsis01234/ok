import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../../../image/sahaza.svg';
import {FaPlus,FaListUl} from 'react-icons/fa';
import {MdWorkspacesFilled,MdOutlineBusiness} from 'react-icons/md'

const Postes = () => {
    
    const[listePoste,setListePoste]= useState([])
    const[recherche,setRecherche]=useState('');
     useEffect(()=>{
        axios.get('http://localhost:4000/api/poste/all_postes')
        .then((res) => {setListePoste(res.data)
                     console.log(listePoste)})
        .catch(err => console.log(err));
       }
       )
      return (
        <div className='bodyliste'>
         <div className='poste'>
          <div className="main">

          <div className="sidebar">
          <img className="logo" src={logo} alt='logo sahaza'/>
          <input type='text' id='recherche'className="add-input" placeholder="rechercher" onChange={(e)=>setRecherche(e.target.value)}/>
          <button className="ajout"><Link to='/admin/add'><FaPlus/> Nouveau</Link></button>
          <button className="ajout2"><Link to='/admin/listeCollab'><FaListUl/> Collaborateurs</Link></button>
          <button className="ajout2"><Link to='/admin/postesDepartement'><MdWorkspacesFilled/> Postes</Link></button>
          <button className="ajout2"><Link to='/admin/departements'><MdOutlineBusiness/> Departements</Link></button>
          </div>

            <div className="tableau">
            <h1>Les postes</h1>
              <div className='block2'>
                {recherche==='' ? (listePoste.map(poste => (
                  <div className='com' key={poste.id}>
                    <div className='background-image'></div>
                    <h4>{poste.titrePoste}</h4>
                    <Link to={`/admin/postes/collab/${poste.id}`}>
                      <h5>Voir qui ont ce poste</h5>
                    </Link>
                  </div>
                ))):((listePoste.filter(poste=>poste.titrePoste.toLowerCase().includes(recherche.toLowerCase())).map(poste => (
                  <div className='com' key={poste.id}>
                    <div className='background-image'></div>
                    <h4>{poste.titrePoste}</h4>
                    <Link to={`/admin/postes/collab/${poste.id}`}>
                      <h5>Voir qui ont ce poste</h5>
                    </Link>
                  </div>
                )))

                )}
              </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Postes