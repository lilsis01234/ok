import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import "./Login.css"

function Login(props){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('jwt')

        if (token){
            const decodedToken = jwt_decode(token)
            console.log(decodedToken)
            if(decodedToken.exp){
                localStorage.removeItem('jwt');
                navigate('/home')

            } else {
                navigate('/')
            }
          
        } 
    }, [navigate])

    //Gestionnaire d'évenement lors de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            email : email,
            password : password
        }
        //Configuration de axios pour resoudre les problème CROSS
        axios.defaults.withCredentials = true;

        // axios.post('http://localhost:4001/api/auth/login', formData)
        axios.post('http://localhost:4001/api/auth/connect', formData)
        .then((response) => {
            const {token, role, id} = response.data;
           localStorage.setItem('jwt', token);
           localStorage.setItem('role', role);
           localStorage.setItem('id', id)
            // Cookies.set('jwt', token)
            navigate('/home');
        })
        .catch((error) => {
            console.error(error);
        })
    }

    return(
        <div className="login">
           <h1 className="login-title">Connexion</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div>
                    <label className="login-label">Adresse email</label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="login-input"/>
                </div>
                <div>
                    <label className="login-label">Mot de passe</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="login-input"/>
                </div>
                <button type="submit" className="login-button">Se connecter </button>
            </form> 
            <Link to="/password/reset_request/" className="login-link"> Mot de passe oublié ? Cliquez ici pour le réinitialiser</Link>
        </div>
    )
}

export default Login;