import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'
import './SideBar.css'

function SideBar(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSubmenuCollabOpen, setIsSubmenuCollabOpen] = useState(false);
    const [isSubmenuPosteOpen, setIsSubmenuPosteOpen] = useState(false);
    const [isSubmenuDepartOpen, setIsSubmenuDepartOpen] = useState(false);

    const toogleSideBar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
  
    const toggleSubMenuCollab = () => {
        setIsSubmenuCollabOpen(!isSubmenuCollabOpen)
    }

    const toggleSubMenuPoste = () => {
        setIsSubmenuPosteOpen(!isSubmenuPosteOpen)
    }

    const toggleSubMenuDepartement = () => {
        setIsSubmenuDepartOpen(!isSubmenuDepartOpen)
    }

    return (
        <div className="sideBar_container">
            {isSidebarOpen && (
            <div className={`sideBar ${isSidebarOpen ? 'open' : 'closed'}`}>
                   <ul className="sideBar_menu">
                        <li className="sideBar_menu_item"><Link to="/admin/home">Tableau de bord </Link></li>
                        <li className="sideBar_menu_item"><Link onClick={toggleSubMenuCollab} >Collaborateurs</Link></li>
                     {isSubmenuCollabOpen && (
                        <ul className="sidebar_sousMenu">
                             <li className="sidebar_sousMenu_item"><Link to="/admin/collaborateur/add">Ajouter un Collaborateur</Link></li>
                             <li className="sidebar_sousMenu_item"><Link to="/admin/collaborateur/liste">Liste des Collaborateurs</Link></li>
                        </ul>
                     )}
                     <li className="sideBar_menu_item"><Link to="/admin/poste" onClick={toggleSubMenuPoste} >Postes</Link></li>
                     {/* {isSubmenuPosteOpen && (
                        <ul className="sidebar_sousMenu">
                             <li className="sidebar_sousMenu_item"><Link>Ajouter un Poste </Link></li>
                             <li className="sidebar_sousMenu_item"><Link>Liste des Postes</Link></li>
                        </ul>
                     )} */}
                     <li className="sideBar_menu_item"><Link to="/admin/departement" onClick={ toggleSubMenuDepartement} >Départements</Link></li>
                     {/* {isSubmenuDepartOpen && (
                        <ul className="sidebar_sousMenu">
                             <li className="sidebar_sousMenu_item"><Link>Ajouter un département</Link></li>
                             <li className="sidebar_sousMenu_item"><Link>Listes des départements</Link></li>
                        </ul>
                     )} */}
                   </ul>
            </div>
            )} 

            <button onClick={toogleSideBar} className="sideBar_button">
                {isSidebarOpen ? <IoMdClose/> : <GiHamburgerMenu />}
            </button>
        </div>
    )
}

export default SideBar;