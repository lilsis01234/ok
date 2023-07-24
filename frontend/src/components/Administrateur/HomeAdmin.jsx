import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

function HomeAdmin(){
    const navigate = useNavigate();
    useEffect(() => {
        // const token = Cookies.get('jwt');
        const token = localStorage.getItem('jwt');
        console.log(token);
        if (!token){
            navigate('/login');
        }
    }, [navigate])

    return (
        <div>
            <h1>Bienvenue Administrateur</h1>
        </div>
    )
}

export default HomeAdmin;