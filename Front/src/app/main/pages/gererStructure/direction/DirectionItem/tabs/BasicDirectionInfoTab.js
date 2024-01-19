import { TextField } from '@mui/material';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

function BasicDirectionInfoTab(props) {
  // const methods = useFormContext();
  // console.log(methods)
  // const {control, formState} =  methods || {};
  // const {errors} = formState || {};


  const { methods, formValues } = props;
  const { control, formState } = methods || {};
  const { errors } = formState || {};

  // console.log(methods);

  if(!methods){
    return null;
  }


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
                  error={!!errors.nomDirection}
                  required
                  helperText={errors?.nomDirection?.message}
                  label="Intitulé de la direction"
                  autoFocus
                  id="name"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: !!field.value }}
                />
            )}
        />      
    </div>
  )
}

export default BasicDirectionInfoTab
