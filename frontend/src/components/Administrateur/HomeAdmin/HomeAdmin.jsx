import React, { useEffect } from 'react'
import Dashboard from '../Dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavbarAdmin';
import SideBar from '../SideBarAdmin/SideBar';
// import ListeCollab from '../CrudCollab/listeCollab';
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