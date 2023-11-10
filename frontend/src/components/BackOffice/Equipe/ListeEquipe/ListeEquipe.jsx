import { Typography, Button} from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md';
import Modal from 'react-modal';
import AjoutEquipe from '../AjoutEquipe/AjoutEquipe';
import ModifierEquipe from '../ModifierEquipe/ModifierEquipe';
Modal.setAppElement('#root');

const ListeEquipe = () => {
    const [listeEquipe, setlListEquipe] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEquipe, setFilteredEquipe] = useState([]);

    //Pour la pagination
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 15;

    const fetchEquipe = () => {
        axios.get("http://localhost:4001/api/equipe/all")
            .then((response) => {
                setlListEquipe(response.data)
            })
            .catch((err) => {
                console.error('Erreur lors de la récupération des données', err)
            })
    }

    console.log(listeEquipe)

    useEffect(() => {
        fetchEquipe()
    }, [])

    //Pagination
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage;
        setFilteredEquipe(listeEquipe.slice(startIndex, endIndex))
    }, [listeEquipe, currentPage])

    //Pour le recherche
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSearch = () => {
        const filteredEquipe = listeEquipe.filter((equipe) => {
            return (
                (equipe.nomEquipe.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (equipe.TestDepartement?.nomDepartement.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        })
        setFilteredEquipe(filteredEquipe)
        setCurrentPage(1);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

      //Calculer le nombre total de pages 
      const totalPages = Math.ceil(listeEquipe.length / itemsPerPage);

      //Pour le formulaire d'ajout
      const [isAddModalOpen, setisAddModalOpen] = useState(false);
      const openAddModal = () => {
        setisAddModalOpen(true)
      }
      const closeAddModal = () => {
        setisAddModalOpen(false)
      }

      const handleAddEquipe = () => {
        fetchEquipe()
      }

      //Pour le formulaire de modification
      const [equipeToEdit, setEquipeToEdit] = useState(null)
      const [isModalEditOpen, setIsModalEditOpen] = useState(false)
      
      const openEditModal = () => {
        setIsModalEditOpen(true)
      }

      const closeEditModal = () => {
        setIsModalEditOpen(false)
      }

      const EditEquipe = (equipeId) => {
        const selectedEquipe = listeEquipe.find((equipe) => equipe.id === equipeId)
        setEquipeToEdit(selectedEquipe)
      }

      const handleEquipeUpdate = () => {
        setEquipeToEdit(null)
        fetchEquipe()
      }


    return (
        <>
            <div className='flex flex-col items-center w-full font-[Poppins]'>
                <Typography variant="h2" className="p-5">Liste des équipes</Typography>
                <div className="search_form">
                    <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Rechercher une équipe" />
                    {searchTerm && (
                        <button className="search_clearButton" onClick={() => setSearchTerm('')}>X</button>
                    )}
                    <button className="search_Button mx-5" onClick={handleSearch} >Rechercher </button>
                    <Button variant="filled" onClick={openAddModal}>Ajouter une équipe</Button> 
                </div>
                <table className="m-10 p-5 w-full">
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Equipe</th>
                            <th>Département</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchTerm === '' ? (listeEquipe.map((equipe) => (
                            <tr key={equipe.id}>
                                <td>{equipe.id}</td>
                                <td>{equipe.nomEquipe}</td>
                                <td>{equipe.TestDepartement?.nomDepartement}</td>
                                <td>
                                    <button onClick={() => {EditEquipe(equipe.id); openEditModal()}}><MdEdit /></button>
                                </td>
                            </tr>
                        ))) : (
                            filteredEquipe.map((equipe) => (
                                <tr key={equipe.id}>
                                    <td>{equipe.id}</td>
                                    <td>{equipe.nomEquipe}</td>
                                    <td>{equipe.TestDepartement?.nomDepartement}</td>
                                    <td>
                                        <button onClick={() => {EditEquipe(equipe.id); openEditModal()}}><MdEdit /></button>
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
                    isOpen = {isAddModalOpen}
                    onRequestClose={closeAddModal}
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
                    <AjoutEquipe onEquipeAdded={handleAddEquipe}/>
                    <button className="my-5" onClick={closeAddModal}>Retourner à la liste des équipes</button>
                </Modal>
            </div>
            <div>
                <Modal
                    isOpen = {isModalEditOpen}
                    onRequestClose={closeEditModal}
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
                    <ModifierEquipe equipeToEdit={equipeToEdit} onUpdateEquipe={handleEquipeUpdate}/>
                    <button className="my-5" onClick={closeAddModal}>Retourner à la liste des équipes</button>
                </Modal>
            </div>
        </>
    )
}

export default ListeEquipe
