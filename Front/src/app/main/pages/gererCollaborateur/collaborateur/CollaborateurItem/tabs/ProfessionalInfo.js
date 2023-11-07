import { MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import axios, { formToJSON } from "axios";
import { DatePicker } from "@mui/x-date-pickers";

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
        defaultValue={formValues.matricule || ""}
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
        render={({ field }) => (
          <DatePicker
            {...field}
            renderInput={(params) => <TextField {...params} />}
            label="Date d'embache"
            required
            error={!!errors.dateEmbauche}
            helperText={errors?.dateEmbauche?.message}
            fullWidth
          />
        )}
      />
      <Controller
        name="site"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            value={field.value || ""} // Assurez-vous d'avoir une valeur par défaut
            className="mt-8 mb-16"
            error={!!errors.site}
            required
            helperText={errors?.site?.message}
            label="site"
            autoFocus
            id="site"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="Fivoarana">Fivoarana</MenuItem>
            <MenuItem value="Ivohasina">Ivohasina</MenuItem>
            <MenuItem value="Soazaraina">Soazaraina</MenuItem>
          </Select>
        )}
      />
      <Controller
        name="entreprise"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            value={field.value || ""} // Assurez-vous d'avoir une valeur par défaut
            className="mt-8 mb-16"
            error={!!errors.entreprise}
            required
            helperText={errors?.entreprise?.message}
            label="Entreprisse"
            autoFocus
            id="entreprise"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="Advalorem">Advalorem</MenuItem>
            <MenuItem value="Marketika">Marketika</MenuItem>
            <MenuItem value="Progressio">Progressio</MenuItem>
          </Select>
        )}
      />
      <Controller
        name="shift"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            value={field.value || ""} // Assurez-vous d'avoir une valeur par défaut
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
            <MenuItem value="Jour">Day</MenuItem>
            <MenuItem value="Nuit">Night</MenuItem>
          </Select>
        )}
      />
      <Controller
        name="poste"
        control={control}
        defaultValue={formValues.poste || ""}
        render={({ field }) => (
          <TextField
            {...field}
            select
            className="mt-8 mb-16"
            error={!!errors.poste}
            required
            helperText={errors?.poste?.message}
            label="Poste"
            autoFocus
            id="poste"
            variant="outlined"
            fullWidth
          >
            {listePoste.map((poste) => (
              <MenuItem key={poste.id} value={poste.id}>
                {poste.titrePosste}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="departement"
        control={control}
        defaultValue={formValues.departement || ""}
        render={({ field }) => (
          <TextField
            {...field}
            select
            className="mt-8 mb-16"
            error={!!errors.departement}
            required
            helperText={errors?.departement?.message}
            label="Departement"
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
        defaultValue={formValues.projet || ""}
        render={({ field }) => (
          <TextField
            {...field}
            select
            className="mt-8 mb-16"
            error={!!errors.projet}
            required
            helperText={errors?.projet?.message}
            label="Departement"
            autoFocus
            id="poste"
            variant="outlined"
            fullWidth
          >
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
        defaultValue={formValues.equipe || ""}
        render={({ field }) => (
          <TextField
            {...field}
            select
            className="mt-8 mb-16"
            error={!!errors.equipe}
            required
            helperText={errors?.equipe?.message}
            label="Team"
            autoFocus
            id="equipe"
            variant="outlined"
            fullWidth
          >
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
