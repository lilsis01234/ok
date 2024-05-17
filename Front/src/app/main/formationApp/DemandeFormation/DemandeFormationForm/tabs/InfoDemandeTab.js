import { MenuItem, TextField } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';

function InfoDemandeTab(props) {
    const { methods, formValues } = props;
    const { control, formState } = methods || {};
    const { errors } = formState || {};

    if (!methods) {
        return null;
    }


    return (
        <div>
            <Controller
                name="titre"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.titre}
                        required
                        helperText={errors?.titre?.message}
                        label="Nom de la Formation"
                        autoFocus
                        id="titre"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ shrink: !!field.value }}
                    />
                )}

            />
            <Controller
                name="details"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.details}
                        required
                        helperText={errors?.details?.message}
                        label="Détails"
                        autoFocus
                        multiline
                        rows={4}
                        id="detail"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ shrink: !!field.value }}
                    />
                )}
            />
            <Controller
                name="typeFormation"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        select
                        value={field.value || 'Public'}
                        className="mt-8 mb-16"
                        error={!!errors.typeFormation}
                        required
                        //  helperText={errors?.statutmatrimoniale?.message}
                        helperText="Veuillez remplir les formulaires de critère de confidentialité dans le prochaine onglet si la confidentialité est privée."
                        label="Confidentialité de la formation"
                        autoFocus
                        id="typeFormation"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ shrink: !!field.value }}
                    >
                        <MenuItem value="Public">Public</MenuItem>
                        <MenuItem value="Privé">Privé</MenuItem>
                    </TextField>
                )}
            />
        </div>
    )
}

export default InfoDemandeTab
