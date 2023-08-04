import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import './listCollab.css'
import { Link } from "react-router-dom";
import logo from '../../../../image/sahaza.svg';
import {FaPlus,FaListUl} from 'react-icons/fa';
import {MdWorkspacesFilled,MdOutlineBusiness} from 'react-icons/md'



const ListeCollab = () => {

  const[recherche,setRecherche]=useState('null');
  const[recherchenom,setRechercheNom]=useState('null');
  const[rechercheprenom,setRecherchePrenom]=useState('null');
  const[recherchedatenaissance,setRechercheDatedeNaissance]=useState('null');
  const[recherchematricule,setRechercheMatricule]=useState('null');
  const[rechercheadresse,setRechercheAdresse]=useState('null');
  const[rechercheposte,setRecherchePoste]=useState('null');
  const[recherchedepartement,setRechercheDepartement]=useState('null');
  const[recherchetelephone,setRechercheTelephone]=useState('null');
  

  const [Collabs, setCollabs] = useState([]);
  if(recherche===''){
    setRecherche('null')
  }
  if(recherchenom===''){
    setRechercheNom('null')
  }
  if(rechercheprenom===''){
    setRecherchePrenom('null')
  }
  if(recherchedatenaissance===''){
    setRechercheDatedeNaissance('null')
  }
  if(recherchematricule===''){
    setRechercheMatricule('null')
  }
  if(rechercheadresse===''){
    setRechercheAdresse('null')
  }
  if(rechercheposte===''){
    setRecherchePoste('null')
  }
  if(recherchedepartement===''){
    setRechercheDepartement('null')
  }
  if(recherchetelephone===''){
    setRechercheTelephone('null')
  }

    useEffect(()=> {
      axios.get('http://localhost:4000/api/collaborateur/all_collaborateurs')
      .then(res => setCollabs(res.data))
      .catch(err => console.log(err));
    },[])  

  return (
    <div className="bodyliste">
     
      
      <div className="main">
      <div className="sidebar">
      <img className="logo" src={logo} alt='logo sahaza'/>
      <input type='text' id='recherche'className="add-input" placeholder="rechercher" onChange={(e)=>setRecherche(e.target.value)}/>
      <button className="ajout"><Link to='/admin/add'><FaPlus/> Ajouter</Link></button>
      <button className="ajout2"><Link to='/admin/listeCollab'><FaListUl/> Collaborateurs</Link></button>
      <button className="ajout2"><Link to='/admin/postesDepartement'><MdWorkspacesFilled/> Postes</Link></button>
      <button className="ajout2"><Link to='/admin/departements'><MdOutlineBusiness/> Departements</Link></button>
     
      </div>

     <div className="tableau">
      <h1>Liste des Collaborateurs</h1>
    <div  className="listeCollabo">
        {Collabs.filter(collab=>collab.nom.includes(recherche)).map(Collab=>(
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
        ))}


      <table className="listeCollabo">
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
        <tr>
            <td></td>
            <td><input type='text' id='filtre'className="add-input" placeholder="matricule" onChange={(e)=>setRechercheMatricule(e.target.value)}/></td>
            <td><input type='text'id='filtre'className="add-input" placeholder="nom" onChange={(e)=>setRechercheNom(e.target.value)}/></td>
            <td><input type='text'id='filtre'className="add-input" placeholder="prenom" onChange={(e)=>setRecherchePrenom(e.target.value)}/></td>
            <td><input type='text'id='filtre'className="add-input" placeholder="adresse" onChange={(e)=>setRechercheAdresse(e.target.value)}/></td>
            <td><input type='text' id='filtre'className="add-input" placeholder="telephone" onChange={(e)=>setRechercheTelephone(e.target.value)}/></td>
            <td><input type='text'id='filtre'className="add-input" placeholder="date de naissance" onChange={(e)=>setRechercheDatedeNaissance(e.target.value)}/></td>
            <td><input type='text'id='filtre'className="add-input" placeholder="poste" onChange={(e)=>setRecherchePoste(e.target.value)}/></td>
            <td><input type='text'id='filtre'className="add-input" placeholder="departement" onChange={(e)=>setRechercheDepartement(e.target.value)}/></td>
        </tr>

        {Collabs.filter(collab=>collab.matricule.includes(recherchematricule)).map(Collab=>(
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
        ))}

        {Collabs.filter(collab=>collab.nom.includes(recherchenom)).map(Collab=>(
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
        ))}

        {Collabs.filter(collab=>collab.prenom.includes(rechercheprenom)).map(Collab=>(
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
        ))}

        {Collabs.filter(collab=>collab.lot.includes(rechercheadresse)).map(Collab=>(
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
        ))}

        {Collabs.filter(collab=>collab.lot.includes(rechercheadresse)).map(Collab=>(
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
        ))}

        {Collabs.filter(collab=>collab.tel.includes(recherchetelephone)).map(Collab=>(
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
        ))}

        {Collabs.filter(collab=>collab.dateNaissance.includes(recherchedatenaissance)).map(Collab=>(
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
        ))}

        {Collabs.filter(collab=>collab.titrePoste.includes(rechercheposte)).map(Collab=>(
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
        ))}

        {Collabs.filter(collab=>collab.departement.includes(recherchedepartement)).map(Collab=>(
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
        ))}

        {Collabs.map(Collab =>
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
        )}
        </tbody>    
        </table>
        </div>
        </div>
    </div>
    </div>
  )
}

export default ListeCollab