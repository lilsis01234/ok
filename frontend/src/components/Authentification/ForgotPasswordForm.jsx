import axios from 'axios';
import React, { useState } from 'react'

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/password/password_request_rest', {email})
          .then((response) => {
            alert("Demande de réinitialisation du mot de passe envoyées avec succès")
          })
          .catch((error) => {
            console.error('Erreur lors de la demande de réinitialisation du mot de passe', error);
            alert("Une erreur est survenue lors de la demande de réinitialisation");
          })
    };


  return (
    <div>
      <h2>Réinitialier votre mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">Adresse e-mail :</label>
            <input 
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  )
}

export default ForgotPasswordForm;
