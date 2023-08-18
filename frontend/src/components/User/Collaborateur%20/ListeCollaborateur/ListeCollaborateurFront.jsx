import { Typography, Card, CardHeader, CardBody, Input, Avatar } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBarUser from '../../NavBarUser/NavBarUser'
import '../../../Other_component/Page.css'
import './ListeCollaborateurFront.css'
import Modal from 'react-modal'
import ViewCollaborateur from '../ViewCollaborateurFront/ViewCollaborateur';



const ListeCollaborateurFront = () => {
    //Pour les recherches globales 
    const [recherche, setRecherche] = useState('');
    const [globalSearchResults, setGlobalSearchResults] = useState([]);



    //pour les filtres
    const [recherchematricule, setRechercheMatricule] = useState('null');
    const [rechercheposte, setRecherchePoste] = useState('null');
    const [recherchedepartement, setRechercheDepartement] = useState('null');
    const [recherchesite, setRecherchesite] = useState('null');

    //pour la liste des collaborateurs
    const [listCollab, setListeCollab] = useState([]);

    const fetchCollaborateur = () => {
        axios.get('http://localhost:4000/api/compte_collaborateur/liste_collaborateur')
            .then(res => { setListeCollab(res.data)})
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchCollaborateur();
    }, [])


    // Pour les recherches globales 
    const handleInputChange = (event) => {
        setRecherche(event.target.value);
    }

    const handleSearch = () => {
        // setGlobalSearchResults(allCollab)
        console.log(listCollab)
        const filteredCollab = listCollab.filter(collab => {
            return (
               (collab.matricule.toLowerCase().includes(recherche.toLowerCase())) ||
               (collab.nom.toLowerCase().includes(recherche.toLowerCase())) ||
               (collab.prenom.toLowerCase().includes(recherche.toLowerCase())) ||
               (collab.poste.toLowerCase().includes(recherche.toLowerCase())) ||
               (collab.departement.toLowerCase().includes(recherche.toLowerCase())) ||
               (collab.email.toLowerCase().includes(recherche.toLowerCase())) ||
               (collab.site.toLowerCase().includes(recherche.toLowerCase()))
            )
        })
        console.log(filteredCollab)
      
        setGlobalSearchResults(filteredCollab)
    }

    //Pour les filtres rapides
    if (recherchematricule === '') {
        setRechercheMatricule('null')
    }
    if (rechercheposte === '') {
        setRecherchePoste('null')
    }
    if (recherchedepartement === '') {
        setRechercheDepartement('null')
    }
    if (recherchesite === '') {
        setRecherchesite('null')
    }

    //Pour les paginations
    const [currentPage, setCurrentPage] = useState(1)
    const itempsPerPage = 30;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itempsPerPage;
        const endIndex = startIndex + itempsPerPage;
        setGlobalSearchResults(listCollab.slice(startIndex, endIndex));
    }, [listCollab, currentPage])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }


    const totalPages = Math.ceil(listCollab.length / itempsPerPage)

    //Pour l'affichage des collaborateurs 
    const [collabToView, setCollabToView] = useState(null);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);

    const openViewModal = () => {
        setIsModalViewOpen(true)
    }

    const closeViewModal = () => {
        setIsModalViewOpen(false)
    }

    
    const ViewModal = (collabId) => {
        const selectedCollaborateur = listCollab.find((collaborateur) => collaborateur.id === collabId)
        setCollabToView(selectedCollaborateur)
    }



    return (
        <div className="page">
            <NavBarUser />
            <div className="content">
                <div className="main-content">
                    <div className="bg-black rounded-lg p-5">
                        <Typography variant="h1" className="text-white text-center text-3xl p-5">Les collaborateurs aux seins de Sahaza Group</Typography>
                        <div className="m-5">
                            <div className="flex flex-row items-center search_form m-5 p-5">
                                <input type="text" value={recherche} onChange={handleInputChange} placeholder="Rechercher un collaborateur" ></input>
                                {recherche && (
                                    <button onClick={() => setRecherche('')} className="search_clearButton">X</button>
                                )}
                                <button onClick={handleSearch} className="search_Button" >Rechercher </button>
                            </div>
                            <div className="m-5 bg-white rounded-lg" >
                                <Card className="w-full p-5">
                                    <CardHeader variant="gradient" floated={false} className="border-none">
                                        <Typography variant="h6" className="text-center " >Rechercher par </Typography>
                                    </CardHeader>
                                    <CardBody className="flex flex-row p-5 liste_filtre_input">
                                        <Input type='text' label="Matricule" onChange={(e) => setRechercheMatricule(e.target.value)} />
                                        <Input type='text'  label="Poste" onChange={(e) => setRecherchePoste(e.target.value)} />
                                        <Input type='text'  label="Département" onChange={(e) => setRechercheDepartement(e.target.value)} />
                                        <Input type='text'  label="Site" onChange={(e) => setRecherchesite(e.target.value)} />
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="m-5 p-5 bg-white grid grid-cols-12 rounded-lg">
                                {recherche === '' ? (listCollab.filter(collaborateur => (
                                    (recherchematricule === 'null' || collaborateur.matricule.toLowerCase().includes(recherchematricule.toLowerCase())) &&
                                    (rechercheposte === 'null' || (collaborateur.poste.toLowerCase().includes(rechercheposte.toLowerCase()))) &&
                                    (recherchedepartement === 'null' || collaborateur.departement.toLowerCase().includes(recherchedepartement.toLowerCase())) &&
                                    (recherchesite === 'null' || collaborateur.site.toLowerCase().includes(recherchesite.toLowerCase()))
                                )).map((collab,index) => (
                                    <div key={index} className="col-span-4 cursor-pointer" onClick={()=> {ViewModal(collab.id); openViewModal()}}>
                                        <div  className="flex flex-row " >
                                            <Avatar src={`http://localhost:4000/${collab.image}`} alt={collab.nom} size="xxl" className="m-3" />
                                            <div className="flex flex-col justify-center">
                                                <Typography variant="h6">{collab.prenom} {collab.nom}</Typography>
                                                <Typography variant="h6">{collab.matricule} </Typography>
                                                <Typography variant='small'>{collab.poste}</Typography>
                                                <Typography variant="small">{collab.departement}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                ))) : (
                                    globalSearchResults.filter(collaborateur => (
                                        (recherchematricule === 'null' || collaborateur.matricule.toLowerCase().includes(recherchematricule.toLowerCase())) &&
                                        (rechercheposte === 'null' || collaborateur.poste.toLowerCase().includes(rechercheposte.toLowerCase())) &&
                                        (recherchedepartement === 'null' || collaborateur.departement.toLowerCase().includes(recherchedepartement.toLowerCase())) &&
                                        (recherchesite === 'null' || collaborateur.site.toLowerCase().includes(recherchesite.toLowerCase()))
                                    )).map((collab,index) => (
                                        <div  key={index} className="col-span-4 cursor-pointer"  onClick={()=> {ViewModal(collab.id); openViewModal()}}>
                                        <div className="flex flex-row ">
                                            <Avatar src={`http://localhost:4000/${collab.image}`} alt={collab.nom} size="xxl" className="m-3" />
                                            <div className="flex flex-col justify-center">
                                                <Typography variant="h6">{collab.prenom} {collab.nom}</Typography>
                                                <Typography variant="h6">{collab.matricule} </Typography>
                                                <Typography variant='small'>{collab.poste}</Typography>
                                                <Typography variant="small">{collab.departement}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                    ))
                                )}
                            </div>
                            <div className="list_pagination flex justify-center">
                                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                    <button
                                        key={`page-${page}`}
                                        className={page === currentPage ? "active" : ""}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div>
                        <Modal 
                            isOpen = {isModalViewOpen}
                            onRequestClose = {closeViewModal}
                            style = {
                                {
                                    content : {
                                        width : '450px',
                                        height : '400px',
                                        margin : 'auto', 
                                        padding : '10px',
                                    }
                                }
                            }
                            className = "flex flex-col items-center" 
                        >
                            <ViewCollaborateur CollabToView={collabToView}/>
                            
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListeCollaborateurFront
