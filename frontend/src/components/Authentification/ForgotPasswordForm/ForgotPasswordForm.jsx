import axios from 'axios';
import React, { useState } from 'react'
import { Link} from 'react-router-dom';
import "../Login/Login.css"
import './ForgotPasswordForm.css'

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post('http://192.168.16.244:4000/api/password/password_request_rest', {email})
          .then((response) => {
            alert("Demande de réinitialisation du mot de passe envoyées avec succès")
            setTimeout(() => {
              setIsLoading(false);
            }, 30 * 60 * 1000);
          })
          .catch((error) => {
            console.error('Erreur lors de la demande de réinitialisation du mot de passe', error);
            alert("Une erreur est survenue lors de la demande de réinitialisation");
          })
    };


  return (
    <div className="login">
      <h2 className="resetpassword-title">Réinitialiser votre mot de passe</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
            <label htmlFor="email" className="login-label">Adresse e-mail :</label>
            <input 
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
            />
        </div>
        <button type="submit" disabled={isLoading} className="login-button">Envoyer</button>
      </form>
      <Link to="/" className="login-link"> Revenir à la page de connexion </Link>
    </div>
  )
}

export default ForgotPasswordForm;
