import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-tailwind/react';


const ModifCollab = ({CollabToEdit, onCollabUpdated}) => {
    const [listePoste, setListePoste] = useState([])

    // const navigate = useNavigate();

    const [nom, setNom] = useState(CollabToEdit?.nom || '');
    const [image, setImage] = useState(CollabToEdit?.image || '');
    const [prenom, setPrenom] = useState(CollabToEdit?.prenom || '');
    const [lot, setLot] = useState(CollabToEdit?.lot || '');
    const [quartier, setQuartier] = useState(CollabToEdit?.quartier || '');
    const [ville, setVille] = useState(CollabToEdit?.ville || '');
    const [tel, setTel] = useState(CollabToEdit?.tel || '');
    const [matricule, setMatricule] = useState(CollabToEdit?.matricule || '');
    const [dateNaissance, setdateNaissance] = useState(CollabToEdit?.dateNaissance || '');
    const [dateEmbauche, setdateEmbauche] = useState(CollabToEdit?.dateEmbauche || '');
    const [site, setSite] = useState(CollabToEdit?.site || '');
    const [poste, setPoste] = useState(CollabToEdit?.poste || '');
    const [sexe, setSexe] = useState(CollabToEdit?.sexe || '');
    //Récupération de la liste des postes 
    useEffect(() => {
        axios.get('http;//localhost:4000/api/poste/all_postes')
            .then((res) => {
                setListePoste(res.data)
            })
            .catch(err => console.log(err))

    })

    const Sexe = [
        { id: 1, nom: 'masculin' },
        { id: 2, nom: 'feminin' }
    ]

    const Site = [
        { id: 1, nom: 'Fivoarana' },
        { id: 2, nom: 'Ivohasina' },
        { id: 3, nom: 'Soazaraina' }
    ]


    useEffect(() => {
        if (CollabToEdit) {
            setNom(CollabToEdit.nom)
            setPrenom(CollabToEdit.prenom)
            setImage(CollabToEdit.image)
            setLot(CollabToEdit.lot)
            setQuartier(CollabToEdit.quartier)
            setVille(CollabToEdit.ville)
            setTel(CollabToEdit.tel)
            setMatricule(CollabToEdit.matricule)
            setdateNaissance(CollabToEdit.dateNaissance)
            setdateEmbauche(CollabToEdit.dateEmbauche)
            setSite(CollabToEdit.site)
            setPoste(CollabToEdit.poste)
            setSexe(CollabToEdit.sexe)

        } else {
            setNom("")
            setPrenom("")
            setImage("")
            setLot("")
            setQuartier("")
            setVille("")
            setTel("")
            setMatricule("")
            setdateNaissance("")
            setdateEmbauche("")
            setSite("")
            setPoste("")
            setSexe("")
        }
    }, [CollabToEdit])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            image,
            lot,
            quartier, 
            ville,
            tel,
            site,
            poste,
    
        }

       

        axios.put(`http;//localhost:4000/api/collaborateur/edit/${CollabToEdit.id}`, formData, {headers : {
            'Content-Type' : 'multipart/form-data',
        }})
            .then((response) => {
                onCollabUpdated();
                alert('Collaborateur modifier avec succès')
            })
            .catch((error) => {
                console.error(error)
            })

    }

    const [selectImage, setSelectImage] = useState(null);

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setImage(selectedFile);
        setSelectImage(selectedFile);
    }

    



    return (
        <div>
            <form onSubmit={handleSubmit} className="collaborateurAddContent_Form font-['Poppins']">
                <div className="flex flex-col content-center ml-10 pl-10 collaborateurAddContent_FormContent">
                    <div className="collaborateurAddContent_Form_Photo">
                        <label >Photo:</label><br></br>
                        <input type='file' onChange={handleImageChange} className='justify-self-center' name="image"></input>
                        {!selectImage && image && (
                             <Avatar src={`http;//localhost:4000/${image}`}/>
                        )}
                        {selectImage && (
                            <Avatar src={URL.createObjectURL(selectImage)} className="w-32 h-32 rounded-full"/>
                        )}

                    </div>
                    <div className="collaborateurAddContent_Form_Item">
                        <div>
                            <label > Matricule:</label><br></br>
                            <input type='text' onChange={(e) => { setMatricule(e.target.value) }} className='add-input' disabled value={matricule}></input>
                        </div>
                        <div>
                            <label>Nom:</label> <br></br>
                            <input type='text' onChange={(e) => { setNom(e.target.value) }} className='add-input' disabled value={nom}></input>
                        </div>

                        <div >
                            <label >Prenom:</label><br></br>
                            <input type='text' onChange={(e) => { setPrenom(e.target.value) }} className='add-input' disabled value={prenom}></input>
                        </div>
                    </div>
                    <div className="collaborateurAddContent_Form_Item">
                        <div>
                            <label > Date de naissance:</label><br></br>
                            <input type='date' onChange={(e) => { setdateNaissance(e.target.value) }} className='add-input' disabled value={dateNaissance}></input>
                        </div>
                        <div>
                            <label >Sexe</label><br />
                            <select
                                value={sexe}
                                onChange={(e) => setSexe(e.target.value)}
                                disabled
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
                            <label >Lot:</label><br></br>
                            <input value={lot} type='text' onChange={(e) => { setLot(e.target.value) }} className='add-input'>
                            </input>
                        </div>
                        <div>
                            <label >Quartier:</label><br></br>
                            <input value={quartier} type='text' onChange={(e) => { setQuartier(e.target.value) }} className='add-input'></input>
                        </div>
                        <div>
                            <label >Ville:</label><br></br>
                            <input value={ville} type='text' onChange={(e) => { setVille(e.target.value) }} className='add-input'></input>
                        </div>
                    </div>
                    <div className="collaborateurAddContent_Form_Item">
                        <div>
                            <label > Téléphone:</label><br></br>
                            <input value={tel} type='text' onChange={(e) => { setTel(e.target.value) }} className='add-input'></input>
                        </div>
                    </div>
                    <div className="collaborateurAddContent_Form_Item">
                        <div>
                            <label > Date d'embauche:</label><br></br>
                            <input value={dateEmbauche} type='date' onChange={(e) => { setdateEmbauche(e.target.value) }} disabled></input>
                        </div>
                        <div >
                            <label >Poste</label><br />
                            <select
                                value={poste}
                                onChange={(e) => setPoste(e.target.value)}>
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
                            <select value={Site} onChange={(e) => setSite(e.target.value)}>
                                {Site.map((Site) => (
                                    <option key={Site.id} value={Site.nom}> {Site.nom}</option>
                                ))}
                            </select>

                        </div>
                    </div>
                    <button type='submit' className="collaborateurAddContent_Form_Button">Modifier</button>
                </div>
            </form>
        </div>
    )
}

export default ModifCollab
