import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Logout from '../Authentification/Logout';

function HomeUser (){
    const navigate = useNavigate();
    useEffect(() => {
        // const token = Cookies.get('jwt');
        const token = localStorage.getItem('jwt');
        console.log(token);
        if (!token){
            navigate('/login');
        }

        const role = localStorage.getItem('role'); 
        if (!(role === "User")){
            navigate('/home');
        }

    }, [navigate])
    return (
        <div>
            <h1>Bienvenue User</h1>
            <Logout/>
        </div>
    )
}

export default HomeUser;