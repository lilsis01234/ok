import { MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import axios, { formToJSON } from "axios";
import moment from 'moment';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function ProfessionalInfo(props) {
  const { methods, formValues } = props;
  const { control, formState, setValue} = methods || {};
  const { errors } = formState || {};

  const [listePoste, setListePoste] = useState([]);
  const [listeDepartement, setListeDepartement] = useState([]);
  const [listeProjet, setListeProjet] = useState([]);
  const [listeEquipe, setListeEquipe] = useState([]);
  const [listeSite, setListeSite] = useState([]);

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

  useEffect(() => {
    axios 
    .get('http://localhost:4000/api/site/all')
    .then ((response) => {
      setListeSite(response.data)
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des sites", error)
    })
  }, [])


  if (!methods) {
    return null;
  }

  return (
    <div>
      <Controller
        name="matricule"
        control={control}
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
            InputLabelProps={{ shrink: !!field.value }}
          />
        )}
      />
       <Controller
        name="dateEmbauche"
        control={control}
        defaultValue={formValues.dateEmbauche ? moment(formValues.dateEmbauche).toDate() : moment().toDate()}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              {...field}
              value={field.value ? moment(field.value).toDate() : null}
              onChange={(date) => {
                field.onChange(date);
              }}
              label="Date d'Embauche"
              required
              error={!!errors.dateEmbauche}
              helperText={errors?.dateEmbauche?.message}
              fullWidth
              format="dd/MM/yyyy"
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
            value={field.value || null} 
            className="mt-8 mb-16"
            error={!!errors.site}
            required
            helperText={errors?.site?.message}
            label="Site"
            autoFocus
            id="site"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: !!field.value }}
          >
           {listeSite.map((site) => (
              <MenuItem key={site.id} value={site.id}>
                {site.nomSite}
              </MenuItem>
            ))}
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
            value={field.value || 'Advalorem'} 
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
            InputLabelProps={{ shrink: !!field.value }}
          >
            <MenuItem value="Jour">Jour</MenuItem>
            <MenuItem value="Nuit">Nuit</MenuItem>
          </TextField>
        )}
      />
      <Controller
        name="poste"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            className="mt-8 mb-16"
            error={!!errors.poste}
            required
            helperText={errors?.poste?.message}
            value={field.value || null}
            label="Poste"
            autoFocus
            id="poste"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: !!field.value }}
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
            value={field.value || null}
            className="mt-8 mb-16"
            error={!!errors.departement}
            helperText={errors?.departement?.message}
            label="Département"
            autoFocus
            id="departement"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: !!field.value }}
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
            value={field.value || null}
            className="mt-8 mb-16"
            error={!!errors.projet}
            helperText={errors?.projet?.message}
            label="Projet"
            autoFocus
            id="projet"
            variant="outlined"
            fullWidth
          >

            <MenuItem value={null}>Selectionner une option</MenuItem>
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
            value={field.value || null}
            className="mt-8 mb-16"
            error={!!errors.equipe}
            helperText={errors?.equipe?.message}
            label="Equipe"
            autoFocus
            id="equipe"
            variant="outlined"
            fullWidth
          >
             <MenuItem value={null}>Selectionner une option</MenuItem>
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
