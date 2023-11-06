import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
        render={({ field }) => (
          <DatePicker
            {...field}
            renderInput={(params) => <TextField {...params} />}
            label="Delivrance Day"
            required
            error={!!errors.dateDelivrance}
            helperText={errors?.dateDelivrance?.message}
            fullWidth
          />
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
            label="Delivrance Place"
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
            label="CNAPS Numero"
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
          <Select
            {...field}
            value={field.value || ""} // Assurez-vous d'avoir une valeur par défaut
            className="mt-8 mb-16"
            error={!!errors.statutmatrimoniale}
            required
            helperText={errors?.statutmatrimoniale?.message}
            label="Marital Status"
            autoFocus
            id="statutmatrimoniale"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="Célibataire">Single</MenuItem>
            <MenuItem value="Marié">Married</MenuItem>
          </Select>
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
            label="Number of Children"
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
