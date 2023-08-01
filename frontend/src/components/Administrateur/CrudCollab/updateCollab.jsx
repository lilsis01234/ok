import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateCollab = () => {
  const navigate = useNavigate;
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [lot, setLot] = useState("");
  const [quartier, setQuartier] = useState("");
  const [ville, setVille] = useState("");
  const [tel, setTel] = useState("");
  const [site, setSite] = useState("");
  const [poste, setPoste] = useState("");

  const [dateNaissance, setDateNaissance] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateEmbauche, setDateEmbauche] = useState("");
  const [matricule, setMatricule] = useState("");
  const [sexe, setSexe] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setPhoto(selectedFile);
  };
  useEffect(() => {
    axios.get(`http://localhost:4000/api/collaborateur/${id}`)
      .then((res) => {
        setLot(res.data.collaborateur.lot);
        setQuartier(res.data.collaborateur.quartier);
        setVille(res.data.collaborateur.ville);
        setTel(res.data.collaborateur.tel);
        setSite(res.data.collaborateur.site);
        setPoste(res.data.collaborateur.poste);
        setPhoto(res.data.collaborateur.image);

        setDateNaissance(res.data.collaborateur.dateNaissance);
        setNom(res.data.collaborateur.nom);
        setPrenom(res.data.collaborateur.prenom);
        setDateEmbauche(res.data.collaborateur.dateEmbauche);
        setMatricule(res.data.collaborateur.matricule);
        setSexe(res.data.collaborateur.sexe);
      })
      .catch((err) => console.log(err));
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCollab = new FormData();
    updatedCollab.append('image',photo);
    updatedCollab.append('lot',lot);
    updatedCollab.append('quartier',quartier);
    updatedCollab.append('ville', ville);
    updatedCollab.append('tel', tel);
    updatedCollab.append('site', site);
    updatedCollab.append('poste',poste);

    axios.put(`http://localhost:4000/api/collaborateur/edit/${id}`, updatedCollab,{headers: {
      'Content-Type': 'multipart/form-data',
    },})
    .then((res) => {
        console.log("Collaborateur modifié avec succès",res);
        navigate('/admin/listeCollab'); // Use navigate here
    }).catch(err =>console.log(err));
    };
  return (
     <div>
      <h1>Modifier</h1>
      <form onSubmit={handleSubmit}>
            <div className="editCollaborateurItem">
              <label>Photo</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-2">
              <label>Lot</label>
              <input
                type="text"
                className="form-control"
                name="lot"
                value={lot}
                onChange={(e) => setLot(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label>Quartier</label>
              <input
                type="text"
                className="form-control"
                value={quartier}
                onChange={(e) => setQuartier(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label>Ville</label>
              <input
                type="text"
                className="form-control"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label>Tel</label>
              <input
                type="text"
                className="form-control"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label>Site</label>
              <input
                type="text"
                className="form-control"
                value={site}
                onChange={(e) => setSite(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label>Poste</label>
              <input
                type="text"
                className="form-control"
                value={poste}
                onChange={(e) => setPoste(e.target.value)}
              />
            </div>

            {/* Non-editable fields */}
            <div className="mb-2">
              <label>Date de naissance</label>
              <input
                type="text"
                className="form-control"
                value={dateNaissance}
                disabled
              />
            </div>
            <div className="mb-2">
              <label>Nom</label>
              <input
                type="text"
                className="form-control"
                value={nom}
                disabled
              />
            </div>
            <div className="mb-2">
              <label>Prénom</label>
              <input
                type="text"
                className="form-control"
                value={prenom}
                disabled
              />
            </div>
            <div className="mb-2">
              <label>Sexe</label>
              <input
                type="text"
                className="form-control"
                value={sexe}
                disabled
              />
            </div>
            <div className="mb-2">
              <label>Date d'embauche</label>
              <input
                type="text"
                className="form-control"
                value={dateEmbauche}
                disabled
              />
            </div>
            <div className="mb-2">
              <label>Matricule</label>
              <input
                type="text"
                className="form-control"
                value={matricule}
                disabled
              />
            </div>
            <button type='submit'>Confirmer</button>
     </form>
    </div>
  )
}

export default UpdateCollab






 


  
