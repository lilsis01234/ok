import { MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import axios, { formToJSON } from 'axios';

function BasicDepartementInfo(props) {
    const { methods, formValues } = props;
    const { control, formState } = methods || {};
    const { errors } = formState || {};

    const [listeDirection, setListeDirection] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/direction/all')
            .then((response) => {
                setListeDirection(response.data)

            })
            .catch((error) => {
                console.error('Error fetching direction data', error)
            })
    }, [])

    if (!methods) {
        return null;
    }

    return (
        <div>
            <Controller
                name="nomDepartement"
                control={control}
                defaultValue={formValues.nomDepartement || ''}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.nomDepartement}
                        required
                        helperText={errors?.nomDirection?.message}
                        label="Departement Name"
                        autoFocus
                        id="nomDepartement"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                name="direction"
                control={control}
                defaultValue={formValues.direction || ''}
                render={({ field }) => (
                    <TextField
                        {...field}
                        select
                        className="mt-8 mb-16"
                        error={!!errors.direction}
                        required
                        helperText={errors?.direction?.message}
                        label="Direction"
                        autoFocus
                        id="direction"
                        variant="outlined"
                        fullWidth
                    >
                        {listeDirection.map((direction) => (
                            <MenuItem key={direction.id} value={direction.id}>
                                {direction.nomDirection}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />



        </div>
    )
}

export default BasicDepartementInfo
