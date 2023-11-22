import { TextField } from "@mui/material";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";



function AdresseInfo(props) {
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
        name="lot"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.lot}
            required
            helperText={errors?.lot?.message}
            label="Lot"
            autoFocus
            id="lot"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="quartier"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.quartier}
            required
            helperText={errors?.quartier?.message}
            label="Quartier"
            autoFocus
            id="quartier"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="ville"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.ville}
            required
            helperText={errors?.ville?.message}
            label="Ville"
            autoFocus
            id="ville"
            variant="outlined"
            fullWidth
          />
        )}
      />
        <Controller
        name="adresse2"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.adresse2}
            value={field.value || ''}
            helperText={errors?.adresse2?.message}
            label="Deuxième Adresse"
            autoFocus
            id="adresse2"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default AdresseInfo;
