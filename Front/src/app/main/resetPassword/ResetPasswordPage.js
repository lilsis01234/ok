import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

function ResetPasswordPage() {
    console.log('Rendu de la page ResetPasswordPage')
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams();

    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}:;<>,.?]).{8,}$/;

    const isStrongPassword = isPasswordValid.test(password);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {  
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        if (!isPasswordValid.test(password)) {
            alert("Le mot de passe doit contenir des chiffres, des lettres majuscules, des lettres minuscules et certains caractères spéciaux.");
            return;
        }

        axios.post(`http://localhost:4000/api/password/reset-password/${token}`, { password })
            .then((response) => {
                dispatch(showMessage({message : 'Le mot de passe a été réinitialisé avec succès'}))
                navigate("/sign-in");
            })
            .catch((error) => {
                console.error('Erreur lors de la réinitialisation du mot de passe:', error);
                dispatch(showMessage({message : error.response.data.message}))
            })

    }

    return (
        <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
            <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
                <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
                    <img className="w-48" src="assets/images/logo/logo.png" alt="logo" />
                    <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
                        Réinitialiser votre mot de passe
                    </Typography>
                    <Typography className="font-medium">Créer un nouveau mot de passe</Typography>
                    <form
                        noValidate
                        className="flex flex-col justify-center w-full mt-32"
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            label="Nouveau mot de passe"
                            type="password"
                            variant="outlined"
                            required
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="mb-16">
                            {password && (
                                <Typography color={isStrongPassword ? 'success' : 'error'}>
                                    {isStrongPassword ? 'Mot de passe correcte' : 
                                    'Le mot de passe doit contenir des chiffres, des lettres majuscules, des lettres minuscules et un des caractères suivant :! @ # $ % ^ & * ( ) _ + = { } : ; , . ? '}
                                </Typography>
                            )}
                        </div>

                        <TextField
                            className="mb-24"
                            label="Confirmer le mot de passe"
                            type="password"
                            variant="outlined"
                            required
                            fullWidth
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            className=" w-full mt-4"
                            aria-label="Register"
                            type="submit"
                            size="large"
                            disabled={!isStrongPassword}
                        >
                            Reinitialiser le mot de passe
                        </Button>
                        <Typography className="mt-32 text-md font-medium" color="text.secondary">
                            <span>Retourner à la page</span>
                            <Link className="ml-4" to="/sign-in">
                                de connexion
                            </Link>
                        </Typography>
                    </form>


                </div>

            </Paper>
        </div>
    )
}

export default ResetPasswordPage
