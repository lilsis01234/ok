import { Typography, Input} from '@material-tailwind/react';
import React, {useState} from 'react'
import axios from 'axios';

const ModifDirection = ({DirectionToEdit, onDirectionUpdated}) => {
    const [nomDirection, setNomDirection] = useState(DirectionToEdit?.nomDirection || '')

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            nomDirection
        }

        axios.put(`http://localhost:4000/api/direction/edit/${DirectionToEdit.id}`, formData)
          .then((response) => {
              onDirectionUpdated();
              alert('Direction modifier avec succès')
          })
          .catch((error) => {
            console.error(error)
            alert('Erreur lors de la modification')
          })

    }
  return (
    <div className='flex flex-col items-center content-center font-[Poppins]'>
        <Typography variant="h4" className="p-5">Modifier une direction</Typography>
        <form onSubmit={handleSubmit} className='m-5'>
            <Input variant="static" type="text" label="Direction" value={nomDirection} onChange={(e) => setNomDirection(e.target.value)}/>
            <button type="submit" className='m-8 p-3 text-white rounded-lg  bg-[#9C1D21]'>Enregistrer la modification</button>
        </form>
    </div>
  )
}

export default ModifDirection
