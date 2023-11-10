import { Input, Select, Typography, Option} from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AjoutEquipe = ({onEquipeAdded}) => {
    const [nomEquipe, setNomEquipe] = useState();
    const [departement, setDepartement] = useState();

    const [listDepartement, setListDepartement] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4001/api/departement/all')
        .then((response) => {
            setListDepartement(response.data)
        }).catch((error) => {
            alert("Erruer lors de la récupération des données")
        })
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            nomEquipe,
            departement
        }

        axios.post('http://localhost:4001/api/equipe/new', formData)
        .then((response) => {
            alert('Equipe ajouter avec succès')
            onEquipeAdded()
        })
        .catch((error) => {
            console.error(error);
            alert("Erreur lors de l'ajout du département")
        })
    }

    return(
        <div>
            <Typography variant="h3">Ajouter une équipe</Typography>
            <form className='w-full' onSubmit={handleSubmit}>
                <div>
                    <Input type="text" label="Equipe" onChange={(e) => setNomEquipe(e.target.value)}/>
                </div>
                <div>
                    <Select label="Département" onChange={(e) => setDepartement(e)}>
                        {listDepartement && listDepartement.map((departement) => (
                            <Option key={departement.id} value={departement.id.toString()}>
                                {departement.nomDepartement}
                            </Option>
                        ))}
                    </Select>
                </div>
                <button type='submit' className='flex flex-col self-center'>Ajouter</button>
            </form>
        </div>
    )
}

export default AjoutEquipe
