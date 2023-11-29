import { MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';

function BasicInfoCompte(props) {
    const { methods, formValues } = props;
    const { control, formState } = methods || {};
    const { errors } = formState || {};

    if (!methods) {
        return null;
    }


    const [listeCollaborateur, setListeCollaborateur] = useState([])
    const [listeRoleHierarchique, setListeRoleHierarchique] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/api/collaborateur/all")
            .then((response) => {
                setListeCollaborateur(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des donnée', error);
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:4000/api/roleHierarchique/all")
        .then((response) => {
            setListeRoleHierarchique(response.data)
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération des donnée', error);
        })
    }, [])

    return (
        <div>
            <Controller
                name="collaborateur"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        select
                        value={field.value || ''}
                        className='mt-8 mb-16'
                        label='Collaborateur'
                        autoFocus
                        id="nom"
                        variant="outlined"
                        fullWidth
                        disabled
                        InputLabelProps={{ shrink: !!field.value }}
                    >
                        {listeCollaborateur.map((collab) => (
                            <MenuItem key={collab.id} value={collab.id}>
                                {collab.nom} {collab.prenom}
                            </MenuItem>
                        ))}
                    </TextField>
                )}

            />
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.email}
                        required
                        helperText={errors?.email?.message}
                        label="Adresse mail"
                        autoFocus
                        id="email"
                        variant="outlined"
                        fullWidth
                        disabled
                        InputLabelProps={{ shrink: !!field.value }}
                    />
                )}
            />
           <Controller
                name="RoleHierarchiqueId"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        select
                        value={field.value || ''}
                        className='mt-8 mb-16'
                        label='Rôle'
                        autoFocus
                        id="role"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ shrink: !!field.value }}
                    >
                        {listeRoleHierarchique.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.roleHierarchique} 
                            </MenuItem>
                        ))}
                    </TextField>
                )}

            />
        </div>
    )
}

export default BasicInfoCompte
