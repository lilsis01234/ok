import { orange } from '@mui/material/colors';
import { lighten, styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseUtils from '@fuse/utils/FuseUtils';
import { Alert, Avatar, Button, Input, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';


const Root = styled('div')(({ theme }) => ({
    '& .collaboratorFileUpload': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: theme.spacing(2),
        // border: `2px dashed ${theme.palette.primary.main}`,
        // borderRadius: theme.shape.borderRadius,
        // cursor: 'pointer',
        transition: 'border-color 0.3s ease',

        '&:hover': {
            borderColor: theme.palette.secondary.main,
        },
    },

    '& .fileInput': {
        display: 'none',
    },

}));


function CollaborateurDataForm() {
    const { control, register, formState, setError, clearErrors } = useFormContext();
    const { errors } = formState || {}
    const dispatch = useDispatch()
    const [previewFile, setPreviewFile] = useState(null)

    return (
        <Root>
            <Alert severity="warning"> Veuillez lire attentivement les consignes avant de procéder à l'import.</Alert>
            <Controller
                name="excel"
                control={control}
                render={({ field }) => (
                    <Box className="collaboratorFileUpload">
                        <label htmlFor="fileInput">
                            <Input
                                type="file"
                                accept=".xlsx, .xls"
                                className="fileInput"
                                id="fileInput"
                                onChange={(e) => {
                                    const file = e.target.files[0]
                                    const isFileTypeValid = /\.(xlsx|xls)$/.test(file.name.toLowerCase());
                                    if (!isFileTypeValid) {
                                        dispatch(showMessage({ message: 'Veuillez télécharger un fichier Excel (.xlsx ou .xls).' }))
                                    } else {
                                        field.onChange(file)
                                        setPreviewFile(URL.createObjectURL(file))
                                    }

                                }}
                            />
                            {previewFile ? (
                                <>
                                    <div className='flex flex-col'>
                                        <Typography variant="caption" className='pb-20 text-lg font-semibold'>
                                            {field.value && field.value.name}
                                        </Typography>
                                        <Button variant="outlined" component="span">
                                            Remplacer le fichier
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <Button variant="outlined" component="span">
                                    Sélectionner un fichier
                                </Button>
                            )}
                        </label>
                        {/* {previewFile && (
                            <Typography variant="caption">
                                {field.value && field.value.name}
                            </Typography>
                        )} */}
                    </Box>
                )}
            />
            <Controller
                name='sheetName'
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required
                        helperText='Veuillez indiquer le nom de la feuille que vous voulez importer'
                        label="Nom de la feuille"
                        autoFocus
                        id="sheetName"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ shrink: !!field.value }}
                    />
                )}
            />
           

            

        </Root>
    )
}

export default CollaborateurDataForm
