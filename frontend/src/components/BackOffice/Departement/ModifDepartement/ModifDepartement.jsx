import { Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Input, Select, Option} from '@material-tailwind/react'

const ModifDepartement = ({departementToEdit, onUpdateDepartement}) => {
  const [nomDepartement, setNomDepartement] = useState(departementToEdit?.nomDepartement || '')
  const [direction, setDirection] = useState(departementToEdit?.direction || '')

  const [listeDirection, setListeDirection] = useState([]);
 
  
  //Récupérer les listes des directions
  useEffect(() => {
    axios.get('http://localhost:4000/api/direction/all')
      .then((response) => {
        setListeDirection(response.data)
      
      })
      .catch((error) => {
        alert('Erreur lors de la récupération des données')
      })
  }, [])


 

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      nomDepartement,
      direction
    }

    axios.put(`http://localhost:4000/api/departement/edit/${departementToEdit.id}`, formData)
      .then((response) => {
        alert('Departement modifié avec succés')
        onUpdateDepartement()
      })
      .catch((error) => {
        console.error(error)
        alert("Erreur lors de la modification des départements")
      })
  }

  return (
    <div  className='flex flex-col items-center w-full font-[Poppins]'>
      <Typography variant="h3" className="text-[#9C1D21] text-center  py-5"> Modifier département</Typography>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className='m-5'><Input type="text" label="Département " value={nomDepartement} onChange={(e) => setNomDepartement(e.target.value)}/></div>
        <div className='m-5'> <Select label="Direction" value={direction} onChange={(e) => setDirection(e)}>
          {listeDirection && listeDirection.map((direction) => (
            <Option key={direction.id} value={direction.id.toString()}>
              {direction.nomDirection}
            </Option>
          ))}
        </Select></div>
        <button type='submit' className='flex flex-col self-center'>Ajouter</button>
      </form>
    </div>
  )
}

export default ModifDepartement
