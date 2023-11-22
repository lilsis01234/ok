import React, { useState, useEffect } from 'react'
import { MdEdit } from 'react-icons/md';

import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListePoste.css'
import AjoutPoste from '../AjoutPoste/AjoutPoste';
import Modal from 'react-modal';
import ModifPoste from '../FormulairePoste/ModifPoste.jsx';
import { ListItem } from '@material-tailwind/react'


Modal.setAppElement('#root');


const ListePoste = () => {
    const [listePoste, setListePoste] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPoste, setFilteredPoste] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5;


    //Pour le formulaire Ajout
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    //Pour la modification du formulaire
    const [posteToEdit, setPosteToEdit] = useState(null);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const openEditModal = () => {
        setIsModalEditOpen(true)
    }

    const CloseEditModal = () => {
        setIsModalEditOpen(false);
    }

    //pour mettre à jour les postes
    const EditPoste = (posteId) => {
        const selectedPoste = listePoste.find((poste) => poste.id === posteId)
        setPosteToEdit(selectedPoste)
    }


    //Pour le formulaire de recherche globale
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearch = () => {
        setFilteredPoste(listePoste)
        const newFilteredPoste = listePoste.filter((poste) => {
            const titrePosteLowerCase = poste.titrePoste.toLowerCase();
            const searchTermLowerCase = searchTerm.toLowerCase();
            
            if (poste.departement && poste.departement.length > 0) {
                const nomDepartementsLowerCase = poste.departement.map((dept) =>
                  (dept.nomDepartement || '').toLowerCase()
                );

                return (
                    titrePosteLowerCase.includes(searchTermLowerCase) ||
                    nomDepartementsLowerCase.some((dept) => dept.includes(searchTermLowerCase))
                  );
            }

         
            return titrePosteLowerCase.includes(searchTermLowerCase);
        })

        setFilteredPoste(newFilteredPoste);
        
    }

    //Récupération de la liste des postes 
    const fetchPoste = () => {
        axios.get('http://localhost:4000/api/poste/all')
            .then((res) => {
                setListePoste(res.data)
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchPoste();
    }, []);

   




    //Pour gérer la pagination
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setFilteredPoste(listePoste.slice(startIndex, endIndex));
    }, [listePoste, currentPage])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const totalPages = Math.ceil(listePoste.length / itemsPerPage)



    //Pour mettre à jour la liste après l'ajout
    const handleAddPost = () => {
        fetchPoste();
    }

    //Pour mettre à jour la liste après mise à jour
    const handleUpdatePoste = () => {
        setPosteToEdit(null);
        fetchPoste();
    }

    return (
        <>

            <div className="listePoste">
                <h1 className=" m-5 font-bold text-2xl listePoste_title">Listes de postes </h1>
                <div className="listePoste_tools">
                    <div className="search_form">
                        <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Rechercher un poste" className="search_input" />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="search_clearButton">X</button>
                        )}
                        <button onClick={handleSearch} className="search_Button"> Rechercher </button>
                        <Link className="listPoste_link" onClick={openModal} >Ajouter un nouveau poste</Link>
                    </div>



                </div>
                <div className="w-full h-full collabListe_table">
                <table className=" w-full min-w-max table-auto text-left">
                    <thead className="border-b border-blue-gray-100 bg-blue-gray-50  p-4">
                        <tr >
                            <th className="w-15">N°</th>
                            <th>Poste</th>
                            <th>Département</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchTerm === '' ? (listePoste.map(poste => (
                            <tr key={poste.id} className="even:bg-blue-gray-50/50">
                                <td className="w-15 ">{poste.id}</td>
                                <td >{poste.titrePoste}</td>
                                <td >
                                    {(poste.departement).map(departement => (
                                       <div  key={departement.id} > 
                                        <ListItem className="flex flex-col items-center cursor-default">{departement.nomDepartement}</ListItem>
                                        </div>
                                    ))}
                                </td>
                                <td className="w-20">
                                    <button className="flex listePoste_EditButton" onClick={() => { EditPoste(poste.id); openEditModal() }}><MdEdit /> Modifier </button>
                                </td>
                            </tr>

                        ))) : (
                            filteredPoste.map((poste) => (
                                <tr key={poste.id}>
                                    <td className="w-15">{poste.id}</td>
                                    <td>{poste.titrePoste}</td>
                                    <td>
                                        {(poste.departement).map(departement => (
                                            <ListItem key={departement.id}  className="flex flex-col items-center cursor-default">{departement.nomDepartement}</ListItem>
                                        ))}
                                    </td>
                                    <td>
                                        <button className="flex listePoste_EditButton" onClick={() => { EditPoste(poste.id); openEditModal() }}><MdEdit /> Modifier </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                </div>
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
            <div className="modal_AddForm">
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    style={{
                        content: {
                            width: '800px',
                            height: '700px',
                            borderRadius: '10px',
                            margin: 'auto',
                            top: '0',
                            bottom: '0',
                            left: '0',
                            right: '0',
                        }
                    }}>
                    <h2 className="font-bold text-xl font-['Poppins'] modal_AddForm_Title">Ajouter un poste</h2>
                    <AjoutPoste onPosteAdded={handleAddPost} />
                    <button onClick={closeModal} className="closeModal">Retourner à la liste des Postes </button>
                </Modal>
            </div>
            <div className="modal_EditForm">
                <Modal
                    isOpen={isModalEditOpen}
                    onRequestClose={CloseEditModal}
                    style={{
                        content: {
                            width: '800px',
                            height: '700px',
                            borderRadius: '10px',
                            margin: 'auto',
                            top: '0',
                            bottom: '0',
                            left: '0',
                            right: '0',
                        }
                    }}>
                    <h2 className="modal_AddForm_Title"> Modifier une poste</h2>
                    <ModifPoste posteToEdit={posteToEdit} onPosteUpdated={handleUpdatePoste} />
                    <button onClick={CloseEditModal} className='closeModal'>Retourner à la liste des postes</button>
                </Modal>
            </div>
        </>
    )
}

export default ListePoste
