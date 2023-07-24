//Importation des packages nécessaires 
import React, {useState, useEffect} from 'react';
//Importer axios pour lier le backend avec le frontend 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //Package utile pour la redirection vers un autre page
// import { setAuthToken } from './auth_config';
import Cookies from 'js-cookie';
import { getRoleFromToken } from './getRoleFromToken';
import { setAuthToken } from './auth_config';




function AuthForm(props) {
    // const [formData, setFormData ] = useState({});
    //Etat local pour les champs du formulaire
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 


    // useEffect(() => {
    //     // Vérifier si l'utilisateur est déjà connecté en vérifiant l'existence du jeton d'accès dans les cookies
    //     const accessToken = Cookies.get("token");
    //     console.log(accessToken);
    //     if (accessToken) {
    //       // Rediriger l'utilisateur vers la page d'accueil s'il est déjà connecté
    //       navigate("/home");
    //     }
    //   }, [navigate]);

   //Gestionnaire d'évenement lors de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
   
    // const handleChange = (e) => {
    //     const{name, value} = e.target;
    //     setFormData({...formData, [name] : value})
    // }

        const formData = {
            email : email,
            password : password
        }

        axios.post('http://localhost:4000/api/auth/login', formData)
        .then((response) => {
            //Stocker le JWT dans le LocalStorage
            // localStorage.setItem('jwt', response.data.token);

            const data = response.data.token

            //Si on utilise des cookies securisés
            setAuthToken(data)
            const token = Cookies.get('jwt');
           
            const userRole = getRoleFromToken(token);
            if(userRole && userRole.includes('Administrateur')) {
                navigate('home');
            } else if (userRole && userRole.includes('User')){
                navigate('/userHome');
            }

            console.log('Token récupére du cookie:', token);
            console.log(response.data);
            console.log(userRole);
        
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
        </div>
    )

}

export default AuthForm;