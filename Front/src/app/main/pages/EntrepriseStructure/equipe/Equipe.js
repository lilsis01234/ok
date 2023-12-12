import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { Card, Divider, AvatarGroup, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';


function Equipe(props) {
    const { projectId, departementId} = props;
    const [equipe, setEquipe] = useState([]);

    const fetchEquipeData = () => {
        axios.get(`http://localhost:4000/api/projet/${projectId}/allTeams`)
            .then((response) => {
                setEquipe(response.data)
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données')
            })
    }

    useEffect(() => {
        fetchEquipeData();
    }, [])

    const container = {
        show: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }



    if (equipe.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    Ce projet ne possède aucun équipe associé!
                </Typography>
            </motion.div>
        );
    }


    return (
        <div className="flex grow shrink-0 flex-col items-center container p-24 sm:p-40" >
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mt-32 md:mt-64"
            >
                {equipe && equipe.map((equipeItem) => (
                       
                    <motion.div variants={item} className="min-w-full sm:min-w-224 min-h-360" key={equipeItem.equipe?.id}>
                        <Card
                            component={Link}
                            to={`/entreprise/structure/${departementId}/${projectId}/${equipeItem.equipe?.id}`}
                            role="button"
                            className="flex flex-col items-start w-full h-full p-24 rounded-lg shadow rounded-lg hover:shadow-xl transition-shadow duration-150 ease-in-out"
                        >
                            <div className="flex flex-col flex-auto justify-start items-start w-full">
                                <Typography className="mt-20 text-lg font-medium leading-5">{equipeItem.equipe?.nomEquipe}</Typography>
                                <Divider className="w-48 mt-24 h-2" />
                            </div>
                            <div className="flex flex-col flex-auto justify-end w-full">
                                <div className="flex items-center mt-24 -space-x-6">
                                    <AvatarGroup max={4}>
                                        {equipeItem?.membres.map((member) => (
                                            (
                                                member.image ? (
                                                    <Avatar key={member.id} src={`http://localhost:4000/${member.image}`} />
                                                ) : (
                                                    <Avatar key={member.id}>{member.nom ? member.nom[0] : '?'}</Avatar>
                                                )
                                            )
                                        ))}
                                    </AvatarGroup>
                                </div>
                            </div>
                            <div className="flex items-center mt-24 text-md font-md">
                                <Typography color="text.secondary">{equipeItem.equipe?.Projet?.nomProjet}</Typography>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div >
    )
}

export default Equipe
