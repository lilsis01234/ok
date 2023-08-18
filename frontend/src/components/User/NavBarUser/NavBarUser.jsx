import React from 'react'
import { Link } from 'react-router-dom';
import Logo from "../../../image/logo_sahaza.png"
import UserProfile from "../../Authentification/UserProfile/UserProfile";

const NavBarUser = () => {
  return (
    <div className="navBar">
        <div className="nav-left">
            <img src={Logo} alt="logo" className="navbar_logo" />
        </div>
        <div className="nav-right">
            <div className="menu">
                <ul>
                    <li><Link to='/user/home'>Acceuil</Link></li>    {/* Page d'acceuil temporaire */}
                    <li><Link to='/collaborateur/list'>Collaborateur</Link></li>
                    <li><Link>A propos</Link></li>
                    <li><Link>Aide</Link></li>
                </ul>
            </div>
        </div>
        <UserProfile/>
    </div>
  )
}

export default NavBarUser
