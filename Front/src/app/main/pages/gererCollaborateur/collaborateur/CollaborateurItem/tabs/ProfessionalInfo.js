import { MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import axios, { formToJSON } from "axios";
import moment from 'moment';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function ProfessionalInfo(props) {
  const { methods, formValues } = props;
  const { control, formState } = methods || {};
  const { errors } = formState || {};

  const [listePoste, setListePoste] = useState([]);
  const [listeDepartement, setListeDepartement] = useState([]);
  const [listeProjet, setListeProjet] = useState([]);
  const [listeEquipe, setListeEquipe] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/poste/all")
      .then((response) => {
        setListePoste(response.data);
      })
      .catch((error) => {
        console.error("Error fetching function data", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/departement/all")
      .then((response) => {
        setListeDepartement(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departement data", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/equipe/all")
      .then((response) => {
        setListeEquipe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team data", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/projet/all")
      .then((response) => {
        setListeProjet(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project data", error);
      });
  }, []);

  if (!methods) {
    return null;
  }

  return (
    <div>
      <Controller
        name="matricule"
        control={control}
        defaultValue={formValues.matricule}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.matricule}
            required
            helperText={errors?.matricule?.message}
            label="Matricule"
            autoFocus
            id="matricule"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="dateEmbauche"
        control={control}
        defaultValue={formValues.dateEmbauche || null}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              {...field}
              value={field.value ? moment(field.value).toDate() : null}
              renderInput={({ inputProps, InputProps, ...params }) => (
                <TextField {...params} />
              )}
              label="Date d'embauche "
              required
              error={!!errors.dateEmbauche}
              helperText={errors?.dateEmbauche?.message}
              fullWidth
            />
          </LocalizationProvider>
        )}
      />
      <Controller
        name="site"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            value={field.value || 'Fivoarana'} // Assurez-vous d'avoir une valeur par défaut
            className="mt-8 mb-16"
            error={!!errors.site}
            required
            helperText={errors?.site?.message}
            label="Site"
            autoFocus
            id="site"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="Fivoarana">Fivoarana</MenuItem>
            <MenuItem value="Ivohasina">Ivohasina</MenuItem>
            <MenuItem value="Soazaraina">Soazaraina</MenuItem>
          </TextField>
        )}
      />
      <Controller
        name="entreprise"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            value={field.value || 'Advalorem'} // Assurez-vous d'avoir une valeur par défaut
            className="mt-8 mb-16"
            error={!!errors.entreprise}
            required
            helperText={errors?.entreprise?.message}
            label="Entreprise"
            autoFocus
            id="entreprise"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="Advalorem">Advalorem</MenuItem>
            <MenuItem value="Marketika">Marketika</MenuItem>
            <MenuItem value="Progressio">Progressio</MenuItem>
          </TextField>
        )}
      />
      <Controller
        name="shift"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            value={field.value || "Jour"} // Assurez-vous d'avoir une valeur par défaut
            className="mt-8 mb-16"
            error={!!errors.shift}
            required
            helperText={errors?.shift?.message}
            label="Shift"
            autoFocus
            id="shift"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="Jour">Jour</MenuItem>
            <MenuItem value="Nuit">Nuit</MenuItem>
          </TextField>
        )}
      />
      <Controller
        name="poste"
        control={control}
        // defaultValue={formValues.poste}
        render={({ field }) => (
          <TextField
            {...field}
            select
            className="mt-8 mb-16"
            error={!!errors.poste}
            required
            helperText={errors?.poste?.message}
            value={field.value || ''}
            label="Poste"
            autoFocus
            id="poste"
            variant="outlined"
            fullWidth
          >
            {listePoste.map((poste) => (
              <MenuItem key={poste.id} value={poste.id}>
                {poste.titrePoste}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="departement"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            value={field.value || ''}
            className="mt-8 mb-16"
            error={!!errors.departement}
            helperText={errors?.departement?.message}
            label="Département"
            autoFocus
            id="poste"
            variant="outlined"
            fullWidth
          >
            {listeDepartement.map((departement) => (
              <MenuItem key={departement.id} value={departement.id}>
                {departement.nomDepartement}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="projet"
        control={control}
        defaultValue={formValues.projet}
        render={({ field }) => (
          <TextField
            {...field}
            select
            value={field.value || ''}
            className="mt-8 mb-16"
            error={!!errors.projet}
            helperText={errors?.projet?.message}
            label="Projet"
            autoFocus
            id="poste"
            variant="outlined"
            fullWidth
          >

            <MenuItem value="">Selectionner une option</MenuItem>
            {listeProjet.map((projet) => (
              <MenuItem key={projet.id} value={projet.id}>
                {projet.nomProjet}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="equipe"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            value={field.value || ''}
            className="mt-8 mb-16"
            error={!!errors.equipe}
            helperText={errors?.equipe?.message}
            label="Equipe"
            autoFocus
            id="equipe"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">Selectionner une option</MenuItem>
            {listeEquipe.map((equipe) => (
              <MenuItem key={equipe.id} value={equipe.id}>
                {equipe.nomEquipe}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </div>
  );
}

export default ProfessionalInfo;
