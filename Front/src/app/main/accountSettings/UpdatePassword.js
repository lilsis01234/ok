import { selectUser } from 'app/store/userSlice'
import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Paper, TextField, Typography } from '@mui/material';

function UpdatePassword() {
    const user = useSelector(selectUser)
    // console.log('L\'User connecté', user)

    const idUser = user.data?.CompteId

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}:;<>,.?]).{8,}$/;
    const isStrongPassword = isPasswordValid.test(password);

    const navigate = useNavigate();

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

        axios.put(`http://localhost:4000/api/compte_collaborateur/${idUser}/editPassword`, { password })
            .then((response) => {
                alert("Le mot de passe modifié avec succès")
                navigate("/settings/account");
            })
            .catch((error) => {
                console.error('Erreur lors de la modification du mot de passe:', error);
            })

    }





    return (
        <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
            <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
                <div className="w-full max-w-420 sm:w-420 mx-auto sm:mx-0">
                    {/* <img className="w-48" src="assets/images/logo/logo.png" alt="logo" /> */}
                    <Typography className="mt-32 center text-4xl font-extrabold tracking-tight leading-tight">
                        Modifier votre mot de passe
                    </Typography>
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
                            Modifier le mot de passe
                        </Button>
                      
                    </form>


                </div>

            </Paper>
        </div>
    )
}

export default UpdatePassword
