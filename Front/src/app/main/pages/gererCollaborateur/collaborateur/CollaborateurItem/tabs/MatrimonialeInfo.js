import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import moment from 'moment';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


function BasicDirectionInfoTab(props) {
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
        name="CIN"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.CIN}
            required
            helperText={errors?.CIN?.message}
            label="CIN"
            autoFocus
            id="CIN"
            variant="outlined"
            fullWidth
          />
        )}
      />
       <Controller
        name="dateDelivrance"
        control={control}
        defaultValue={formValues.dateDelivrance || null}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              {...field}
              value={field.value ? moment(field.value).toDate() : null}
              renderInput={({ inputProps, InputProps, ...params }) => (
                <TextField {...params} />
              )}
              label="Date de délivrance"
              required
              error={!!errors.dateDelivrance}
              helperText={errors?.dateDelivrance?.message}
              fullWidth
            />
          </LocalizationProvider>
        )}
      />
      <Controller
        name="lieuDelivrance"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.lieuDelivrance}
            required
            helperText={errors?.lieuDelivrance?.message}
            label="Date de délivrance"
            autoFocus
            id="lieuDelivrance"
            variant="outlined"
            fullWidth
          />
        )}
      />
         <Controller
        name="numCNAPS"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.numCNAPS}
            required
            helperText={errors?.numCNAPS?.message}
            label="Numero CNAPS"
            autoFocus
            id="numCNAPS"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="statutmatrimoniale"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            value={field.value || 'Célibataire'} // Assurez-vous d'avoir une valeur par défaut
            className="mt-8 mb-16"
            error={!!errors.statutmatrimoniale}
            required
            helperText={errors?.statutmatrimoniale?.message}
            label="Statut Matrimonial"
            autoFocus
            id="statutmatrimoniale"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="Célibataire">Célibataire</MenuItem>
            <MenuItem value="Marié">Marié</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="nbEnfant"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.nbEnfant}
            required
            helperText={errors?.nbEnfant?.message}
            label="Nombre d'enfant"
            autoFocus
            id="nbEnfant"
            type="number" // Spécifie le type de champ comme nombre
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default BasicDirectionInfoTab;
