import React, { useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../Login/Login.css"
import '../ForgotPasswordForm/ForgotPasswordForm.css'

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {token} = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword){
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        axios.post(`http://localhost:4000/api/password/reset-password/${token}`, {password})
        .then((response) => {
            alert("Le mot de passe a été réinitialisé avec succès")
            navigate("/login");
        })
        .catch((error) => {
            console.error('Erreur lors de la réinitialisation du mot de passe:', error);
        })

    }

  return (
    <div className='login'>
      <h2 className='resetpassword-title'>Réinitialiser mot de passe </h2>
      <form onSubmit={handleSubmit} className="login-form">
          <div>
              <label className="login-label">Nouveau mot de passe :</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="login-input"/>
          </div>
          <div>
              <label className="login-label ">Confirmer le mot de passe :</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="login-input"/>
          </div>
          <button type="submit" className="login-button">Enregistrer</button>
      </form>
    </div>
  )
}

export default ResetPasswordForm;
