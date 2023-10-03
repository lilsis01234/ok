import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBarAdmin from '../NavBar/NavBarAdmin';
import SideBar from '../SideBarAdmin/SideBar';
import '../../Other_component/Page.css'
import Dashboard from '../Dashboard/Dashboard';
import jwt_decode from "jwt-decode";
// import Cookies from 'js-cookie';

function HomeAdmin(){
    
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
        
        const role = localStorage.getItem('role'); 
        if (!(role === "Administrateur")){
            navigate('/home');
        }
    }, [navigate])

    return (
        <div className="page">
            <NavBarAdmin/>
            <div className="content">
                <SideBar/>
                <div className="main-content">
                    <Dashboard/>
                </div>
            </div>

            
        </div>
    )
}

export default HomeAdmin;