import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function BasicInfo(props) {
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
        name="nom"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.nom}
            required
            helperText={errors?.nom?.message}
            label="Name"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="prenom"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.prenom}
            required
            helperText={errors?.prenom?.message}
            label="Last Name"
            autoFocus
            id="prenom"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="dateNaissance"
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            renderInput={(params) => <TextField {...params} />}
            label="Birth Day"
            required
            error={!!errors.dateNaissance}
            helperText={errors?.dateNaissance?.message}
            fullWidth
          />
        )}
      />
      <Controller
        name="lieuNaissance"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.lieuNaissance}
            required
            helperText={errors?.lieuNaissance?.message}
            label="Birth Place"
            autoFocus
            id="lieuNaissance"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="sexe"
        control={control}
        render={({ field }) => (
          <div>
            <FormControlLabel
              control={<Checkbox {...field} value="Masculin" />}
              label="Male"
            />
            <FormControlLabel
              control={<Checkbox {...field} value="Féminin" />}
              label="Female"
            />
          </div>
        )}
      />
    </div>
  );
}

export default BasicInfo;
