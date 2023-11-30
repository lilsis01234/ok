import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import axios from 'axios';


function BasicInfoPermission(props) {
    const { methods, formValues } = props;
    const { control, formState } = methods || {};
    const { errors } = formState || {};

    const [listeRole, setListeRole] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/roleHierarchique/all')
            .then((response) => {
                setListeRole(response.data)
            })
            .catch((error) => {
                console.error('Error fetching departement data')
            })
    }, [])

    const formattedRoles = listeRole.map(item => ({
        id : item.id,
        roleHierarchique : item.roleHierarchique
    }))

    
    if (!methods) { 
        return null;
    }

  return (
    <div>
         <Controller
                name="permission"
                control={control}
                defaultValue={formValues.titrePoste || ''}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.permission}
                        required
                        helperText={errors?.permission?.message}
                        label="Permission"
                        autoFocus
                        id="permission"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
        <Controller 
                name="role"
                control={control}
                defaultValue={[]}
                render={({field : { onChange, value } }) => (
                   <Autocomplete
                        className="mt-8 mb-16"
                        multiple
                        freeSolo
                        options={formattedRoles ? formattedRoles : []}
                        getOptionLabel={(option) => option.roleHierarchique}
                        value={value}
                        onChange={(event, newValue) => {
                            onChange(newValue);
                          }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Selectionner plusieurs rôles"
                                label="Rôle"
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

export default BasicInfoPermission
