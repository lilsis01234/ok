import Cookies from 'js-cookie';
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAuthToken } from '../Auth/auth_config';

function HomePage(props){
    const navigate = useNavigate();

    //Si on utilise LocalStorage
    // useEffect(() => {
    //     const jwt = localStorage.getItem('jwt');

    //     if(!jwt) {
    //         clearAuthToken();
    //         navigate('/');
    //     }
    // }, []);

    //Si on utilise des cookies sécurisés
    useEffect(() => {
        const jwt = Cookies.get('jwt');
        if (!jwt) {
            clearAuthToken();
            navigate('/');
        }
    })

    //Gestionnaire d'évenement pour se déconnecter
    const handleLogout = () => {
        clearAuthToken();
        navigate('/');
    }


    return (
        <div>
            <h1>Welcome</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
        )
    }
    
export default HomePage;