import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../NavBar/NavBarAdmin'
import SideBar from '../../SideBarAdmin/SideBar';
import FiltreCollaborateur from '../FiltreCollaborateur/FiltreCollaborateur';

const RechercheCollaborateur = () => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredValue, setFilteredValue] = useState({
        matricule: "",
        nom: "",
        prenom: "",
        poste: "",
        departement: "",
    })


    const handleGlobalSearch = () => {
        const lowerCaseSearchValue = searchValue.toLowerCase();

        setFilteredValue({
            matricule: lowerCaseSearchValue,
            nom: lowerCaseSearchValue,
            prenom: lowerCaseSearchValue,
            poste: lowerCaseSearchValue,
            departement: lowerCaseSearchValue,
        })
    }


    return (
        <div className="page">
            <Navbar />
            <div className="content">
                <SideBar />
                <div className="main-content">
                    <div className="collabListes">
                        <h1 className="collabListes_title font-bold">Liste des Collaborateurs</h1>
                        <div className="collabListes_Item">
                            <div className="search_form">
                                <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Rechercher un collaborateur" className="" />
                                {searchValue && (
                                    <button onClick={() => setSearchValue('')} className="search_clearButton">X</button>
                                )}
                                <button onClick={handleGlobalSearch} className="search_Button"> Rechercher </button>
                                <Link to="/admin/collaborateur/add" className="AddCollab_Link">Ajouter un nouveau collaborateur</Link>
                            </div>
                        </div>
                         <FiltreCollaborateur filteredValue={filteredValue} onFilterChange={setFilteredValue}/>        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RechercheCollaborateur
