import { MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import axios from 'axios';

function BasicInfoEquipe(props) {
    const { methods, formValues } = props;
    const { control, formState } = methods || {};
    const { errors } = formState || {};

    const [listeProjet, setListeProjet] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/projet/all')
            .then((response) => {
                setListeProjet(response.data)

            })
            .catch((error) => {
                console.error('Error fetching project data', error)
            })
    }, [])

    if (!methods) {
        return null;
    }

    return (
        <div>
            <Controller
                name="nomEquipe"
                control={control}
                defaultValue={formValues.nomEquipe || ''}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.nomEquipe}
                        required
                        helperText={errors?.nomEquipe?.message}
                        label="Team Name"
                        autoFocus
                        id="nomEquipe"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                name="projet"
                control={control}
                defaultValue={formValues.projet || ''}
                render={({ field }) => (
                    <TextField
                        {...field}
                        select
                        className="mt-8 mb-16"
                        error={!!errors.projet}
                        required
                        helperText={errors?.projet?.message}
                        label="Project"
                        autoFocus
                        id="project"
                        variant="outlined"
                        fullWidth
                    >
                        {listeProjet.map((projet) => (
                            <MenuItem key={projet.id} value={projet.id}>
                                {projet.nomProjet}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />



        </div>
    )
}

export default BasicInfoEquipe
