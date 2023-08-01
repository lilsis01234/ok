import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const AddCollab = () => {

const Sexe= [
  {id:1,nom:'masculin'},
  {id:2,nom:'feminin'}
]
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
 
 const[listePoste,setListePoste]=useState([])

 useEffect(()=>{
  axios.get('http://localhost:4000/api/poste/all_postes')
  .then((res) => {setListePoste(res.data)
               console.log(listePoste)})
  .catch(err => console.log(err));
 }
 )
 
 const Validation=(event)=>{
    event.preventDefault();

    const formData = new FormData();
    formData.append('image',photo);
    formData.append('nom',nom);
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

    axios.post('http://localhost:4000/api/collaborateur/add',formData,{headers: {
      'Content-Type': 'multipart/form-data',
    },})
    .then(res => {
        console.log(res);
        navigate('/admin/listeCollab');
    }).catch(err =>console.log(err));
 };

  return (
    <div className='block'>
        <h1>Ajouter un collaborateur</h1>
        <form onSubmit={Validation} className='add-form'>
          <div className='add'>
          <label className="add-collab">Photo:</label><br></br>
          <input type='file' onChange={(e)=>setPhoto(e.target.files[0])} className='add-input'></input>
          
          <label className="add-collab">Nom:</label> <br></br>
          <input type='text' onChange={(e)=>{setNom(e.target.value)}} className='add-input'></input>
          </div>

          <div className='add'>
          <label className="add-collab">Prenom:</label><br></br>  
          <input type='text'onChange={(e)=>{setPrenom(e.target.value)}} className='add-input'></input>
          
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

          {listePoste.map(poste => (
             <label key={poste.id}>
               <input
                  type='radio'
                  name='poste'
                  value={poste.id}
                  onChange={(e) => setPoste(e.target.value)}
                  className='radio'
             />
            {poste.titrePoste}
           </label>
          ))}
          </div>

          <div className='add'>
          <label className="add-collab"> Date d'embauche:</label><br></br>  
          <input type='date' onChange={(e)=>{setdateEmbauche(e.target.value)}} className='add-input'></input>
          
          <label className="add-collab"> Site:</label><br></br>  
          <input type='text' onChange={(e)=>{setSite(e.target.value)}} className='add-input'></input>
          </div>

          <div className='add2'>
          <label className="add-collab">Sexe:</label><br></br>  
          {Sexe.map(sexe => (
          <label key={sexe.id}>
               <input
                  type='radio'
                  name='sexe'
                  value={sexe.nom}
                  onChange={(e) => setSexe(e.target.value)}
                  className='radio'
             />
            {sexe.nom}
          </label>))} 
         </div> 

          <button type='submit'>Envoyer</button>
          </form>
    </div>
  )
}


export default AddCollab