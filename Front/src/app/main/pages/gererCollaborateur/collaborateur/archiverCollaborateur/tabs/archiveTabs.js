import { TextField } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';
import { fr } from 'date-fns/locale';
import moment from 'moment';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";


function ArchiveTabs(props) {
    const { methods, formValues } = props;
    const { control, formState } = methods || {};
    const { errors } = formState || {};

    if (!methods) {
        return null;
    }

    return (
        <div>
            <Controller
                name="statut"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.statut}
                        required
                        helperText={errors?.statut?.message}
                        label="Pourquoi voulez vous archiver ce collaborateur?"
                        autoFocus
                        id="statut"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ shrink: !!field.value }}
                    />
                )}

            />
            <Controller
                name="dateDebauche"
                control={control}
                defaultValue={formValues.dateDebauche ? moment(formValues.dateDebauche).toDate() : moment().toDate()}
                render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={fr}>
                        <DatePicker
                            {...field}
                            value={field.value ? moment(field.value).toDate() : null}
                            onChange={(date) => {
                                field.onChange(date);
                            }}
                            label="Date de Débauche"
                            required
                            error={!!errors.dateDebauche}
                            helperText={errors?.dateDebauche?.message}
                            fullWidth
                            format="dd/MM/yyyy"
                        />
                    </LocalizationProvider>
                )}
            />

        </div>
    )
}

export default ArchiveTabs
