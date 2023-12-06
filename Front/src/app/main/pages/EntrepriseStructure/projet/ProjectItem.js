import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Tab, Tabs } from '@mui/material'
import axios from 'axios'
import { motion } from 'framer-motion';
import CollaborateurList from '../tabs/CollaborateurList'
import ProjectItemHeader from './ProjectItemHeader'
import Equipe from '../equipe/Equipe'

function ProjectItem() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const { projectId, departementId } = useParams();
    const [tabValue, setTabValue] = useState(0);
    const [collaborateur, setCollaborateur] = useState(0);

    function handleTabChange(event, value) {
        setTabValue(value)
    }

    const fetchCollabData = () => {
        axios.get(`http://localhost:4000/api/projet/${projectId}/allCollab`)
            .then((response) => {
                setCollaborateur(response.data)

            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données', error)
            })
    }

    useEffect(() => {
        fetchCollabData();
    }, [])

    const container = {
        show: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };




    return (
        <FusePageCarded
            // header={<DepartementItemHeader departementId={departementId} />}
            header = {<ProjectItemHeader projectId={projectId}  departementId={departementId}/>}
            content={
                <>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{ root: 'w-full h-64 border-b-1' }}
                    >

                        <Tab className="h-64" label="Equipes" />
                        <Tab className="h-64" label="Collaborateurs" />
                    </Tabs>
                    <div>
                        <div className={tabValue !== 0 ? 'hidden' : ''}>
                            {/* <Projet departementId={departementId} /> */}
                            <Equipe projectId={projectId} departementId={departementId}/>
                        </div>
                        <div className={tabValue !== 1 ? 'hidden' : ''}>
                            <motion.div
                                className="flex flex-wrap p-24"
                                variants={container}
                                initial="hidden"
                                animate="show"
                            >
                                <motion.div variants={item} className="widget flex w-full">
                                    <CollaborateurList collaborateur={collaborateur} />
                                </motion.div>
                            </motion.div>

                        </div>
                    </div>
                </>
            }
            scroll={isMobile ? 'normal' : 'content'}
        />
    )
}

export default ProjectItem
