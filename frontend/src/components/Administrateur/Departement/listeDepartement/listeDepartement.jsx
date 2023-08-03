import axios from "axios";
import React, { useEffect, useState } from "react";
import {MdEdit} from 'react-icons/md'
import {MdOutlineDeleteForever} from 'react-icons/md'
import FormulaireDepartement from "../Formulaire/FormulaireAjoutDepartement";
import './listeDepartement.css'

const ListDepartement = () => {
    const [departementList, setDepartementList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDepartement, setFilteredDepartement] = useState([]);

    //Pour les formulaire
    const [isEdit, setEdit] = useState(false);
    const [departementToEditID, setDepartementToEditId ] = useState(null);


    //Pour la pagination
    const [currentPage, setCurrentPage] = useState(1);
    // Nombre d'éléments par page 
    const itemsPerPage = 15;



    useEffect(() => {
        axios.get('http://localhost:4000/api/departement/all_departement')
        .then(response => {
            setDepartementList(response.data);
            // setFilteredDepartement(response.data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error)
        })
    }, []);


    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setFilteredDepartement(departementList.slice(startIndex, endIndex));
    }, [departementList, currentPage])




    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearch = () => {
        const filteredDepartement = departementList.filter((departement) => 
            departement.nomDepartement.toLowerCase().includes(searchTerm.toLowerCase())
        )

        setFilteredDepartement(filteredDepartement);
        setCurrentPage(1);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    //Calculer le nombre total de pages 
    const totalPages = Math.ceil(departementList.length / itemsPerPage);


    const handleEditDepartement = (departementId) => {
        setEdit(!isEdit)
        setDepartementToEditId(departementId)
        const selectedDepartement = departementList.find((departement) => departement.id === departementId)
        setDepartementToEditId(selectedDepartement);


    }

    //Fonction pour gérer l'ajout d'un département
    const handleAddDepartement = (newDepartement) => {
        setDepartementList([ ...departementList, newDepartement]);
    }

    const handleUpdateDepartement = (updatedDepartement) => {
        setDepartementList((prevDepartementList) => prevDepartementList.map((departement) => 
            departement.id === updatedDepartement.id ?  updatedDepartement : departement))

        setDepartementToEditId(null);
    }
   
   

  
    return (
    <>
    <div className="listDepartement">
        <h2 className="listDepartement_title">Liste des Départements </h2>
        <div className="search_form">
            <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Rechercher un département" className="search_input"/>
             {searchTerm && (
                 <button onClick ={() => setSearchTerm('')} className="search_clearButton">X</button>
                )}
            <button onClick={handleSearch} className="search_Button">Rechercher </button>
        </div>
        <table className="listDepartement_table">
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Département</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {searchTerm === ' ' ? (departementList.map((departement)=> (
                    <tr key={departement.id}>
                        <td>{departement.id}</td>
                        <td>{departement.nomDepartement}</td>
                        <td>
                            <button className="table_item_icon" onClick={() => handleEditDepartement(departement.id)}><MdEdit/></button>
                            <button className="table_item_icon"><MdOutlineDeleteForever/></button>
                        </td>
                    </tr>
                ))) : (
                filteredDepartement.map((departement) => (
                    <tr key={departement.id}>
                        <td>{departement.id}</td>
                        <td>{departement.nomDepartement}</td>
                        <td>
                            <button className="table_item_icon" onClick={() => handleEditDepartement(departement.id)}><MdEdit/></button>
                            <button className="table_item_icon"><MdOutlineDeleteForever/></button>
                        </td>
                    </tr>
                ))
            )}
            </tbody>
        </table>
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
    </div>
    <FormulaireDepartement 
                isEditing={isEdit} 
                departementToEdit={departementToEditID} 
                onAddDepartement={handleAddDepartement}
                onUpdateDepartement={handleUpdateDepartement}
                setEditing = {setEdit}
                />
    </>
    )
}

export default ListDepartement;