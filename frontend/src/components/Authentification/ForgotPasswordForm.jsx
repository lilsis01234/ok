import React, { useState } from 'react'

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
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
