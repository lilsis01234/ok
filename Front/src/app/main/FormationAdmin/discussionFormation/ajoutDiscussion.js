import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../FormationUser/Formateur/AjoutFormation/AjoutFormation.css';

const AjoutDiscussion = () => {
    const navigate = useNavigate();
    const [sujet, setSujet] = useState('');
    const [contenu, setContenu] = useState('');
    const formateurprep= localStorage.getItem('user');
    const parsedFormateur = JSON.parse(formateurprep);
    const formateur = parsedFormateur.id;

    const formation =useParams();
    const formationId = formation.id;

    const auteur = localStorage.getItem('user'); 
    const parsedAuteur = JSON.parse(auteur);
    const collaborateur = parsedAuteur.id;
    const [modulechoosen,setModuleChoosen] = useState('');
    const [module, setModule] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const GetModule = ()=>{
        axios.get(`http://localhost:4000/api/module/modules/${formationId}`)
        .then((res)=>{
            // console.log(res.data)
            setModule(res.data)
        })
        .catch((err) => console.log(err));
    }

    useEffect(()=>{
        GetModule();
    },[formationId])

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("sujet",sujet);
        formData.append("contenu",contenu);
        formData.append("formateur",formateur);
        formData.append("formationId",formationId);
        formData.append("collaborateur",collaborateur);
        formData.append("modulechoosen",modulechoosen);

        for (const file of selectedFiles) {
            formData.append("pieceJointes", file);
        }

        axios.post('http://localhost:4000/api/discussions/nouveauDiscussion', formData)
        .then((res) => {
            console.log(res);
            navigate(`/discussion/formation/${formationId}`); // Remplacez par le chemin vers lequel vous souhaitez rediriger après l'ajout.
        })
        .catch((err) => console.log(err));
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Sujet</label>
                    <input type="text" value={sujet} onChange={(e) => setSujet(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Contenu</label>
                    <input type="text" value={contenu} onChange={(e) => setContenu(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Module</label>
                    <select value={modulechoosen} onChange={(e) => setModuleChoosen(e.target.value)}>
                    {module.map((mod) => (
                    <option key={mod.id} value={mod.id}>
                    {mod.titreModule}
                    </option>
                    ))}
                    </select>
                </div>
                <div className="form-group">
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                />
                </div>
                <div className="form-group">
                    <button type="submit">Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default AjoutDiscussion;
