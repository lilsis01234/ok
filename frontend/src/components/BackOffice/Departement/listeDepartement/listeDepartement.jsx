import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdEdit } from 'react-icons/md'
import { Typography, Button} from "@material-tailwind/react";
import './listeDepartement.css'
import AjoutDepartement from "../AjoutDepartement/AjoutDepartement";
import Modal from 'react-modal';
import ModifDepartement from "../ModifDepartement/ModifDepartement";

Modal.setAppElement('#root');



const ListDepartement = () => {
    const [departementList, setDepartementList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDepartement, setFilteredDepartement] = useState([]);

    //Pour la pagination
    const [currentPage, setCurrentPage] = useState(1);
    // Nombre d'éléments par page 
    const itemsPerPage = 15;

    //Pour le formulaire Ajout
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    const fetchDepartement = () => {
        axios.get("http://localhost:4000/api/departement/all")
        .then((response) => {
            setDepartementList(response.data);
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération des données:', err)
        })
    }

    useEffect(() => {
        fetchDepartement()
    }, [])


    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setFilteredDepartement(departementList.slice(startIndex, endIndex));
    }, [departementList, currentPage])



    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearch = () => {
        const filteredDepartement = departementList.filter((departement) => {
            return (
                (departement.nomDepartement.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (departement.Direction?.nomDirection.toLowerCase().includes(searchTerm.toLowerCase()))) })

        setFilteredDepartement(filteredDepartement);
        setCurrentPage(1);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    //Rafraîchir la liste après l'ajout des postes
    const handleAddDepartement = () => {
        fetchDepartement()
    }

    //Calculer le nombre total de pages 
    const totalPages = Math.ceil(departementList.length / itemsPerPage);


    //Pour le modification du formulaire
    const [departementToEdit, setDepartementToEdit] = useState(null);
    const [isModalEditOpen, setisModalEditOpen] = useState(false)

    const openEditModal = () => {
        setisModalEditOpen(true)
    }

    const CloseEditModal = () => {
        setisModalEditOpen(false)
    }

    const EditDepartement = (departementId) => {
        const selectedDepartement = departementList.find((departement) => departement.id === departementId)
        setDepartementToEdit(selectedDepartement)
    }

    const handleDepartementUpdate = () => {
        setDepartementToEdit(null)
        fetchDepartement();
    }

    


    return (
        <>
        <div className="flex flex-col items-center w-full font-[Poppins]">
            <Typography variant="h2" className="p-5">Liste des Départements </Typography>
            <div className="search_form">
                <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Rechercher un département" />
                {searchTerm && (
                    <button className="search_clearButton" onClick={() => setSearchTerm('')}>X</button>
                )}
                <button className="search_Button mx-5" onClick={handleSearch} >Rechercher </button>
                <Button variant="filled" onClick={openModal}>Ajouter un departement</Button>
            </div>
            <table className="m-10 p-5 w-full">
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Département</th>
                        <th>Direction</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {searchTerm === '' ? (departementList.map((departement) => (
                        <tr key={departement.id}>
                            <td>{departement.id}</td>
                            <td>{departement.nomDepartement}</td>
                            <td>{departement.Direction?.nomDirection}</td>
                            <td>
                                <button className="flex flex-row items-center content-center" onClick={() => {EditDepartement(departement.id); openEditModal()}} ><MdEdit /> Modifier </button>
                            </td>
                        </tr>
                    ))) : (
                        filteredDepartement.map((departement) => (
                            <tr key={departement.id}>
                                <td>{departement.id}</td>
                                <td>{departement.nomDepartement}</td>
                                <td>{departement.Direction?.nomDirection}</td>
                                <td className="w-20">
                                    <button className="flex flex-row items-center content-center" onClick={() => {EditDepartement(departement.id); openEditModal()}}><MdEdit /> Modifier </button>

                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="list_pagination">
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
        </div>
        <div>
            <Modal
            isOpen = {isModalOpen}
            onRequestClose={closeModal}
            style = {
                {
                    content : {
                        width : '400px',
                        height : '380px',
                        borderRaduis : '10px',
                        margin: 'auto',
                        top : '0',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        
                    }
                }
            }
            >
                <AjoutDepartement onDepartementAdded={handleAddDepartement}/>
                <button className="my-5" onClick={closeModal}>Retourner à la liste des départements</button>
            </Modal>
        </div>
        <div>
            <Modal
            isOpen = {isModalEditOpen}
            onRequestClose={CloseEditModal}
            style = {
                {
                    content : {
                        width : '400px',
                        height : '380px',
                        borderRaduis : '10px',
                        margin: 'auto',
                        top : '0',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        
                    }
                }
            }
            >
                <ModifDepartement departementToEdit={departementToEdit} onUpdateDepartement={handleDepartementUpdate}/>
                <button className="my-5" onClick={CloseEditModal}>Retourner à la liste des départements</button>
            </Modal>
        </div>
    </>
    )
}

export default ListDepartement;