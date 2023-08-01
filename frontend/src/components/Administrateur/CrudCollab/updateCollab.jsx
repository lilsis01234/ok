import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateCollab = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [lot, setLot] = useState("");
  const [quartier, setQuartier] = useState("");
  const [ville, setVille] = useState("");
  const [tel, setTel] = useState("");
  const [site, setSite] = useState("");
  const [poste, setPoste] = useState("");

  const[anciennephoto,setAnciennePhoto]=useState('');
  const [dateNaissance, setDateNaissance] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateEmbauche, setDateEmbauche] = useState("");
  const [matricule, setMatricule] = useState("");
  const [sexe, setSexe] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPhoto(selectedFile);
    };
    }

  useEffect(() => {
    axios.get(`http://localhost:4000/api/collaborateur/${id}`)
      .then((res) => {
        setLot(res.data.collaborateur.lot);
        setQuartier(res.data.collaborateur.quartier);
        setVille(res.data.collaborateur.ville);
        setTel(res.data.collaborateur.tel);
        setSite(res.data.collaborateur.site);
        setPoste(res.data.collaborateur.poste);
        setAnciennePhoto(res.data.collaborateur.image);

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
    if (photo === '') {
      updatedCollab.append('image', '');
    } else {
      updatedCollab.append('image', photo);
    }
    updatedCollab.append('lot',lot);
    updatedCollab.append('quartier',quartier);
    updatedCollab.append('ville', ville);
    updatedCollab.append('tel', tel);
    updatedCollab.append('site', site);
    updatedCollab.append('poste',poste);
    console.log(updatedCollab)
    
    axios.put(`http://localhost:4000/api/collaborateur/edit/${id}`, updatedCollab,{headers: {
      'Content-Type': 'multipart/form-data',
    },})
    .then((res) => {
        console.log(res);
        navigate('/admin/listeCollab'); // Use navigate here
    }).catch(err =>console.log(err));
    };



  return (
     <div className='block'>
      <h1>Modifier un collaborateur</h1>
      <form onSubmit={handleSubmit}>
            <div className="add">
              <label className='add-collab'>Photo</label>
              <input
                type="file"
                id="file"
                name="file"
                className='add-input'
                defaultValue={anciennephoto}
                onChange={handleFileChange}
              />

              <label className='add-collab'>Lot</label>
              <input
                type="text"
                className='add-input'
                name="lot"
                value={lot}
                onChange={(e) => setLot(e.target.value)}
              />
            </div>
            
            <div className="add">
              <label className='add-collab'>Quartier</label>
              <input
                type="text"
                className='add-input'
                value={quartier}
                onChange={(e) => setQuartier(e.target.value)}
              />
              <label className='add-collab'>Ville</label>
              <input
                type="text"
                className='add-input'
                value={ville}
                onChange={(e) => setVille(e.target.value)}
              />
            </div>

            <div className="add">
              <label className='add-collab'>Tel</label>
              <input
                type="text"
                className='add-input'
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />

              <label className='add-collab'>Site</label>
              <input
                type="text"
                className='add-input'
                value={site}
                onChange={(e) => setSite(e.target.value)}
              />
            </div>

            <div className="add">
              <label className='add-collab'>Poste</label>
              <input
                type="text"
                className='add-input'
                value={poste}
                onChange={(e) => setPoste(e.target.value)}
              />
              <label className='add-collab'>Date de naissance</label>
              <input
                type="text"
                className='add-input'
                value={dateNaissance}
                disabled
              />
            </div>


            <div className="add">
              <label className='add-collab'>Nom</label>
              <input
                type="text"
                className='add-input'
                value={nom}
                disabled
              />
              <label className='add-collab'>Prénom</label>
              <input
                type="text"
                className='add-input'
                value={prenom}
                disabled
              />
            </div>

            <div className="add">
              <label className='add-collab'>Sexe</label>
              <input
                type="text"
                className='add-input'
                value={sexe}
                disabled
              />
              <label className='add-collab'>Date d'embauche</label>
              <input
                type="text"
                className='add-input'
                value={dateEmbauche}
                disabled
              />
            </div>

            <div className="add">
              <label className='add-collab'>Matricule</label>
              <input
                type="text"
                className='add-input'
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






 


  
