import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../AjoutPoste/AjoutPoste.css'
import { Checkbox } from '@material-tailwind/react';

const ModifPoste = ({ posteToEdit, onPosteUpdated }) => {
    const [titrePoste, setTitrePoste] = useState(posteToEdit?.titrePoste || '')
    const [departements, setDepartements] = useState(posteToEdit?.departement || [])
    const [departementList, setDepartementList] = useState([]);

    useEffect(() => {
<<<<<<< HEAD
        axios.get('http://localhost:4000/api/departement/all')
=======
        axios.get('http://localhost:4001/api/departement/all')
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
            .then(response => {
                setDepartementList(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données:', error)
            })
    }, []);

    useEffect(() => {
        if (posteToEdit) {
            setTitrePoste(posteToEdit.titrePoste)
            setDepartements(posteToEdit.departement.map((dept) => dept.id))
        } else {
            setTitrePoste("");
            setDepartements([])
        }
    }, [posteToEdit])


    const isDepartementSelected = (departementId) => {
        return departements.includes(departementId);
    }

    const handleCheckBoxChange = (event, departementId) => {
        const checked  = event.target.checked;
        let updatedDepartements;

        if (checked) {
            updatedDepartements = [...departements, departementId];
        } else {
            updatedDepartements = departements.filter((dept) => dept !== departementId)
        }

        setDepartements(updatedDepartements);
    }


    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            titrePoste,
            departement: departements
        }


        if (!titrePoste.trim() && departements.length === 0) {
            alert("Le champ Poste ne peut pas être vide");
            return;
        }

<<<<<<< HEAD
        axios.put(`http://localhost:4000/api/poste/${posteToEdit.id}/edit`, formData)
=======
        axios.put(`http://localhost:4001/api/poste/${posteToEdit.id}/edit`, formData)
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
            .then((response) => {
                onPosteUpdated();
                alert('Département modifier avec succès')
            })
            .catch((error) => {
                console.error(error)
            })


    }



    return (
        <div>
            <div>
                <form className="addPoste_form">
                    <div className="flex flex-col py-5">
                        <label>Poste</label>
                        <input className="poste" type="text" value={titrePoste} onChange={(e) => setTitrePoste(e.target.value)} placeholder="Entrer un poste"></input>
                    </div>
                    <div className="grid grid-cols-6">
                        {departementList.map((departement) => (
                            <div key={departement.id} className="col-span-2 form_checkbox">
                                <Checkbox  value={departement.id} label={departement.nomDepartement} onChange={(event) => handleCheckBoxChange(event, departement.id)} checked={isDepartementSelected(departement.id)}/>
                            </div>
                        ))}
                    </div>
                    <button type="submit" onClick={handleSubmit} className="addPoste_Submit">Modifier</button>
                </form>
            </div>
        </div>
    )
}

export default ModifPoste
