import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';


function Login(props){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    

    //Gestionnaire d'évenement lors de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            email : email,
            password : password
        }
        //Configuration de axios pour resoudre les problème CROSS
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:4000/api/auth/login', formData)
        .then((response) => {
            const {token, role} = response.data;
           localStorage.setItem('jwt', token);
           localStorage.setItem('role', role);
            // Cookies.set('jwt', token)
            navigate('/home');
        })
        .catch((error) => {
            console.error(error);
        })
    }

    return(
        <div>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Adresse email</label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Se connecter </button>
            </form> 
            <Link to="/reset/password">Mot de passe oublié</Link>
        </div>
    )
}

export default Login;