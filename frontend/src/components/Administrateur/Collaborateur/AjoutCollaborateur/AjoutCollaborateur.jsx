import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../NavBar/NavBarAdmin'
import SideBar from '../../SideBarAdmin/SideBar'
import axios from 'axios'
import '../../../Other_component/Page.css'
import './AjoutCollaborateur.css'
import { Avatar } from '@material-tailwind/react'

const AjoutCollaborateur = () => {

    const Sexe = [
        { id: 1, nom: 'masculin' },
        { id: 2, nom: 'feminin' }
    ]

    const Site = [
        { id : 1, nom:'Fivoarana'},
        { id : 2, nom:'Ivohasina'},
        { id: 3, nom:'Soazaraina'}
    ]


    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [photo, setPhoto] = useState(null);
    const [prenom, setPrenom] = useState('');
    const [lot, setLot] = useState('');
    const [quartier, setQuartier] = useState('');
    const [ville, setVille] = useState('');
    const [telephone, setTelephone] = useState('');
    const [matricule, setMatricule] = useState('');
    const [dateNaissance, setdateNaissance] = useState('');
    const [dateEmbauche, setdateEmbauche] = useState('');
    const [site, setSite] = useState('');
    const [poste, setPoste] = useState('');
    const [sexe, setSexe] = useState('');
    const [email, setEmail] = useState('');

    //Récupération de la liste des postes
    const [listePoste, setListePoste] = useState([])

    useEffect(() => {
        axios.get('http://192.168.16.244:4003/api/poste/all_postes')
            .then((res) => {
                setListePoste(res.data)
            })
            .catch(err => console.log(err));
    }
    )

    //pour afficher l'image à la saisi des formulaire
    const [selecteImage, setSelecteImage] = useState(null)

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setPhoto(selectedFile);
        setSelecteImage(selectedFile);
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', photo);
        formData.append('nom', nom);
        formData.append('lot', lot);
        formData.append('quartier', quartier);
        formData.append('ville', ville);
        formData.append('dateEmbauche', dateEmbauche);
        formData.append('site', site);
        formData.append('dateNaissance', dateNaissance);
        formData.append('poste', poste);
        formData.append('sexe', sexe);
        formData.append('prenom', prenom);
        formData.append('telephone', telephone);
        formData.append('matricule', matricule);
        formData.append('email', email);

        axios.post('http://192.168.16.244:4003/api/collaborateur/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                console.log(res);
                navigate('/admin/collaborateur/liste');
            }).catch(err => console.log(err));

    }

    return (
        <div className="page">
            <Navbar />
            <div className="content">
                <SideBar />
                <div className="main-content">
                    <div className="collaborateurAddContent">
                        <h1 className="font-bold text-2xl p-5">Ajouter un collaborateur</h1>
                        <form onSubmit={handleSubmit} className="collaborateurAddContent_Form">
                            <div className="collaborateurAddContent_FormContent">
                                <div className="collaborateurAddContent_Form_Photo">
                                    <label >Photo:</label><br></br>
                                      
                                        {selecteImage && (
                                            <Avatar src={URL.createObjectURL(selecteImage)} className="w-32 h-32 rounded-full"/>
                                        )}
                                        <input type='file' onChange={handleImageChange}  accept="image/*"></input>
                                </div>
                                <div className="collaborateurAddContent_Form_Item">
                                    <div>
                                        <label > Matricule:</label><br></br>
                                        <input type='text' onChange={(e) => { setMatricule(e.target.value) }} className='add-input'></input>
                                    </div>
                                    <div>
                                        <label>Nom:</label> <br></br>
                                        <input type='text' onChange={(e) => { setNom(e.target.value) }} className='add-input'></input>
                                    </div>

                                    <div >
                                        <label >Prenom:</label><br></br>
                                        <input type='text' onChange={(e) => { setPrenom(e.target.value) }} className='add-input'></input>
                                    </div>
                                </div>
                                <div className="collaborateurAddContent_Form_Item">
                                    <div>
                                        <label > Date de naissance:</label><br></br>
                                        <input type='date' onChange={(e) => { setdateNaissance(e.target.value) }} className='add-input'></input>
                                    </div>
                                    <div>
                                        <label >Sexe</label><br/>
                                        <select
                                            value={sexe}
                                            onChange={(e) => setSexe(e.target.value)}
        
                                        >
                                            {Sexe.map((sexe) => (
                                                <option key={sexe.id} value={sexe.nom}>
                                                    {sexe.nom}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="collaborateurAddContent_Form_Item">
                                    <div>
                                        <label >Adresse:</label><br></br>
                                        <input type='text' onChange={(e) => { setLot(e.target.value) }} className='add-input'>
                                        </input>
                                    </div>
                                    <div>
                                        <label >Quartier:</label><br></br>
                                        <input type='text' onChange={(e) => { setQuartier(e.target.value) }} className='add-input'></input>
                                    </div>
                                    <div>
                                        <label >Ville:</label><br></br>
                                        <input type='text' onChange={(e) => { setVille(e.target.value) }} className='add-input'></input>
                                    </div>
                                </div>
                                <div className="collaborateurAddContent_Form_Item">
                                    <div>
                                        <label > Téléphone:</label><br></br>
                                        <input type='text' onChange={(e) => { setTelephone(e.target.value) }} className='add-input'></input>
                                    </div>
                                    <div>
                                        <label > Adresse e-mail</label><br></br>
                                        <input type='email' onChange={(e) => { setEmail(e.target.value) }} className='add-input'></input>
                                    </div>
                                </div>
                                <div className="collaborateurAddContent_Form_Item">
                                    <div>
                                        <label > Date d'embauche:</label><br></br>
                                        <input type='date' onChange={(e) => { setdateEmbauche(e.target.value) }} ></input>
                                    </div>
                                    <div >
                                        <label >Poste</label><br/>
                                        <select
                                            value={poste}
                                            onChange={(e) => setPoste(e.target.value)}

                                        >
                                        <option value="">Sélectionner une option</option>
                                            {listePoste.map((poste) => (
                                                <option key={poste.id} value={poste.id}>
                                                    {poste.titrePoste}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label > Site:</label><br></br>
                                        <select value={site} onChange = {(e) => setSite(e.target.value)}>
                                            {Site.map((Site) => (
                                                <option key={Site.id} value={Site.nom}> {Site.nom}</option>
                                            ))}
                                        </select>

                                    </div>
                                </div>
                                <button type='submit' className="collaborateurAddContent_Form_Button">Ajouter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AjoutCollaborateur
