import { MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';

function BasicInfoProject(props) {
    const { methods, formValues } = props;

    const { control, formState } = methods || {};
    const { errors } = formState || {};

    const [listeDepartement, setListeDepartement] = useState([]);

    console.log(formValues)


    useEffect(() => {
        axios.get('http://localhost:4000/api/departement/all')
            .then((response) => {
                setListeDepartement(response.data)

            })
            .catch((error) => {
                console.error('Error fetching departement data', error)
            })
    }, [])

    if (!methods) {
        return null;
    }


    return (
        <div>
            <Controller
                name="nomProjet"
                control={control}
                defaultValue={formValues.nomProjet || ''}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.nomProjet}
                        required
                        helperText={errors?.nomProjet?.message}
                        label="Project Name"
                        autoFocus
                        id="nomProjet"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                name="departement"
                control={control}
                defaultValue={formValues.departement || ''}
                render={({ field }) => (
                    <TextField
                        {...field}
                        select
                        className="mt-8 mb-16"
                        error={!!errors.departement}
                        required
                        helperText={errors?.departement?.message}
                        label="Departement"
                        autoFocus
                        id="departement"
                        variant="outlined"
                        fullWidth
                    >
                        {listeDepartement.map((departement) => (
                            <MenuItem key={departement.id} value={departement.id}>
                                {departement.nomDepartement}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
        </div>
    )
}

export default BasicInfoProject
