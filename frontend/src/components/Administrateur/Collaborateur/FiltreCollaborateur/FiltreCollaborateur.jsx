import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import ModifCollab from '../ModifCollaborateur/ModifCollab';
import ViewCollaborateur from '../ViewCollaborateur/ViewCollaborateur';
import { MdEdit } from 'react-icons/md';
import { GrView } from 'react-icons/gr';

const FiltreCollaborateur = ({ filteredValue, onFilterChange }) => {
    //Pour récupérer les données
    const [data, setData] = useState([]);

    //Pour filter les données
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get("http://192.168.16.244:4003/api/collaborateur/all_collaborateurs")
            .then((response) => {
                setData(response.data)

            })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    console.log(data)

    

    useEffect(() => {
        const filtered = data.filter((collaborateur) => {
            const matricule = collaborateur.matricule?.toString().toLowerCase();
            const nom = collaborateur.nom?.toString().toLowerCase();
            const prenom = collaborateur.prenom?.toString().toLowerCase();
            const poste = collaborateur.poste?.toString().toLowerCase();
            const departement = collaborateur.departement?.toLowerCase();
     

        return (
            matricule.includes(filteredValue.matricule?.toLowerCase) &&
            nom.includes(filteredValue.nom?.toLowerCase) &&
            prenom.includes(filteredValue.prenom?.toLowerCase) &&
            poste.includes(filteredValue.poste?.toLowerCase) &&
            departement.includes(filteredValue.departement?.toLowerCase)
        );
    })
    setFilteredData(filtered);

    }, [filteredValue, data])

    //Pour la pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const [currentCollab, setCurrentCollab] = useState([])


    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentCollab(filteredData.slice(startIndex, endIndex));
    }, [filteredData, currentPage])


    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    //pour la modification des collaborateur
    const [collabToEdit, setCollabToEdit] = useState(null);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const openEditModal = () => {
        setIsModalEditOpen(true)
    }

    const CloseEditModal = () => {
        setIsModalEditOpen(false)
    }

    const EditCollab = (collaborateurId) => {
        const selectedCollaborateur = filteredData.find((collaborateur) => collaborateur.id === collaborateurId)
        setCollabToEdit(selectedCollaborateur)
    }

    //Pour l'affichage de collaborateur
    const [collabToView, setCollabToView] = useState(null);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);

    const openViewModal = () => {
        setIsModalViewOpen(true)
    }

    const closeViewModal = () => {
        setIsModalViewOpen(false)
    }

    const ViewCollab = (collabId) => {
        const selectedCollaborateur = filteredData.find((collaborateur) => collaborateur.id === collabId)
        setCollabToView(selectedCollaborateur)
    }




    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr >
                            <th></th>
                            <th>Numéro matricule</th>
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
                            <td><input type='text' id='filtre' className="add-input" placeholder="matricule" value={filteredValue.matricule} onChange={(e) => onFilterChange({ ...filteredValue, matricule: e.target.value })} /></td>
                            <td><input type='text' id='filtre' className="add-input" placeholder="nom"  value={filteredValue.nom} onChange={(e) => onFilterChange({ ...filteredValue, nom: e.target.value })} /></td>
                            <td><input type='text' id='filtre' className="add-input" placeholder="prenom"   value={filteredValue.prenom} onChange={(e) => onFilterChange({ ...filteredValue, prenom: e.target.value })} /></td>
                            <td><input type='text' id='filtre' className="add-input" placeholder="poste"   value={filteredValue.poste} onChange={(e) => onFilterChange({ ...filteredValue, poste: e.target.value })} /></td>
                            <td><input type='text' id='filtre' className="add-input" placeholder="departement"   value={filteredValue.prenom}  onChange={(e) => onFilterChange({ ...filteredValue, departement: e.target.value })} /></td>
                        </tr>
                        {currentCollab.length === 0 ? (
                            <tr>
                                <td>Collaborateur non trouvé</td>
                            </tr>
                        ) : (
                            currentCollab.map((collaborateur) => (
                                <tr key={collaborateur.id}>
                                    <td>{collaborateur.matricule}</td>
                                    <td>{collaborateur.nom}</td>
                                    <td>{collaborateur.prenom}</td>
                                    <td>{collaborateur.titrePoste}</td>
                                    <td>{collaborateur.departement}</td>
                                    <td className="CollabEdit_Button">
                                        <button onClick={() => { EditCollab(collaborateur.id); openEditModal() }}><MdEdit /></button>
                                        <button onClick={() => { ViewCollab(collaborateur.id); openViewModal() }}><GrView /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        className={page === currentPage ? "active" : ""}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}
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
                    isOpen={isModalEditOpen}
                    onRequestClose={CloseEditModal}
                    style={{
                        content: {
                            width: '1000px',
                            height: '700px',
                            borderRadius: '10px',
                            margin: 'auto',
                            top: '0',
                            bottom: '0',
                            left: '0',
                            right: '0',
                        }
                    }}
                >
                    <h2 className="font-bold text-2xl text-center font-['Poppins']">Modifier un collaborateur</h2>
                    <ModifCollab CollabToEdit={collabToEdit} onCollabUpdated={EditCollab} />
                    <button onClick={CloseEditModal}>Retourner à la liste des collaborateurs</button>
                </Modal>
            </div>
            <div className="collabView_Modal">
                <Modal
                    isOpen={isModalViewOpen}
                    onRequestClose={closeViewModal}
                    style={
                        {
                            content: {
                                width: '800px',
                                height: '650px',
                                borderRadius: '10px',
                                margin: 'auto',
                                top: '0',
                                bottom: '0',
                                left: '0',
                                right: '0',
                            }
                        }
                    }
                >
                    <ViewCollaborateur CollabToView={collabToView} />
                    <button onClick={closeViewModal} className="collabView_Modal_closeBtn">Retourner à la liste des collaborateurs</button>
                </Modal>

            </div>
        </>
    )
}

export default FiltreCollaborateur
