import React from "react";
import "./NavBarAdmin.css";
import Logo from "../../../image/logo_sahaza.png"
import { Link} from "react-router-dom";
import UserProfile from "../../Authentification/UserProfile/UserProfile";
import './NavBarAdmin.css'


function NavBarAdmin() {


   // Rediriger vers la page de connexion


  return (
    <div className="navBar">
      <div className="nav-left">
        <Link to="/home">
        <img src={Logo} alt="logo" className="navbar_logo"/>
        </Link> 
      </div>
      <div className="nav-right">
        <div className="menu">
          <ul>
            <li>
              <Link to="/admin/home">Tableau de bord</Link>
            </li>
            <li>
              <Link to="/admin/collaborateur/liste">Collaborateur</Link>
            </li>
            <li>
              <Link to="/admin/poste">Poste</Link>
            </li>
            <li>
              <Link to="/admin/departement">Département</Link>
            </li>
          </ul>
        </div>
      </div>
        <div className="nav-profile"><UserProfile/> </div>
    </div>
  );
}

export default NavBarAdmin;