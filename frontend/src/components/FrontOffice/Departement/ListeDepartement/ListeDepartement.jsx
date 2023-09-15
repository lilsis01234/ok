import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBarUser from "../../SideBar/SideBarUser";
import NavBarUser from "../../NavBarUser/NavBarUser";
import './listeDepartementUser.css';

const ListDepartementUser = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // const token = Cookies.get('jwt');
        const token = localStorage.getItem('jwt');
        if (!token){
            navigate('/');
        }

        const role = localStorage.getItem('role'); 
        if (!(role === "User")){
            navigate('/home');
        }

    }, [navigate])

    const [departementList, setDepartementList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDepartement, setFilteredDepartement] = useState([]);

     //Pour la pagination
     const [currentPage, setCurrentPage] = useState(1);
     // Nombre d'éléments par page 
     const itemsPerPage = 15;
 


    useEffect(()=> {
        axios.get("http://localhost:4000/api/departement/all_departement")
        .then((response) => {
             setDepartementList(response.data);
        })
        .catch((err)=>{
            console.error('Erreur lors de la récupération des données:', err)
        })
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
    <>
     <div className="page">
       <NavBarUser/>
        <div className="content">
        <SideBarUser/>
        <div className="main-content">
        <div className="departementUser-content">
        <div className="listDepartementUser">
        <h2 className="listDepartement_title">Liste des Départements </h2>
        <div className="search_form" id='search'>
            <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Rechercher un département" className="search_input"/>
             {searchTerm && (
                 <button onClick ={() => setSearchTerm('')} className="search_clearButton">X</button>
                )}
            <button onClick={handleSearch} className="search_Button">Rechercher </button>
        </div>
        <table className="listDepartementUser_table">
            <thead>
                <tr>
                    <th className="w-40">N°</th>
                    <th className="w-80">Département</th>
                    <th className="w-90"></th>
                </tr>
            </thead>
            <tbody>
                {searchTerm === '' ? (departementList.filter((departementList)=> departementList.nomDepartement.toLowerCase()!=='direction').map((departement)=> (
                    <tr key={departement.id}>
                        <td className="w-40">{departement.id}</td>
                        <td className="w-80">{departement.nomDepartement}</td>
                        <td className="w-90">
                            {/* lien '/collaborateur/id_departement' */}
                            <button className="table_item_icon"><Link to={`/userdepartement/collaborateurs/${departement.id}`}>Collaborateurs au département {departement.nomDepartement}</Link></button>
                        </td>
                    </tr>
                ))) : (
                filteredDepartement.filter((departementList)=>departementList.nomDepartement.toLowerCase()!=='direction').map((departement) => (
                    <tr key={departement.id}>
                        <td className="w-40">{departement.id}</td>
                        <td className="w-80">{departement.nomDepartement}</td>
                        <td className="w-90">
                          {/* lien '/collaborateur/id_departement' */}
                          <button className="table_item_icon"><Link to={`/userDepartement/collaborateurs/${departement.id}`}>Collaborateurs au département {departement.nomDepartement}</Link></button>
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
     </div>
    </div>
   </div>
  </div>
  
</>
)
}

export default ListDepartementUser;