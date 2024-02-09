import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, Switch, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';

const schema = yup.object().shape({
    titleEvents: yup.string().required('Veuillez entrer le titre de l\'évenement.')
})


function EventDialog(props) {

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const { reset, watch, control, onChange, formState, handleSubmit } = methods || {}
    const { errors } = formState || {}

    const eventStart = watch('eventStart');
    const eventEnd = watch('eventEnd');



    return (
        <Popover
            anchorReference="anchorPosition"
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            // onClose={closeComposeDialog}
            component="form"
        >
            <div className="flex flex-col max-w-full p-24 pt-32 sm:pt-40 sm:p-32 w-480">
                <div className="flex sm:space-x-24 mb-16">
                    <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:pencil-alt
                    </FuseSvgIcon>
                    <Controller
                        name="titleEvents"
                        control={control}
                        render={({ field }) => {
                            <TextField
                                {...field}
                                id="titleEvents"
                                label="Titre de l' évènement"
                                className="flex-auto"
                                error={!!errors.titleEvents}
                                helperText={errors?.titleEvents?.message}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                autoFocus
                                required
                                fullWidth
                            />
                        }}
                    />
                </div>
                <div className="flex sm:space-x-24 mb-16">
                    <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                        heroicons-outline:calendar
                    </FuseSvgIcon>
                    <div className="w-full">
                        <div className="flex flex-column sm:flex-row w-full items-center space-x-16">
                            <Controller
                                name="eventStart"
                                control={control}
                                render={
                                    ({ field: { onChange, value } }) => (
                                        <DateTimePicker
                                            className="mt-8 mb-16 w-full"
                                            value={new Date(value)}
                                            onChange={onChange}
                                            slotProps={{
                                                textField: {
                                                    label: 'Début',
                                                    variant: 'outlined',
                                                },
                                            }}
                                            maxDate={end}
                                        />
                                    )
                                }
                            />
                            <Controller
                                name="end"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <DateTimePicker
                                        className="mt-8 mb-16 w-full"
                                        value={new Date(value)}
                                        onChange={onChange}
                                        slotProps={{
                                            textField: {
                                                label: 'Fin',
                                                variant: 'outlined',
                                            },
                                        }}
                                        minDate={start}
                                    />
                                )}
                            />
                            <Controller
                                name="allDay"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <FormControlLabel
                                        className="mt-8"
                                        label="Toute la journée"
                                        control={
                                            <Switch
                                                onChange={(ev) => {
                                                    onChange(ev.target.checked);
                                                }}
                                                checked={value}
                                                name="allDay"
                                            />
                                        }
                                    />
                                    
                                )}
                            />
                        </div>
                    </div>

                    {/* Label en static */}
                    <div className="flex sm:space-x-24 mb-16">
                        <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
                            heroicons-outline:tag
                        </FuseSvgIcon>
              
                    </div>
                </div>

            </div>
        </Popover>
    )
}

export default EventDialog
