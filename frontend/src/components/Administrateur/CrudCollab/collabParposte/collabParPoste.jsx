import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import logo from '../../../../image/sahaza.svg';
import {FaPlus,FaListUl} from 'react-icons/fa';
import {MdWorkspacesFilled,MdOutlineBusiness} from 'react-icons/md'

const CollabParPoste = () => {

  
   const { idposte } = useParams();
   const[recherche,setRecherche]=useState('');
   const [Collabs, setCollabs] = useState([]);
  
    useEffect(() => {
    console.log('Fetching data for poste:', idposte); // Make sure poste is defined here
    axios.get(`http://localhost:4000/api/collaborateur/all_collaborateurs/${idposte}`)
      .then((res) => {
        console.log('Response:', res);
        setCollabs(res.data);
      })
      .catch((err) => console.log('Error:', err));
    }, [idposte]);
    const postenorepeat = Array.from(new Set(Collabs.map(collab=>collab.titrePoste)))
  
    return (
      <div className="bodyliste2">
      
      <h1>{postenorepeat}</h1>
      
      <div className="main">
      <div className="sidebar">
      <img className="logo" src={logo} alt='logo sahaza'/>
      <input type='text' id='recherche'className="add-input" placeholder="rechercher" onChange={(e)=>setRecherche(e.target.value)}/>
      <button className="ajout"><Link to='/admin/add'><FaPlus/> Ajouter</Link></button>
      <button className="ajout2"><Link to='/admin/listeCollab'><FaListUl/> Collaborateurs</Link></button>
      <button className="ajout2"><Link to='/admin/postes'><MdWorkspacesFilled/> Postes</Link></button>
      <button className="ajout2"><Link to='/admin/departements'><MdOutlineBusiness/> Departements</Link></button>
     
      </div>

        <div className='tableau'>
        <div className='listeCollabo'>
          <table>
          <thead>
          <tr>
              <th>Photo</th>
              <th>Numéro matricule</th>
              <th>Nom</th>
              <th>Prenoms</th>
              <th>Adresse</th>
              <th>Téléphone</th>
              <th>Date de naissance</th>
              <th>Poste</th>
              <th>Departement</th>
              <th rowSpan={2}>Actions</th>
          </tr>
          </thead>
          <tbody>
           {recherche === '' ? (Collabs.map(Collab =>
            <tr key={Collab.id}>
              <td><img src={`http://localhost:4000/${Collab.image}`} alt={Collab.nom}/></td>
              <td>{Collab.matricule}</td>
              <td>{Collab.nom}</td>
              <td>{Collab.prenom}</td>
              <td>{Collab.lot}</td>
              <td>{Collab.tel}</td>
              <td>{Collab.dateNaissance}</td>
              <td>{Collab.titrePoste}</td>
              <td>{Collab.departement}</td>
              <td><button className="update"><Link to={`/admin/update/${Collab.id}`}>Modifier</Link></button></td>
              </tr>
            )):
             (Collabs.filter(collab=>collab.nom.toLowerCase().includes(recherche.toLowerCase())).map(Collab=>(
                <tr key={Collab.id}>
                <td><img src={`http://localhost:4000/${Collab.image}`} alt={Collab.nom}/></td>
                <td>{Collab.matricule}</td>
                <td>{Collab.nom}</td>
                <td>{Collab.prenom}</td>
                <td>{Collab.lot}</td>
                <td>{Collab.tel}</td>
                <td>{Collab.dateNaissance}</td>
                <td>{Collab.titrePoste}</td>
                <td>{Collab.departement}</td>
                <td><button className="update"><Link to={`/admin/update/${Collab.id}`}>Modifier</Link></button></td>
              </tr>
              )))}

          </tbody>    
          </table>
          </div>
          </div>
          </div>
      </div>
    )
}


export default CollabParPoste