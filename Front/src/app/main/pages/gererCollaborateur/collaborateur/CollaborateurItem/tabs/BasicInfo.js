import { Radio, RadioGroup, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormControlLabel from '@mui/material/FormControlLabel';
import { fr } from 'date-fns/locale';
import moment from 'moment';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";



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
            label="Nom"
            autoFocus
            id="nom"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: !!field.value }}
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
            label="Prénom"
            autoFocus
            id="prenom"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: !!field.value }}
          />
        )}
      />
      <Controller
        name="dateNaissance"
        control={control}
        defaultValue={formValues.dateNaissance ? moment(formValues.dateNaissance).toDate() : moment().toDate()}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={fr}>
            <DatePicker
              {...field}
              value={field.value ? moment(field.value).toDate() : null}
              onChange={(date) => {
                field.onChange(date);
              }}
              label="Date de Naissance"
              required
              error={!!errors.dateNaissance}
              helperText={errors?.dateNaissance?.message}
              fullWidth
              format="dd/MM/yyyy"
            />
          </LocalizationProvider>
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
            helperText={errors?.lieuNaissance?.message}
            label="Lieu de Naissance"
            autoFocus
            id="lieuNaissance"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: !!field.value }}
          />
        )}
      />
      <Controller
        name="sexe"
        control={control}
        render={({ field }) => (
          <RadioGroup
            row
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            label="Sexe"
          >
            <FormControlLabel
              control={<Radio />}
              label="Masculin"
              value="Masculin"
            />
            <FormControlLabel
              control={<Radio />}
              label="Féminin"
              value="Féminin"
            />
          </RadioGroup>
        )}
      />
    </div>
  );
}

export default BasicInfo;
