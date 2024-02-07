import React from 'react'
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';

function CollaborateurProfileContent(props) {
    const { collabData } = props
    const [collabSameDepartement, setCollabSameDepartement] = useState([])
    const [collabSameProject, setCollabSameProject] = useState([])

    const collabId = collabData.Profil_Collab?.id
    const collabDepartement = collabData.Profil_Collab?.departement
    const collabProjet = collabData.Profil_Collab?.projet

    const fetchCollabData = () => {
        axios.get(`http://localhost:4000/api/collaborateur/sameDepartement/${collabId}/${collabDepartement}`)
            .then((response) => {
                setCollabSameDepartement(response.data)
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données', error)
            })
    }


    useEffect(() => {
        fetchCollabData()
    }, [collabId, collabDepartement])


    const fetchCollabProjet = () => {
        axios.get(`http://localhost:4000/api/collaborateur/sameProject/${collabId}/${collabProjet}`)
        .then((response) => {
            setCollabSameProject(response.data)
            // console.log(response.data)
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération des données', error)
        })
    }

    useEffect(() => {
        fetchCollabProjet()
    }, [collabId, collabProjet])

    const container = {
        show: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div className="flex flex-auto justify-center w-full max-w-5xl mx-auto p-24 sm:p-32">
            <motion.div variants={container} initial="hidden" animate="show" className="w-full">
                <div className="md:flex">
                    <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
                        <Card component={motion.div} variants={item} className="w-full mb-32">
                            <div className="px-32 pt-24">
                                <Typography className="text-2xl font-semibold leading-tight">
                                    Information générale
                                </Typography>
                            </div>
                            <CardContent className="px-32 py-24">
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Sexe</Typography>
                                    <Typography>{collabData.Profil_Collab?.sexe}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Adresse</Typography>
                                    <Typography>{collabData.Profil_Collab?.quartier}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Site</Typography>
                                    <Typography>{collabData.Profil_Collab?.sites?.nomSite}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Entreprise</Typography>
                                    <Typography>{collabData.Profil_Collab?.entreprise}</Typography>
                                </div>

                            </CardContent>

                        </Card>

                        <Card component={motion.div} variants={item} className="w-full mb-32">
                            <div className="px-32 pt-24">
                                <Typography className="text-2xl font-semibold leading-tight">
                                    Travail
                                </Typography>
                            </div>
                            <CardContent className="px-32 py-24">
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Postes</Typography>
                                    <Typography>{collabData.Profil_Collab?.poste1?.titrePoste}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Département</Typography>
                                    <Typography>{collabData.Profil_Collab?.departement1?.nomDepartement}</Typography>
                                </div>
                                {collabData.Profil_Collab?.projet1?.nomProjet && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Projet</Typography>
                                        <Typography>{collabData.Profil_Collab?.projet1?.nomProjet}</Typography>
                                    </div>
                                )}
                                {collabData.Profil_Collab?.equipe1?.nomEquipe && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Equipe</Typography>
                                        <Typography>{collabData.Profil_Collab?.equipe1?.nomEquipe}</Typography>
                                    </div>
                                )}
                                {collabData.Profil_Collab?.shift && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Shift</Typography>
                                        <Typography>{collabData.Profil_Collab?.shift}</Typography>
                                    </div>
                                )}
                                {collabData.Profil_Collab?.postes?.titrePoste && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Deuxième Poste</Typography>
                                        <Typography>{collabData.Profil_Collab?.postes?.titrePoste}</Typography>
                                    </div>
                                )}
                                {collabData.Profil_Collab?.departements?.nomDepartement && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Deuxième Département</Typography>
                                        <Typography>{collabData.Profil_Collab?.departements?.nomDepartement}</Typography>
                                    </div>
                                )}
                                {collabData.Profil_Collab?.projets?.nomProjet && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Deuxième Projet</Typography>
                                        <Typography>{collabData.Profil_Collab?.projets?.nomProjet}</Typography>
                                    </div>
                                )}
                                {collabData.Profil_Collab?.projets?.equipes && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Deuxième Equipe</Typography>
                                        <Typography>{collabData.Profil_Collab?.projets?.equipes}</Typography>
                                    </div>
                                )}



                            </CardContent>

                        </Card>
                        <Card component={motion.div} variants={item} className="w-full mb-32">
                            <div className="px-32 pt-24">
                                <Typography className="text-2xl font-semibold leading-tight">
                                    Contacts
                                </Typography>
                            </div>
                            <CardContent className="px-32 py-24">
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Email</Typography>
                                    <Typography>{collabData.email}</Typography>
                                </div>

                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Téléphone</Typography>
                                    <Typography>{collabData.Profil_Collab?.tel}</Typography>
                                </div>
                            </CardContent>

                        </Card>
                    </div>
                    <div className="flex flex-col md:w-320">
                        <Card component={motion.div} variants={item} className="w-full mb-32">
                            <div className="flex items-center px-32 pt-24">
                                <Typography className="flex flex-1 text-2xl font-semibold leading-tight">
                                    De la même département
                                </Typography>
                            </div>
                            <CardContent className="flex flex-wrap px-32">
                                {collabSameDepartement.map((collab) => (
                                    <React.Fragment key={collab.id}>
                                        {collab.image ? (
                                            <Avatar
                                                key={collab.id}
                                                className="w-64 h-64 rounded-12 m-4"
                                                alt={collab.nom}
                                                src={`http://localhost:4000/${collab.image}`}
                                            />
                                        ) : (
                                            <Avatar
                                                key={collab.id}
                                                className="w-64 h-64 rounded-12 m-4"
                                                alt={collab.nom}
                                            >
                                                {collab.nom ? collab.nom[0] : '?'}
                                            </Avatar>
                                        )}
                                    </React.Fragment>
                                ))
                                }
                            </CardContent>
                        </Card>
                        {collabSameProject.length != 0 && (
                                <Card component={motion.div} variants={item} className="w-full mb-32">
                                <div className="flex items-center px-32 pt-24">
                                    <Typography className="flex flex-1 text-2xl font-semibold leading-tight">
                                        De la même projet
                                    </Typography>
                                </div>
                                <CardContent className="flex flex-wrap px-32">
                                    {collabSameProject.map((collab) => (
                                        <React.Fragment key={collab.id}>
                                            {collab.image ? (
                                                <Avatar
                                                    key={collab.id}
                                                    className="w-64 h-64 rounded-12 m-4"
                                                    alt={collab.nom}
                                                    src={`http://localhost:4000/${collab.image}`}
                                                />
                                            ) : (
                                                <Avatar
                                                    key={collab.id}
                                                    className="w-64 h-64 rounded-12 m-4"
                                                    alt={collab.nom}
                                                >
                                                    {collab.nom ? collab.nom[0] : '?'}
                                                </Avatar>
                                            )}
                                        </React.Fragment>
                                    ))
                                    }
                                </CardContent>
                            </Card>
                        )}
                    

                    </div>
                </div>
            </motion.div>

        </div>
    )
}

export default CollaborateurProfileContent
