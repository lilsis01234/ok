import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBarAdmin from '../NavBar/NavBarAdmin';
import SideBar from '../SideBarAdmin/SideBar';
import '../../Other_component/Page.css'
import Dashboard from '../Dashboard/Dashboard';
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