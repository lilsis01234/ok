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
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
      <Controller
        name="dateDelivrance"
        control={control}
        defaultValue={formValues.dateDelivrance ? moment(formValues.dateDelivrance).toDate() : moment().toDate()}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              {...field}
              value={field.value ? moment(field.value).toDate() : null}
              onChange={(date) => {
                field.onChange(date);
              }}
              label="Date de Délivrance"
              required
              error={!!errors.dateDelivrance}
              helperText={errors?.dateDelivrance?.message}
              fullWidth
              format="dd/MM/yyyy"
              InputLabelProps={{ shrink: true }}
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
            InputLabelProps={{ shrink: !!field.value }}
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
            helperText={errors?.numCNAPS?.message}
            label="Numero CNAPS"
            autoFocus
            id="numCNAPS"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: !!field.value }}
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
            value={field.value || 'Célibataire'} 
            className="mt-8 mb-16"
            error={!!errors.statutmatrimoniale}
            required
            helperText={errors?.statutmatrimoniale?.message}
            label="Statut Matrimonial"
            autoFocus
            id="statutmatrimoniale"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: !!field.value }}
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
