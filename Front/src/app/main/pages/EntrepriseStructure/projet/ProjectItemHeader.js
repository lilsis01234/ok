import { useTheme } from '@mui/styles';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { Button, Typography } from '@mui/material';
import axios from 'axios';

function ProjectItemHeader(props) {
    const { projectId, departementId} = props;
    const [projectData, setProjectData] = useState([]);

    const theme = useTheme();

    const fetchProjetData = () => {
        axios.get(`http://localhost:4000/api/projet/view/${projectId}`)
            .then((response) => {
                setProjectData(response.data.projet)
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données', error)
            })
    }

   

    useEffect(() => {
        fetchProjetData();
    }, [])

    const navigate = useNavigate()

    const handleBackDepartementPage = () => {
        navigate('/entreprise/structure')
    }


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
                        to={`/entreprise/structure/${departementId}`}
                        color="inherit"
                    >
                        <FuseSvgIcon size={20}>
                            {theme.direction === 'ltr'
                                ? 'heroicons-outline:arrow-sm-left'
                                : 'heroicons-outline:arrow-sm-right'}
                        </FuseSvgIcon>
                        <span className="flex mx-4 font-medium">Projets</span>
                    </Typography>
                </motion.div>
                <div className="flex items-center max-w-full">
                    <motion.div
                        className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                        initial={{ x: -20 }}
                        animate={{ x: 0, transition: { delay: 0.3 } }}
                    >
                        <Typography className="text-16 sm:text-20 truncate font-semibold">{projectData.nomProjet} </Typography>
                        <Typography variant="caption" className="font-medium"> Détail du projets </Typography>
                    </motion.div>
                </div>
            </div>
            <motion.div
                className="flex"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
            >
                <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    //  disabled={!isDirty  || !isValid}
                    onClick={handleBackDepartementPage}
                >
                    Retourner à la pages départements
                </Button>
            </motion.div>
        </div>
    )
}

export default ProjectItemHeader
