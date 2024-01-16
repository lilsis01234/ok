import { Button, Paper, TextField, Typography } from '@mui/material';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post('http://localhost:4000/api/password/password_request_rest', { email })
            .then((response) => {
                dispatch(showMessage({message : 'Demande de réinitialisation du mot de passe envoyées avec succès'}))
                setTimeout(() => {
                    setIsLoading(true);
                }, 30 * 60 * 1000)


            })
            .catch((error) => {
                console.error('Erreur lors de la demande de réinitialisation du mot de passe', error);
                dispatch(showMessage({message : 'Adresse email non trouvé'}))
                setIsLoading(false);
            })
    };


    return (
        <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
            <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
                <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
                    <img className="w-48" src="assets/images/logo/logo.png" alt="logo" />
                    <Typography className="mt-32 text-3xl font-extrabold tracking-tight leading-tight">
                        Mot de passe oublié?
                    </Typography>
                    <div className="flex items-baseline mt-2 font-medium">
                        <Typography>Veuillez remplir le formulaire pour réinitialiser votre mot de passe</Typography>
                    </div>

                    <form
                        noValidate
                        className="flex flex-col justify-center w-full mt-32"
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            className="mb-24"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            className=" w-full mt-4"
                            aria-label="Register"
                            type="submit"
                            size="large"
                            disabled={isLoading}
                        >
                            Envoyer le lien de réinitialisation
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

export default ForgotPasswordPage
