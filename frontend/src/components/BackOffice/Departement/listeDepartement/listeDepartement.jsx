import axios from "axios";
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { MdEdit } from 'react-icons/md'
import { Typography, Button} from "@material-tailwind/react";
import './listeDepartement.css'
import AjoutDepartement from "../AjoutDepartement/AjoutDepartement";
import Modal from 'react-modal';
import ModifDepartement from "../ModifDepartement/ModifDepartement";

Modal.setAppElement('#root');



const ListDepartement = () => {
=======
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

>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
    const [departementList, setDepartementList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDepartement, setFilteredDepartement] = useState([]);

<<<<<<< HEAD
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
        axios.get("http://localhost:4001/api/departement/all")
        .then((response) => {
            setDepartementList(response.data);
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération des données:', err)
        })
    }

    useEffect(() => {
        fetchDepartement()
=======
     //Pour la pagination
     const [currentPage, setCurrentPage] = useState(1);
     // Nombre d'éléments par page 
     const itemsPerPage = 15;
 


    useEffect(()=> {
<<<<<<<< HEAD:frontend/src/components/FrontOffice/Departement/ListeDepartement/ListeDepartement.jsx
        axios.get("http://localhost:4001/api/departement/all_departement")
========
        axios.get("http://localhost:4001/api/departement/all")
>>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9:frontend/src/components/BackOffice/Departement/listeDepartement/listeDepartement.jsx
        .then((response) => {
             setDepartementList(response.data);
        })
        .catch((err)=>{
            console.error('Erreur lors de la récupération des données:', err)
        })
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
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
<<<<<<< HEAD
        const filteredDepartement = departementList.filter((departement) => {
            return (
                (departement.nomDepartement.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (departement.Direction?.nomDirection.toLowerCase().includes(searchTerm.toLowerCase()))) })
=======
        const filteredDepartement = departementList.filter((departement) => 
            departement.nomDepartement.toLowerCase().includes(searchTerm.toLowerCase())
        )
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9

        setFilteredDepartement(filteredDepartement);
        setCurrentPage(1);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

<<<<<<< HEAD
    //Rafraîchir la liste après l'ajout des postes
    const handleAddDepartement = () => {
        fetchDepartement()
    }

=======
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
    //Calculer le nombre total de pages 
    const totalPages = Math.ceil(departementList.length / itemsPerPage);


<<<<<<< HEAD
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
=======
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
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
