import { MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import axios from 'axios';

function BasicInfoRole(props) {
    const { methods, formValues } = props;
    const { control, formState } = methods || {};
    const { errors } = formState || {};

    const [listeRole, setListeRole] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/role/all_role')
            .then((response) => {
                setListeRole(response.data)

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
                name="roleHierarchique"
                control={control}
                defaultValue={formValues.roleHierarchique || ''}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.roleHierarchique}
                        required
                        helperText={errors?.roleHierarchique?.message}
                        label="Rôle"
                        autoFocus
                        id="roleHierarchique"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                name="RoleId"
                control={control}
                defaultValue={formValues.projet || ''}
                render={({ field }) => (
                    <TextField
                        {...field}
                        select
                        className="mt-8 mb-16"
                        error={!!errors.RoleId}
                        required
                        helperText={errors?.RoleId?.message}
                        label="Catégorie "
                        autoFocus
                        id="RoleId"
                        variant="outlined"
                        fullWidth
                    >
                        {listeRole.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.titreRole}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />



        </div>
    )
}

export default BasicInfoRole
