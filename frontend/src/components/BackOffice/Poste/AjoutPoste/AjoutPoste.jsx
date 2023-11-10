import { Checkbox } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './AjoutPoste.css'


const AjoutPoste = ({ onPosteAdded }) => {
    const [titrePoste, setTitrePoste] = useState('');
    const [departements, setDepartements] = useState([]);
    const [departementList, setDepartementList] = useState([]);

    //Récupération des départements dans la base de données
    useEffect(() => {
        axios.get('http://localhost:4000/api/departement/all')
            .then(response => {
                setDepartementList(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données:', error)
            })
    }, []);

    const handleCheckBoxChange = (event) => {
        const { value, checked } = event.currentTarget;
        if (checked) {
            setDepartements([...departements, value]);
        } else {
            setDepartements(departements.filter((departementId) => departementId !== value))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            titrePoste,
            departement: departements
        }

        if (!titrePoste.trim() && departements.length === 0) {
            alert("Le champ Poste ne peut pas être vide");
            return;
        }
        axios.post('http://localhost:4000/api/poste/new', formData)
            .then((response) => {
                alert('Poste ajoutée avec succès')
                onPosteAdded();
            })
            .catch((error) => {
                console.error(error)
            })



    }


    return (
        <div>
            <form className="addPoste_form">
                <div className="flex flex-col py-5">
                    <label>Poste</label>
                    <input className="poste" type="text" value={titrePoste} onChange={(e) => setTitrePoste(e.target.value)} placeholder="Entrer un poste"></input>
                </div>
                <div>
                    <label>Départements : </label>
                    <div className="grid grid-cols-6">
                        {departementList.map((departement) => (
                            <div key={departement.id} className="col-span-2  form_checkbox">
                                <Checkbox value={departement.id} label={departement.nomDepartement} onChange={handleCheckBoxChange}/>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" onClick={handleSubmit} className="addPoste_Submit">Ajouter</button>
            </form>
        </div>
    )
}

export default AjoutPoste
