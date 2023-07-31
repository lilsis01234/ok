import React, { useEffect } from 'react'
import { useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const UpdateCollab = () => {
  const {id}= useParams();
  const navigate = useNavigate();
  const [nom,setNom]=useState('');
  const [photo,setPhoto]=useState(null);
  const [prenom,setPrenom]=useState('');
  const [lot,setLot]=useState('');
  const [quartier,setQuartier]=useState('');
  const [ville,setVille]=useState('');
  const [telephone,setTelephone]=useState('');
  const[matricule,setMatricule] = useState('');
  const[dateNaissance,setdateNaissance]=useState('');
  const[dateEmbauche,setdateEmbauche]=useState('');
  const[site,setSite]=useState('');
  const[poste,setPoste]=useState('');
  const[sexe,setSexe]=useState('');
  
  
  useEffect(()=>{
    axios.get('http://localhost:4000/api/collaborateur/'+id)
    .then(res => {
        console.log(res.data);
        setNom(res.data.collaborateur.nom)
        setPrenom(res.data.collaborateur.prenom)
    }).catch(err =>console.log(err));
   });

   
  const ValidateUpdate=(event)=>{
     event.preventDefault();
     const formData = new FormData();
     formData.append('image',photo);
     formData.append('lot',lot);
     formData.append('quartier',quartier);
     formData.append('ville',ville);
     formData.append('dateEmbauche',dateEmbauche);
     formData.append('site',site);
     formData.append('dateNaissance',dateNaissance);
     formData.append('poste',poste);
     formData.append('sexe',sexe);
     formData.append('prenom',prenom);
     formData.append('telephone',telephone);
     formData.append('matricule',matricule);
     console.log(formData);
 
     axios.put('http://localhost:4000/api/collaborateur/edit/'+id,formData,{headers: {
      'Content-Type': 'multipart/form-data',
    },})
    .then(res => {
        console.log(res);
        navigate('/admin/listeCollab');
        
    }).catch(err =>console.log(err));
   }
   
 
   return (
     <div className='block'>
         <h1>Modifier le collaborateur</h1>
         <form onSubmit={ValidateUpdate} className='add-form'>
           <div className='add'>
           <label className="add-collab">Photo:</label><br></br>
           <input type='file' onChange={(e)=>setPhoto(e.target.files[0])} className='add-input'></input>
           
           <label className="add-collab">Nom:</label> <br></br>
           <input type='text' onChange={(e)=>{setNom(e.target.value)}} className='add-input' placeholder={nom}></input>
           </div>
 
           <div className='add'>
           <label className="add-collab">Prenom:</label><br></br>  
           <input type='text'onChange={(e)=>{setPrenom(e.target.value)}} className='add-input'  placeholder={prenom}></input>
           
           <label className="add-collab">Adresse:</label><br></br> 
           <input type='text' onChange={(e)=>{setLot(e.target.value)}} className='add-input'></input>
           </div>
 
           <div className='add'>
           <label className="add-collab">Quartier:</label><br></br>    
           <input type='text' onChange={(e)=>{setQuartier(e.target.value)}} className='add-input'></input>
           
           <label className="add-collab">Ville:</label><br></br>    
           <input type='text' onChange={(e)=>{setVille(e.target.value)}} className='add-input'></input>
           </div>
 
           <div className='add'>
           <label className="add-collab"> Téléphone:</label><br></br>  
           <input type='text' onChange={(e)=>{setTelephone(e.target.value)}} className='add-input'></input>
           
           <label className="add-collab"> Matricule:</label><br></br>  
           <input type='text' onChange={(e)=>{setMatricule(e.target.value)}} className='add-input'></input>
           </div>
           
           <div className='add'>
           <label className="add-collab"> Date de naissance:</label><br></br>  
           <input type='date' onChange={(e)=>{setdateNaissance(e.target.value)}} className='add-input'></input>
           
           <label className="add-collab"> Poste:</label><br></br>  
           <input type='text' onChange={(e)=>{setPoste(e.target.value)}} className='add-input'></input>
           </div>
 
           <div className='add'>
           <label className="add-collab"> Date d'embauche:</label><br></br>  
           <input type='date' onChange={(e)=>{setdateEmbauche(e.target.value)}} className='add-input'></input>
           
           <label className="add-collab"> Site:</label><br></br>  
           <input type='text' onChange={(e)=>{setSite(e.target.value)}} className='add-input'></input>
           </div>
 
           <div className='add2'>
           <label className="add-collab">Sexe:</label><br></br>  
           <input type='text' onChange={(e)=>{setSexe(e.target.value)}} className='add-input'></input>
           </div>
 
           <button type='submit'>Envoyer</button>
           </form>
     </div>
   )
 }
export default UpdateCollab