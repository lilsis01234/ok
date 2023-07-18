//Importation des packages nécessaires 
import React, {useState} from 'react';
//Importer axios pour lier le backend avec le frontend 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //Package utile pour la redirection vers un autre page



function AuthForm(props) {
    // const [formData, setFormData ] = useState({});
    //Etat local pour les champs du formulaire
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

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

        axios.post('http://localhost:3000/api/auth/login', formData)
        .then((response) => {
            navigate('/home');
            console.log(response.data);
            
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