import { Typography, Input, Option, Select } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'





const AjoutDepartement = ({onDepartementAdded}) => {
    const [nomDepartement, setNomDepartement] = useState();
    const [direction, setDirection] = useState();

    const [listeDirection, setListeDirection] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/direction/all')
            .then((response) => {
                setListeDirection(response.data)
            })
            .catch((error) => {
                alert("Erreur lors de la récupération des données")
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            nomDepartement,
            direction
        }

        axios.post('http://localhost:4000/api/departement/new', formData)
            .then((response) => {
                alert('Département ajouter avec succès')
                onDepartementAdded()
            })
            .catch((error) => {
                console.error(error);
                alert("Erreur lors de l'ajout du département")
            })

    }



    return (
        <div className='flex flex-col items-center w-full font-[Poppins]'>
            <Typography variant="h3" className="py-5">Ajouter un département</Typography>
            <form className="w-full" onSubmit={handleSubmit}>
                <div className='m-5'><Input  type="text" label="Département " onChange={(e) => setNomDepartement(e.target.value)}/></div>
                <div className='m-5'><Select label="Direction" onChange={(e) => setDirection(e)}>
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

export default AjoutDepartement
