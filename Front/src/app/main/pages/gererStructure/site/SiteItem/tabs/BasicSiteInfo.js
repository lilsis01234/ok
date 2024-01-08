import { MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import axios, { formToJSON } from 'axios';

function BasicSiteInfo(props) {
    const { methods, formValues } = props;
    const { control, formState } = methods || {};
    const { errors } = formState || {};

    if (!methods) {
        return null;
    }


    return (
        <div>
            <Controller
                name="nomSite"
                control={control}
                defaultValue={formValues.nomSite || ''}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.nomSite}
                        required
                        helperText={errors?.nomSite?.message}
                        label="Nom du site"
                        autoFocus
                        id="nomSite"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
        </div>
    )
}

export default BasicSiteInfo
