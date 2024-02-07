import React from 'react'
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function AproposTab(props) {
    const { userData } = props;
    const [collabSameDepartement, setCollabSameDepartement] = useState([])
    const [collabSameProject, setCollabSameProject] = useState([])

    const collabId = userData.Profil_Collab?.id
    const collabDepartement = userData.Profil_Collab?.departement
    const collabProjet = userData.Profil_Collab?.projet

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
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données', error)
            })
    }

    useEffect(() => {
        fetchCollabProjet()
    }, [collabId, collabProjet])

    const item = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0 },
    };


    const container = {
        show: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const formattedDateBirth = moment(userData.Profil_Collab?.dateNaissance).format('DD MMMM YYYY');
    const formattedDateDelivrance = moment(userData.Profil_Collab?.dateDelivrance).format('DD MMMM YYYY');
    const formattedDateEmbauche = moment(userData.Profil_Collab?.dateEmbauche).format('DD MMMM YYYY')

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
                                    <Typography className="font-semibold mb-4 text-15">Date de naissance</Typography>
                                    <Typography>{formattedDateBirth}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Lieu de naissance</Typography>
                                    <Typography>{userData.Profil_Collab?.lieuNaissance}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Sexe</Typography>
                                    <Typography> {userData.Profil_Collab?.sexe}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Adresse</Typography>
                                    <Typography>{userData.Profil_Collab?.lot} {userData.Profil_Collab?.quartier} {userData.Profil_Collab?.quartier}</Typography>
                                </div>
                                {userData.Profil_Collab?.adresse2 && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Deuxième Adresse</Typography>
                                        <Typography>{userData.Profil_Collab?.adresse2}</Typography>
                                    </div>
                                )}
                                {userData.Profil_Collab?.CIN && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">CIN</Typography>
                                        <Typography>{userData.Profil_Collab?.CIN}</Typography>
                                    </div>
                                )}
                                {userData.Profil_Collab?.dateDelivrance && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Date de délivrance</Typography>
                                        <Typography>{formattedDateDelivrance}</Typography>
                                    </div>
                                )}
                                {userData.Profil_Collab?.lieuDelivrance && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Lieu de délivrance</Typography>
                                        <Typography>{userData.Profil_Collab?.lieuDelivrance}</Typography>
                                    </div>
                                )}
                                {userData.Profil_Collab?.statutmatrimoniale && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Statut matrimoniale</Typography>
                                        <Typography>{userData.Profil_Collab?.statutmatrimoniale}</Typography>
                                    </div>
                                )}
                                {userData.Profil_Collab?.nbEnfant && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Nombre d'enfant</Typography>
                                        <Typography>{userData.Profil_Collab?.nbEnfant}</Typography>
                                    </div>
                                )}





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
                                    <Typography>{userData.Profil_Collab?.poste1?.titrePoste}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Département</Typography>
                                    <Typography>{userData.Profil_Collab?.departement1?.nomDepartement}</Typography>
                                </div>
                                {userData.Profil_Collab?.projet1?.nomProjet && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Projet</Typography>
                                        <Typography>{userData.Profil_Collab?.projet1?.nomProjet}</Typography>
                                    </div>
                                )}
                                {userData.Profil_Collab?.equipe1?.nomEquipe && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Equipe</Typography>
                                        <Typography>{userData.Profil_Collab?.equipe1?.nomEquipe}</Typography>
                                    </div>
                                )}
                                {userData.Profil_Collab?.shift && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Shift</Typography>
                                        <Typography>{userData.Profil_Collab?.shift}</Typography>
                                    </div>
                                )}
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Site</Typography>
                                    <Typography>{userData.Profil_Collab?.sites?.nomSite}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Entreprise</Typography>
                                    <Typography>{userData.Profil_Collab?.entreprise}</Typography>
                                </div>
                                {userData.Profil_Collab?.postes?.titrePoste && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Deuxième Poste</Typography>
                                        <Typography>{userData.Profil_Collab?.postes?.titrePoste}</Typography>
                                    </div>
                                )}
                                {userData.Profil_Collab?.departements?.nomDepartement && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Deuxième Département</Typography>
                                        <Typography>{userData.Profil_Collab?.departements?.nomDepartement}</Typography>
                                    </div>
                                )}
                                {userData.Profil_Collab?.projets?.nomProjet && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Deuxième Projet</Typography>
                                        <Typography>{userData.Profil_Collab?.projets?.nomProjet}</Typography>
                                    </div>
                                )}
                                {userData.Profil_Collab?.projets?.equipes && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Deuxième Equipe</Typography>
                                        <Typography>{userData.Profil_Collab?.projets?.equipes}</Typography>
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
                                    <Typography>{userData.email}</Typography>
                                </div>

                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Téléphone</Typography>
                                    <Typography>{userData.Profil_Collab?.tel}</Typography>
                                </div>
                                {userData.Profil_Collab?.tel2 && (
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Deuxième Téléphone</Typography>
                                        <Typography>{userData.Profil_Collab?.tel2}</Typography>
                                    </div>
                                )}
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

export default AproposTab
