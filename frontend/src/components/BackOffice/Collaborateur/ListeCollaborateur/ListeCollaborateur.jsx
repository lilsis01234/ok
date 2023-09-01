import React, { useEffect, useState} from 'react'
import NavBarAdmin from '../../NavBar/NavBarAdmin'
import SideBar from '../../SideBarAdmin/SideBar'
import axios from 'axios'
import './ListeCollaborateur.css'
import { Link } from 'react-router-dom'
import { MdEdit, MdOutlineDeleteForever } from 'react-icons/md'
import { GrView } from 'react-icons/gr'
import ModifCollab from '../ModifCollaborateur/ModifCollab'
import Modal from 'react-modal'
import ViewCollaborateur from '../ViewCollaborateur/ViewCollaborateur'
import { Avatar} from '@material-tailwind/react'
import ArchiveCollaborateur from '../ArchiveCollaborateur/ArchiveCollaborateur'


Modal.setAppElement('#root');


const ListeCollaborateur = () => {

  //recherche globale 
  const [recherche, setRecherche] = useState('');
  const [allCollab, setAllCollab] = useState('');

  //pour les filtres 
  const [recherchenom, setRechercheNom] = useState('null');
  const [rechercheprenom, setRecherchePrenom] = useState('null');
  const [recherchedatenaissance, setRechercheDatedeNaissance] = useState('null');
  const [recherchematricule, setRechercheMatricule] = useState('null');
  const [rechercheadresse, setRechercheAdresse] = useState('null');
  const [rechercheposte, setRecherchePoste] = useState('null');
  const [recherchedepartement, setRechercheDepartement] = useState('null');
  const [recherchetelephone, setRechercheTelephone] = useState('null');
  


  //pour la lite des collaborateurs 
  const [listeCollab, setListCollab] = useState([]);
  const [globalSearchResults, setGlobalSearchResults] = useState([]);


    //Récupération de la liste des collaborateurs
    const fetchCollaborateur = () => {
      axios.get('http://localhost:4001/api/collaborateur/all')
        .then(res => {setListCollab(res.data); setAllCollab(res.data)})
        .catch(err => console.log(err));
    }
    
    useEffect(() => {
      fetchCollaborateur();
    }, [])

   



  //Pour les recherches globales
  const handleInputChange = (event) => {
    setRecherche(event.target.value);
  }

  const handleSearch = () => {
    setGlobalSearchResults(allCollab)
    const filteredCollab = allCollab.filter(collab => {
      return (
        (collab.matricule.toLowerCase().includes(recherche.toLowerCase())) ||
        (collab.nom.toLowerCase().includes(recherche.toLowerCase())) ||
        (collab.prenom.toLowerCase().includes(recherche.toLowerCase())) ||
        (collab.poste1.titrePoste.toLowerCase().includes(recherche.toLowerCase())) ||
        (collab.departement1.nomDepartement.toLowerCase().includes(recherche.toLowerCase())) 
      )
    })

    setGlobalSearchResults(filteredCollab);
  }

  
  

  //Pour les filtres rapides
  if (recherchenom === '') {
    setRechercheNom('null')
  }
  if (rechercheprenom === '') {
    setRecherchePrenom('null')
  }
  if (recherchedatenaissance === '') {
    setRechercheDatedeNaissance('null')
  }
  if (recherchematricule === '') {
    setRechercheMatricule('null')
  }
  if (rechercheadresse === '') {
    setRechercheAdresse('null')
  }
  if (rechercheposte === '') {
    setRecherchePoste('null')
  }
  if (recherchedepartement === '') {
    setRechercheDepartement('null')
  }
  if (recherchetelephone === '') {
    setRechercheTelephone('null')
  }


  //Pour les paginations
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15;

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setGlobalSearchResults(listeCollab.slice(startIndex, endIndex));
  }, [listeCollab, currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const totalPages = Math.ceil(listeCollab.length / itemsPerPage)


    //pour la modification des collaborateurs
    const [collabToEdit, setCollabToEdit] = useState(null);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const openEditModal = () => {
        setIsModalEditOpen(true)
    }

    const CloseEditModal = () => {
        setIsModalEditOpen(false)
    }

    const EditCollab = (collaborateurId)  => {
      const selectedCollaborateur = listeCollab.find((collaborateur) => collaborateur.id === collaborateurId)
      setCollabToEdit(selectedCollaborateur)
    }

    //pour l'affichage des collaborateurs
    const [collabToView, setCollabToView] = useState(null);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);

    const openViewModal = () => {
      setIsModalViewOpen(true)
    }

    const closeViewModal = () => {
      setIsModalViewOpen(false)
    }

    const ViewCollab = (collabId) => {
      const selectedCollaborateur = listeCollab.find((collaborateur) => collaborateur.id === collabId)
      setCollabToView(selectedCollaborateur)
    }

    //Pour supprimer ou archiver un utilisateur
    const [collabToArchive, setCollabToArchive] = useState(null);
    const [isModalArchiveOpen, setIsModalArchiveOpen] = useState(false);
    
    const OpenArchiveModel = () => {
      setIsModalArchiveOpen(true)
    }

    const CloseArchiveModal = () => {
      setIsModalArchiveOpen(false)
    }

    const ArchiveCollab = (collabId) => {
      const selectedCollaborateur = listeCollab.find((collaborateur) => collaborateur.id === collabId)
      setCollabToArchive(selectedCollaborateur)
    }

    

   



  return (
    <div className="page">
      <NavBarAdmin/>
      <div className="content">
        <SideBar/>
        <div className="main-content">
          <div className="collabListes">
            <h1 className="collabListes_title font-bold">Liste des Collaborateurs</h1>
            <div className="collabListes_Item">
                <div className="search_form">
                  <input type="text" value={recherche} onChange={handleInputChange} placeholder="Rechercher un collaborateur" className=""></input>
                  {recherche && (
                    <button onClick={() => setRecherche('')} className="search_clearButton">X</button>
                  )}
                  <button onClick={handleSearch} className="search_Button"> Rechercher </button>
                  <Link to="/admin/collaborateur/add" className="AddCollab_Link">Ajouter un nouveau collaborateur</Link>
                </div>
            </div>
            <div className="w-full h-full collabListe_table">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr >
                    <th></th>
                    <th>Matricule</th>
                    <th>Nom</th>
                    <th>Prenoms</th>
                    <th>Poste</th>
                    <th>Departement</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td><input type='text' id='filtre' className="add-input" placeholder="matricule" onChange={(e) => setRechercheMatricule(e.target.value)} /></td>
                    <td><input type='text' id='filtre' className="add-input" placeholder="nom" onChange={(e) => setRechercheNom(e.target.value)} /></td>
                    <td><input type='text' id='filtre' className="add-input" placeholder="prenom" onChange={(e) => setRecherchePrenom(e.target.value)} /></td>
                    <td><input type='text' id='filtre' className="add-input" placeholder="poste" onChange={(e) => setRecherchePoste(e.target.value)} /></td>
                    <td><input type='text' id='filtre' className="add-input" placeholder="departement" onChange={(e) => setRechercheDepartement(e.target.value)} /></td>
                    <td></td>
                  </tr>
                  {recherche === '' ? (listeCollab.filter(collaborateur => (
                    (recherchematricule === 'null' || collaborateur.matricule.toLowerCase().includes(recherchematricule.toLowerCase())) && 
                    (recherchenom === 'null' || collaborateur.nom.toLowerCase().includes(recherchenom.toLowerCase())) &&
                    (rechercheprenom === 'null' || collaborateur.prenom.toLowerCase().includes(rechercheprenom.toLowerCase())) &&
                    (rechercheposte === 'null' || collaborateur.poste1.titrePoste.toLowerCase().includes(rechercheposte.toLowerCase())) &&
                    (recherchedepartement === 'null' || collaborateur.departement1.nomDepartement.toLowerCase().includes(recherchedepartement.toLowerCase()))
                  )).map(collaborateur => (
                      <tr key={collaborateur.id}>
                          <td><Avatar src={`http://localhost:4001/${collaborateur.image}`} alt={collaborateur.nom}  size="xs" className="rounded-full w-16 h-16 object-cover"/></td>
                          <td>{collaborateur.matricule}</td>
                          <td>{collaborateur.nom}</td>
                          <td>{collaborateur.prenom}</td>
                          <td>{collaborateur.poste1.titrePoste}</td>
                          <td>{collaborateur.departement1.nomDepartement}</td>
                          <td className="CollabEdit_Button">
                            <button onClick={() => {EditCollab(collaborateur.id) ; openEditModal()}}><MdEdit/></button>
                            <button onClick={() => {ViewCollab(collaborateur.id); openViewModal()}}><GrView/></button>
                            <button onClick={() => {ArchiveCollab(collaborateur.id); OpenArchiveModel()}}><MdOutlineDeleteForever/></button>
                          </td>
                      </tr>
                  ))) : (
                    globalSearchResults.filter(collaborateur => (
                      (recherchematricule === 'null' | collaborateur.matricule.toLowerCase().includes(recherchematricule.toLowerCase())) && 
                      (recherchenom === 'null' | collaborateur.nom.toLowerCase().includes(recherchenom.toLowerCase())) &&
                      (rechercheprenom === 'null' | collaborateur.prenom.toLowerCase().includes(rechercheprenom.toLowerCase())) &&
                      (rechercheposte === 'null' | collaborateur.poste1.titrePoste.toLowerCase().includes(rechercheposte.toLowerCase())) &&
                      (recherchedepartement === 'null' |  collaborateur.departement1.nomDepartement.toLowerCase().includes(recherchedepartement.toLowerCase())) 
                    )).map(collaborateur => (
                      <tr key={collaborateur.id}>
                          <td><Avatar src={`http://localhost:4001/${collaborateur.image}`} alt={collaborateur.nom} className="rounded-full w-16 h-16 object-cover"/></td>
                          <td>{collaborateur.matricule}</td>
                          <td>{collaborateur.nom}</td>
                          <td>{collaborateur.prenom}</td>
                          <td>{collaborateur.poste1.titrePoste}</td>
                          <td>{collaborateur.departement1.nomDepartement}</td>
                          <td className="CollabEdit_Button">
                            <button onClick={() => {EditCollab(collaborateur.id) ; openEditModal()}}><MdEdit/></button>
                            <button onClick={() => {ViewCollab(collaborateur.id); openViewModal()}}><GrView/></button>
                            <button><MdOutlineDeleteForever/></button>
                            </td>
                      </tr>))
                  )}
                </tbody>
              </table>
            </div>
            <div className="list_pagination">
                  {Array.from({length : totalPages}, (_, index) => index + 1).map((page) => (
                    <button
                      key={page}
                      className={page === currentPage ? "active" : ""}
                      onClick={() => handlePageChange(page)}
                      >
                          {page}
                    </button>
                  ))}
            </div>
            <div className="CollabEdit_Modal">
              <Modal
                isOpen = {isModalEditOpen}
                onRequestClose = {CloseEditModal}
                style = {{
                  content : {
                    width : '1000px',
                    height : '800px',
                    borderRadius : '10px',
                    margin: 'auto',
                    top : '0',
                    bottom : '0',
                    left : '0',
                    right : '0',
                  }
                }}
              >
                  <h2 className="font-bold text-2xl text-center font-['Poppins']">Modifier un collaborateur</h2>
                  <ModifCollab CollabToEdit={collabToEdit}  onCollabUpdated={EditCollab}/>
                  <button onClick={CloseEditModal}>Retourner à la liste des collaborateurs</button>
              </Modal>
            </div>
            <div className="collabView_Modal">
              <Modal
                isOpen = {isModalViewOpen}
                onRequestClose = {closeViewModal}
                style = {
                  {
                    content : {
                      width : '800px',
                      height : '650px',
                      borderRadius : '10px',
                      margin : 'auto',
                      top : '0',
                      bottom : '0',
                      left : '0',
                      right : '0',
                    }
                  }
                }
              >
                  <ViewCollaborateur CollabToView={collabToView}/>
                  <button onClick={closeViewModal} className="collabView_Modal_closeBtn">Retourner à la liste des collaborateurs</button>
              </Modal>

            </div>
            <div>
              <Modal
                isOpen = {isModalArchiveOpen}
                onRequestClose = {CloseArchiveModal}
                style = { {
                  content : {
                    width : '400px',
                    height : '500px',
                    borderRadius : '10px',
                    margin : 'auto',
                    top: '0',
                    bottom : '0', 
                    left : '0', 
                    right : '0'
                  }
                }
              }
              >
                <h2 className="font-bold text-2xl text-center font-['Poppins']">Supprimer un collaborateur</h2>
                <ArchiveCollaborateur CollabToArchive={collabToArchive}/>
              </Modal>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListeCollaborateur
