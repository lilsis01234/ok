import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../FormationUser/Formateur/AjoutFormation/AjoutFormation.css';

const AjoutCommentaire = () => {
    const navigate = useNavigate();
    const [contenu, setContenu] = useState('');

    const discussion = useParams();
    const discussionId = discussion.id;
    console.log(discussion)

    const auteur = localStorage.getItem('user'); 
    const parsedAuteur = JSON.parse(auteur);
    const collaborateur = parsedAuteur.id;
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("contenu",contenu);
        formData.append("idDiscussion",discussionId);
        formData.append("idCollaborateur",collaborateur);

        for (const file of selectedFiles) {
            formData.append("pieceJointes", file);
        }

        axios.post('http://localhost:4000/api/commentaire/addComment', formData)
        .then((res) => {
            console.log(res);
            navigate(`/voirPlus/${discussionId}`); // Remplacez par le chemin vers lequel vous souhaitez rediriger après l'ajout.
        })
        .catch((err) => console.log(err));
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Contenu</label>
                    <input type="text" value={contenu} onChange={(e) => setContenu(e.target.value)} />
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

export default AjoutCommentaire;
