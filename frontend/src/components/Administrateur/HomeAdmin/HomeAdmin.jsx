import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavbarAdmin';
import SideBar from '../SideBarAdmin/SideBar';
import './page.css';
// import Cookies from 'js-cookie';

function HomeAdmin(){
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
            <SideBar/>
            <h1>Bienvenue Administrateur</h1>
        </div>
    )
}

export default HomeAdmin;