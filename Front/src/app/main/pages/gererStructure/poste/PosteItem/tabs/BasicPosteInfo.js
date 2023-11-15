import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import axios from 'axios';


function BasicPosteInfo(props) {
    const { methods, formValues } = props;
    const { control, formState } = methods || {};
    const { errors } = formState || {};

    const [listDepartement, setListeDepartement] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/departement/all')
            .then((response) => {
                setListeDepartement(response.data)
            })
            .catch((error) => {
                console.error('Error fetching departement data')
            })
    }, [])




    const formattedDepartements = listDepartement.map(item => ({
        id : item.id,
        nomDepartement : item.nomDepartement
    }))

    console.log(formattedDepartements)

    if (!methods) { 
        return null;
    }


    return (
        <div>
            <Controller
                name="titrePoste"
                control={control}
                defaultValue={formValues.titrePoste || ''}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.titrePoste}
                        required
                        helperText={errors?.titrePoste?.message}
                        label="Fonction Name"
                        autoFocus
                        id="titrePoste"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller 
                name="departement"
                control={control}
                defaultValue={[]}
                render={({field : { onChange, value } }) => (
                   <Autocomplete
                        className="mt-8 mb-16"
                        multiple
                        freeSolo
                        options={formattedDepartements ? formattedDepartements : []}
                        getOptionLabel={(option) => option.nomDepartement}
                        value={value}
                        onChange={(event, newValue) => {
                            onChange(newValue);
                          }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Select multiple departement"
                                label="Departement"
                                variant="outlined"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                            />
                        )}
                        // getOptionSelected={(option, value) => option.id === value.id}
                   />
                )}

            />
          

        </div>
    )
}

export default BasicPosteInfo
