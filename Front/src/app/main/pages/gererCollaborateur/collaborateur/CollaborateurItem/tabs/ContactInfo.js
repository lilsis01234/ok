import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function ContactInfo(props) {
  const { methods, formValues } = props;
  const { control, formState } = methods || {};
  const { errors } = formState || {};

  // console.log(methods);

  if (!methods) {
    return null;
  }

  return (
    <div>
      <Controller
        name="tel"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.tel}
            required
            helperText={errors?.tel?.message}
            label="Téléphone"
            autoFocus
            id="tel"
            variant="outlined"
            fullWidth
          />
        )}
      />
       <Controller
        name="tel2"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.tel2}
            helperText={errors?.tel2?.message}
            value={field.value || ''}
            label="Deuxième téléphone"
            autoFocus
            id="tel2"
            variant="outlined"
            fullWidth
          />
        )}
      />
       <Controller
        name="telurgence"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.telurgence}
            helperText={errors?.telurgence?.message}
            label="Téléphone d'urgence"
            autoFocus
            id="tel"
            variant="outlined"
            fullWidth
          />
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
            label="Email"
            autoFocus
            id="email"
            variant="outlined"
            fullWidth
          />
        )}
      />


   
    </div>
  );
}

export default ContactInfo;
