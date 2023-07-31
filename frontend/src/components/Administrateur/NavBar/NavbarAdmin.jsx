import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../../image/logo_sahaza.png"
import Logout from '../../Authentification/Logout/Logout'
import './navBar.css'

function NavBar(){
    return (
        <div className="navBar">
            <div className="nav-left">
                <Link to="/">
                <img src={Logo} alt="logo" className="navbar_logo" />
                </Link> 
            </div>
            <div className="nav-right">
                <ul className="menu">
                    <li><Link to="/admin/home">Dashboard</Link></li>
                    <li><Link to="#">Collaborateur</Link></li>
                    <li><Link to="#">Poste</Link></li>
                    <li><Link to="/admin/departement">Département</Link></li>
                </ul>
            </div>
            <div>
                <Logout/>
            </div>
        </div>
    )
}

export default NavBar;