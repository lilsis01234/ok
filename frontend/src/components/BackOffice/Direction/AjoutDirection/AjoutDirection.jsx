import { Typography, Input} from '@material-tailwind/react';
import axios from 'axios';
import React, { useState } from 'react'

const AjoutDirection = () => {
    const [nomDirection, setNomDirection] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {nomDirection}

        axios.post('http://localhost:4000/api/direction/new', formData)
            .then((response) => {
                alert('Direction ajouter avec succès')
            })
            .catch((error) => {
                console.error(error);
                alert("Erreur lors de l'ajout de la direction")
            })
    }

  return (
    <div className='m-5 p-2 bg-white font-[Poppins] rounded-lg flex  flex-col items-center'>
        <Typography variant="h4" className="text-[#9C1D21] text-center p-2">Ajouter un nouveau</Typography>
        <form onSubmit={handleSubmit} className='flex flex-row p-2 w-60'> 
            <Input type="text" label="Nouveau direction" onChange={(e) => setNomDirection(e.target.value)} />
            <button type="submit" className='mx-2 px-5 transition ease-in-out delay-150 bg-indigo-500 rounded-lg text-white hover:-translate-y-1 hover:scale-110 hover:bg-[#9C1D21] duration-300'>Ajouter</button>
        </form>
    </div>
  )
}

export default AjoutDirection;
