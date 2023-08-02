import React, {useEffect } from "react";
import '../HomeAdmin/page.css'
import NavBar from "../NavBar/NavbarAdmin";
import SideBar from "../SideBarAdmin/SideBar";
import ListDepartement from "./listeDepartement/listeDepartement";
import {useNavigate} from "react-router-dom"
import './Departement.css'

function PageDepartement(){
    const navigate = useNavigate();
    useEffect(() => {
        // const token = Cookies.get('jwt');
        const token = localStorage.getItem('jwt');
        console.log(token);
        if (!token){
            navigate('/');
        }

        const role = localStorage.getItem('role'); 
        if (!(role === "Administrateur")){
            navigate('/home');
        }

    }, [navigate])

    return (
        <div className="page">
            <NavBar/>
            <div className="content">
                <SideBar/>
                <div className="main-content">
                    <div className="departement-content">
                        <ListDepartement/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageDepartement;