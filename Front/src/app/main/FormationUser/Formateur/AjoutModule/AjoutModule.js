import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../AjoutFormation/AjoutFormation.css';
import { useParams } from 'react-router-dom';

const AjoutModule = () => {
  const[titreModule,setTitremodule] = useState('');
  const[description,setDescription] = useState('');
  const formation = useParams();
  const navigate = useNavigate()

  const idformation = formation.id;
  const handleSubmit = (event)=>{
    event.preventDefault();

    axios.post('http://localhost:4000/api/module/addModule',{titreModule,description,idformation})
    .then((res) =>{console.log(res.data)
      navigate(`/admin/formation/${idformation}`)}
    )
    .catch(err=>console.log(err))
  }

  return (
    <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Titre</label>
            <input type="text" value={titreModule} onChange={(e) => setTitremodule(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-group">
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
  )
}

export default AjoutModule