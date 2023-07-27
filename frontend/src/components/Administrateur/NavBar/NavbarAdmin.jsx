import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../../Authentification/Logout/Logout'
import './navBar.css'

function NavBar(){
    return (
        <div className="navBar">
            <div className="nav-left"></div>
            <div className="nav-right">
                <ul className="menu">
                    <li><Link to="#">Dashboard</Link></li>
                    <li><Link to="#">Collaborateur</Link></li>
                    <li><Link to="#">Poste</Link></li>
                    <li><Link to="#">Département</Link></li>
                </ul>
            </div>
            <div>
                <Logout/>
            </div>
        </div>
    )
}

export default NavBar;