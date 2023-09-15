import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'
import './SideBar.css'

function SideBar(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSubmenuCollabOpen, setIsSubmenuCollabOpen] = useState(false);
    const [isSubmenuPosteOpen, setIsSubmenuPosteOpen] = useState(false);

    const toogleSideBar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
  
    const toggleSubMenuCollab = () => {
        setIsSubmenuCollabOpen(!isSubmenuCollabOpen)
    }

    const toggleSubMenuPoste = () => {
        setIsSubmenuPosteOpen(!isSubmenuPosteOpen)
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
                     <li className="sideBar_menu_item"><Link onClick={toggleSubMenuPoste} >Structure</Link></li>
                     {isSubmenuPosteOpen && (
                        <ul className="sidebar_sousMenu">
                             <li className="sidebar_sousMenu_item"><Link to="/admin/direction">Direction</Link></li>
                             <li className="sidebar_sousMenu_item"><Link to="/admin/departement">Département</Link></li>
                             <li className="sidebar_sousMenu_item"><Link to="/admin/equipe">Equipe</Link></li>
                             <li className="sidebar_sousMenu_item"><Link to="/admin/poste">Poste</Link></li>

                        </ul>
                     )} 
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