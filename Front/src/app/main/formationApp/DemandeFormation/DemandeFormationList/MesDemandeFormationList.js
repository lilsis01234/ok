import FusePageSimple from '@fuse/core/FusePageSimple';
import { useThemeMediaQuery } from '@fuse/hooks'
import { Box, FormControl, FormControlLabel, InputLabel, Switch, TextField, Typography } from '@mui/material';
import { selectUser } from 'app/store/userSlice';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { DatePicker } from '@mui/x-date-pickers';

function MesDemandeFormationList() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

    const [mesDemandes, setMesDemandes] = useState()
    const [selectedData, handleDateChange] = React.useState(new Date());
    const [searchText, setSearchText] = useState();
    const [hideApprouve, setHideApprouve] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const auteur = user.data.CompteId


    const handleSelectMesDemandes = () => {
        axios.get(`http://localhost:4000/api/demande_formation/view/all/${auteur}`)
            .then(response => {
                setMesDemandes(response.data)
            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        handleSelectMesDemandes();
    }, [])



    function handleSearchText(event) {
        setSearchText(event.target.value);
    }


    return (
        <FusePageSimple
            header={
                <Box
                    className="relative overflow-hidden flex shrink-0 items-center justify-center px-16 py-32 md:p-64"
                    sx={{
                        backgroundColor: 'primary.main',
                        color: (theme) => theme.palette.getContrastText(theme.palette.primary.main),
                    }}
                >
                    <div className="flex flex-col items-center justify-center  mx-auto w-full">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0 } }}>
                            <Typography color="inherit" className="text-18 font-semibold">MES DEMANDES DE FORMATIONS</Typography>
                        </motion.div>

                    </div>
                </Box>
            }
            content={
                <div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
                    <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16">
                            <FormControl className="flex w-full sm:w-136" variant="outlined">
                                <DatePicker
                                    label="Date"
                                    value={selectedData}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </FormControl>
                            <TextField
                                label="Rechercher une demande de formation"
                                placeholder="Entrer un mot clé..."
                                className="flex w-full sm:w-256 mx-8"
                                value={searchText}
                                inputProps={{
                                    'aria-label': 'Search',
                                }}
                                onChange={handleSearchText}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <FormControlLabel
                            label="Masquer les demandes approuvées"
                            control={
                                <Switch
                                    onChange={(ev) => {
                                        setHideApprouve(ev.target.checked);
                                    }}
                                    checked={hideApprouve}
                                    name="hideApprouve"
                                />
                            }
                        />
                    </div>
                    {useMemo(() => {
                        const container = {
                            show: {
                                transition: {
                                    staggerChildren: 0.1,
                                }
                            }
                        };

                        const item = {
                            hidden: {
                                opacity: 0,
                                y: 20,
                            },
                            show: {
                                opacity: 1,
                                y: 0,
                            }
                        };

                        return (
                            mesDemandes && (
                                mesDemandes.length > 0 ? (
                                    <motion.div
                                        className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 mt-32 sm:mt-40"
                                        variants={container}
                                        initial="hidden"
                                        animate="show"
                                    >
                                        {mesDemandes.map((demande) => {
                                            return (
                                                <motion.div variants={item} key={demande.id}>

                                                </motion.div>
                                            )
                                        })}
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-1 items-center justify-center">
                                        <Typography color="text.secondary" className="text-24 my-24">
                                            Aucune demande trouvé !
                                        </Typography>
                                    </div>
                                )
                            )
                        )
                    }, [mesDemandes])}
                </div>
            }
        />
    )
}

export default MesDemandeFormationList
