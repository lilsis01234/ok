import { Avatar } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './ViewCollaborateur.css'

//pour modifier le rendu des dates
import moment from 'moment';
import 'moment/locale/fr'


const ViewCollaborateur = ({ CollabToView }) => {
    const [collab, setCollab] = useState({});

    useEffect(() => {
        axios.get(`http://192.168.16.244:4003/api/collaborateur/${CollabToView.id}`)
            .then((response) => {
                setCollab(response.data.collaborateur)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [CollabToView.id])

    //Modifier le rendu des dates
    const formattedDateBirth = moment(collab.dateNaissance).format('DD MMM YYYY');
    const formattedDateEmbauche = moment(collab.dateEmbauche).format('DD MMM YYYY');



    return (
        <div className="collabView">
            {collab && (
                <div className="flex flex-col items-center collabView m-15 p-15">
                    <Avatar src={`http://192.168.16.244:4003/${collab.image}`} alt={collab.nom} className="flex self-center m-5 collabView_Photo" />
                    <div className="collabView_Item">
                        <div className="flex flex-row items-start justify-start">
                            <div className="px-5 w-40">
                                <p className="font-bold text-[#9C1D21]">Matricule</p>
                                <p>{collab.matricule}</p>
                            </div>
                            <div className="px-5 w-64">
                                <p className="font-bold text-[#9C1D21]">Nom</p>
                                <p>{collab.nom}</p>
                            </div>
                            <div className="px-5 w-64">
                                <p className="font-bold text-[#9C1D21]">Prénom</p>
                                <p>{collab.prenom}</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-start justify-start pt-5">
                            <div className="px-5 w-64">
                                <p className="font-bold text-[#9C1D21]">Date de Naissance</p>
                                <p>{formattedDateBirth}</p>
                            </div>
                            <div className="px-5 w-64">
                                <p className="font-bold text-[#9C1D21]">Sexe</p>
                                <p>{collab.sexe}</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-start justify-start pt-5">
                            <div className="px-5 w-48">
                                <p className="font-bold text-[#9C1D21]">Lot</p>
                                <p>{collab.lot}</p>
                            </div>
                            <div className="px-5 w-48">
                                <p className="font-bold text-[#9C1D21]">Quartier</p>
                                <p>{collab.quartier}</p>
                            </div>
                            <div className="px-5 w-48">
                                <p className="font-bold text-[#9C1D21]">Ville</p>
                                <p>{collab.ville}</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-start justify-start pt-5">
                            <div className="px-5 w-48">
                                <p className="font-bold text-[#9C1D21]">Téléphone</p>
                                <p>{collab.tel}</p>
                            </div>
                        </div>
                        <div className="flex flex-row  justify-start pt-5">
                            <div className="px-5 w-48">
                                <p className="font-bold text-[#9C1D21]">Date d'embauche</p>
                                <p>{formattedDateEmbauche}</p>
                            </div>
                            <div className="px-5 w-48">
                                <p className="font-bold text-[#9C1D21]">Poste</p>
                                <p>{collab.Poste ? collab.Poste?.titrePoste : "Chargement ..."}</p>
                                {/* <p>{collab.Poste.titrePoste}</p> */}
                            </div>
                            <div className="px-5 w-48">
                                <p className="font-bold text-[#9C1D21]">Département</p>
                                <p>{collab.Poste ? collab.Poste?.Departement.nomDepartement : 'Chargement ...'}</p>
                            </div>
                            <div className="px-5 w-48">
                                <p className="font-bold text-[#9C1D21]">Site</p>
                                <p>{collab.site}</p>
                            </div>
                        </div>
                    </div>

                </div>

            )}

        </div>
    )
}

export default ViewCollaborateur
