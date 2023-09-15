import React, { useEffect, useState } from 'react'
import './formulaireAjoutDepartement.css'
import axios from 'axios'

const FormulaireDepartement = ({isEditing, departementToEdit, onAddDepartement, onUpdateDepartement, setEditing}) => {
  const [nomDepartement, setNomDepartement] = useState(departementToEdit ? departementToEdit.nomDepartement : '')


  useEffect(() => {
    if (isEditing && departementToEdit){
      setNomDepartement(departementToEdit.nomDepartement)
    } else {
      setNomDepartement("");
    }
  }, [isEditing, departementToEdit])

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const formData = {nomDepartement}

    if(!nomDepartement.trim()){
      alert("Le champ Département ne peut pas être vide");
      return;
    }

    if(isEditing){
      axios.put(`http://localhost:4000/api/departement/edit/${departementToEdit.id}`, formData)
      .then((response) => {
        onUpdateDepartement(response.data)
        alert('Département modifier avec succés')
      })
      .catch((error) => {
        console.error(error)
      });
      setEditing(true);
    } else {
      axios.post('http://localhost:4000/api/departement/new', formData)
      .then((response) => {
        onAddDepartement(response.data)
        alert('Département ajouter avec succés')
      })
      .catch((error) => {
        console.error(error);
      })
      setEditing(false);
    }

  }

  const handleBackToAdd = () => {
    setEditing(false);
  }


  return (
    <div className="formulaireDepartement">
      <div className="formulaireDepartement_container">
        <h1 className="formulaireDepartement_title">{isEditing ? 'Modifier un département' : 'Ajouter un département'} </h1>
        <form onSubmit={handleSubmit} className="formulaireDepartement_form">
          <label>Département</label>
          <input type="text" value={nomDepartement} onChange={(e) => setNomDepartement(e.target.value)} placeholder={isEditing ? '' : 'Enter un département'}></input>
          <button type="submit" className="form_button">{isEditing ? 'Modifier' : 'Ajouter'}</button>
          {isEditing && <button onClick={handleBackToAdd} className="editDepartement_cancel">Annuler</button>}
         </form>
      </div>
     
    </div>
  )
}

export default FormulaireDepartement

