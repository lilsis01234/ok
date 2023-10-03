import React from 'react'
// import { Link } from 'react-router-dom';
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
                    {/* <li><Link to='/user/home'>Acceuil</Link></li>    {/* Page d'acceuil temporaire */}
                    {/* <li><Link to='/user/home'>Actualités</Link></li>  */}
                    {/* <li><Link to='/user/home'>Evénements</Link></li>  */}
                    {/* <li><Link to='/user/home'>Sondages</Link></li>  */}
                    {/* <li><Link to='/collaborateur/list'>Nos collaborateurs</Link></li> */}
                    {/* <li><Link>Notre entreprise</Link></li> */} 
                </ul>
            </div>
        </div>
        <div className="nav-profile">
            <UserProfile/> 
        </div>
    </div>
  )
}

export default NavBarUser
