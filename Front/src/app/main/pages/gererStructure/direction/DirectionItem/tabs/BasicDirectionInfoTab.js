import { TextField } from '@mui/material';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

function BasicDirectionInfo(props) {
  const methods = useFormContext();
  const {control, formState} =  methods ? methods : {};
  const {errors} = formState ? formState : {};

  return (
    <div>
        <Controller
            name="nomDirection"
            control={control}
            render={({
              field
            }) => (
                <TextField 
                  {...field}
                  className="mt-8 mb-16"
                  error={!!errors.name}
                  required
                  helperText={errors?.nomDirection?.message}
                  label="Direction Name"
                  autoFocus
                  id="name"
                  variant="outlined"
                  fullWidth
                />
            )}
        />      
    </div>
  )
}

export default BasicDirectionInfo
