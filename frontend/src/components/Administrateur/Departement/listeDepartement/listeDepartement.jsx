import axios from "axios";
import React, { useEffect, useState } from "react";
import {MdEdit} from 'react-icons/md'
import {MdOutlineDeleteForever} from 'react-icons/md'
import './listeDepartement.css'

const ListDepartement = () => {
    const [departementList, setDepartementList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDepartement, setFilteredDepartement] = useState([]);

    //Pöur la pagination
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

  
    return (
       <div className="listDepartement">
        <h2 className="listDepartement_title">Liste des Départements </h2>
        <div className="listDepartement_search">
            <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Rechercher un département"/>
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
                {searchTerm === '' ? (departementList.map((departement)=> (
                    <tr key={departement.id}>
                        <td>{departement.id}</td>
                        <td>{departement.nomDepartement}</td>
                        <td>
                            <button className="table_item_icon"><MdEdit/></button>
                            <button className="table_item_icon"><MdOutlineDeleteForever/></button>
                        </td>
                    </tr>
                ))) : (
                filteredDepartement.map((departement) => (
                    <tr key={departement.id}>
                        <td>{departement.id}</td>
                        <td>{departement.nomDepartement}</td>
                        <td>
                            <button className="table_item_icon"><MdEdit/></button>
                            <button className="table_item_icon"><MdOutlineDeleteForever/></button>
                        </td>
                    </tr>
                ))
            )}
            </tbody>
        </table>
        <div className="listDepartement_pagination">
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
    )
}

export default ListDepartement;