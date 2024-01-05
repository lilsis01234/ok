import { orange } from '@mui/material/colors';
import { lighten, styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseUtils from '@fuse/utils/FuseUtils';
import { Avatar, Button, Input, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';


//Création d'un composant stylisé
// const Root = styled('div')(({ theme }) => ({
//     '& .productImageFeaturedStar': {
//         position: 'absolute',
//         top: 0,
//         right: 0,
//         color: orange[400],
//         opacity: 0,
//     },

//     '& .productImageUpload': {
//         transitionProperty: 'box-shadow',
//         transitionDuration: theme.transitions.duration.short,
//         transitionTimingFunction: theme.transitions.easing.easeInOut,
//     },

//     '& .productImageItem': {
//         transitionProperty: 'box-shadow',
//         transitionDuration: theme.transitions.duration.short,
//         transitionTimingFunction: theme.transitions.easing.easeInOut,
//         '&:hover': {
//             '& .productImageFeaturedStar': {
//                 opacity: 0.8,
//             },
//         },
//         '&.featured': {
//             pointerEvents: 'none',
//             boxShadow: theme.shadows[3],
//             '& .productImageFeaturedStar': {
//                 opacity: 1,
//             },
//             '&:hover .productImageFeaturedStar': {
//                 opacity: 1,
//             },
//         },
// }}))

// const Root = styled('div')(({ theme }) => ({
//     '& .collaboratorPhotoUpload': {
//        transitionProperty: 'box-shadow',
//        transitionDuration: theme.transitions.duration.short,
//        transitionTimingFunction: theme.transitions.easing.easeInOut,
//     },
//  }));

const Root = styled('div')(({ theme }) => ({
    '& .collaboratorPhotoUpload': {
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

    '& .avatarPreview': {
        width: theme.spacing(25),
        height: theme.spacing(25),
        marginBottom: theme.spacing(1),
    },
}));


function validateFileSize(file) {
    const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
    return file.size <= maxSizeInBytes;
  }
  



//Création d'un composant fonctionnel
function PictureCollab(props) {
    const { methods, formValues } = props;
    const { control, formState } = methods || {};
    const { errors } = formState || {};
    const [previewImage, setPreviewImage] = useState(null);
    const dispatch = useDispatch();


    if (!methods) {
        return null;
    }

    return (
        <Root>
            <Controller
                name="image"
                control={control}
                render={({ field }) => (
                    // <Box
                    //     sx={{
                    //         backgroundColor: (theme) =>
                    //             theme.palette.mode === 'light'
                    //                 ? lighten(theme.palette.background.default, 0.4)
                    //                 : lighten(theme.palette.background.default, 0.02),
                    //     }}
                    //     component="label"
                    //     htmlFor="button-file"
                    //     className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                    // >
                    // <Input
                    //     type="file"
                    //     accept="image/*"
                    //     onChange={(e) => field.onChange(e.target.files[0])}
                    // />
                    // </Box>
                    <Box className="collaboratorPhotoUpload">
                        <label htmlFor="fileInput">
                            <Input
                                type="file"
                                accept="image/*"
                                className="fileInput"
                                id="fileInput"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (validateFileSize(file)) {
                                      field.onChange(file);
                                      setPreviewImage(URL.createObjectURL(file));
                                    } else {
                                      field.onChange(null);
                                      setPreviewImage(null);
                                      dispatch(showMessage({ message : 'La taille de l\'image dépasse 2 Mo. Veuillez sélectionner une image plus petite.'}));
                                    }
                                }}
                            />
                            {previewImage ? (
                                <>
                                    <Avatar src={previewImage} alt="Preview" className="avatarPreview" />
                                    <Button variant="outlined" component="span">
                                        Remplacer l'image
                                    </Button>
                                </>
                            ) : (
                                <Button variant="outlined" component="span">
                                    Sélectionner une image
                                </Button>
                            )}
                        </label>
                        {previewImage && (
                            <Typography variant="caption">
                                {field.value && field.value.name}
                            </Typography>
                        )}
                    </Box>
                )}
            />
            {errors.image && (
                <Typography variant="caption" color="error">
                    {errors.image.message}
                </Typography>
            )}
            {/* )}
            /> */}
        </Root>
    )
}




export default PictureCollab
