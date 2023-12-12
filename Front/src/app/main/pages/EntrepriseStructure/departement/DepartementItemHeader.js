import { useTheme } from '@mui/styles';
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { Button, Typography } from '@mui/material';
import axios from 'axios';

function DepartementItemHeader(props) {
    const {departementId} = props;
    const [departementData, setDepartementData] = useState();
    
    const theme = useTheme();

    const fetchDepartementData = () => {
        axios.get(`http://localhost:4000/api/departement/view/${departementId}`)
        .then((response) =>{
            setDepartementData(response.data.departement)
        })
        .catch((error) => {
            console.error('Erreur lors de la récupration des données', error)
        })
    }

    useEffect(() => {
        fetchDepartementData();
    }, [])





  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
        <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
                >
                    <Typography
                        className="flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to="/entreprise/structure"
                        color="inherit"
                    >
                        <FuseSvgIcon size={20}>
                            {theme.direction === 'ltr'
                                ? 'heroicons-outline:arrow-sm-left'
                                : 'heroicons-outline:arrow-sm-right'}
                        </FuseSvgIcon>
                        <span className="flex mx-4 font-medium">Départements</span>
                    </Typography>
                </motion.div>
                <div className="flex items-center max-w-full">
                    <motion.div
                        className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                        initial={{ x: -20 }}
                        animate={{ x: 0, transition: { delay: 0.3 } }}
                    >
                        <Typography className="text-16 sm:text-20 truncate font-semibold">{departementData?.nomDepartement} </Typography>
                        <Typography variant="caption" className="font-medium"> Détail du département </Typography>
                    </motion.div>
                </div>
            </div>
    </div>
  )
}

export default DepartementItemHeader
