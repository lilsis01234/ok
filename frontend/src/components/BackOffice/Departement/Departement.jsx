import React, {useEffect } from "react";
import '../../Other_component/Page.css'
import NavBarAdmin from '../NavBar/NavBarAdmin'
import SideBar from "../SideBarAdmin/SideBar";
import ListDepartement from "./listeDepartement/listeDepartement";
import {useNavigate} from "react-router-dom"
import './Departement.css'
import jwt_decode from "jwt-decode";

function PageDepartement(){
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('jwt')

        if (token){
            const decodedToken = jwt_decode(token)
            console.log(decodedToken)
            if(!decodedToken.exp){
                localStorage.removeItem('jwt');
                navigate('/')
            } 
        } 
        }, [navigate])

    return (
        <div className="page">
            <NavBarAdmin/>
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