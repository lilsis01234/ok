import FusePageSimple from '@fuse/core/FusePageSimple';
import { useThemeMediaQuery } from '@fuse/hooks'
import { Box, FormControl, InputLabel, Typography } from '@mui/material';
import { selectUser } from 'app/store/userSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function MesDemandeFormationList() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

    const [mesDemandes, setMesDemandes] = useState()
    const [filteredData, setFilteredData] = useState(null);
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
                               <InputLabel  id="category-select-label">Date </InputLabel>     
                            </FormControl>
                        </div>
                    </div>
                </div>
            }
        />
    )
}

export default MesDemandeFormationList
