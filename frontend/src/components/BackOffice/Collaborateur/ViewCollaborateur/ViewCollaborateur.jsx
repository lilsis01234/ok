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
        axios.get(`http://localhost:4000/api/collaborateur/view/${CollabToView.id}`)
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
    const formattedDateDelivrance = moment(collab.dateDelivrance).format('DD MMM YYYY');



    return (
        <div className="collabView">
            {collab && (
                <div className="flex flex-col items-center collabView m-15 p-15">
                    <Avatar src={`http://localhost:4000/${collab.image}`} alt={collab.nom} className="flex self-center m-5 collabView_Photo" />
                    <div className="collabView_Item">
                        <div className="grid grid-cols-12 my-3">
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Matricule</p>
                                <p>{collab.matricule}</p>
                            </div>
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Nom</p>
                                <p>{collab.nom}</p>
                            </div>
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Prénom</p>
                                <p>{collab.prenom}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 my-3">
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Date de Naissance</p>
                                <p>{formattedDateBirth}</p>
                            </div>
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Lieu de Naissance</p>
                                <p>{collab.lieuNaissance}</p>
                            </div>

                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Sexe</p>
                                <p>{collab.sexe}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 my-3">
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Lot</p>
                                <p>{collab.lot}</p>
                            </div>
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Quartier</p>
                                <p>{collab.quartier}</p>
                            </div>
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Ville</p>
                                <p>{collab.ville}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 my-3">
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Téléphone</p>
                                <p>{collab.tel}</p>
                            </div>
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Téléphone d'urgence</p>
                                <p>{collab.telurgence}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 my-3">
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">CIN</p>
                                <p>{collab.CIN}</p>
                            </div>
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Date de délivrance</p>
                                <p>{formattedDateDelivrance}</p>
                            </div>
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Lieu de délivrance</p>
                                <p>{collab.lieuDelivrance}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 my-3">
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Statut matrimoniale</p>
                                <p>{collab.statutmatrimoniale}</p>
                            </div>
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Nombre d'enfant</p>
                                <p>{collab.nbEnfant}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 my-3">
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Date d'embauche</p>
                                <p>{formattedDateEmbauche}</p>
                            </div>
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Poste</p>
                                <p>{collab.poste1 ? collab.poste1?.titrePoste : "Chargement ..."}</p>
                                {/* <p>{collab.Poste.titrePoste}</p> */}
                            </div>
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Département</p>
                                <p>{collab.departement1 ? collab.departement1?.nomDepartement : 'Chargement ...'}</p>
                            </div>

                        </div>
                        <div className="grid grid-cols-12 my-3">
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Site</p>
                                <p>{collab.site}</p>
                            </div>
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Entreprise</p>
                                <p>{collab.entreprise}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 my-3">
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Catégorie</p>
                                <p>{collab.categorie}</p>
                            </div>
                            <div className="col-span-4">
                                <p className="font-bold text-[#9C1D21]">Contrat</p>
                                <p>{collab.contrat}</p>
                            </div>
                        </div>
                        {collab.postes && (
                            <div className="grid grid-cols-12 my-3">
                                <div className="col-span-4">
                                    <p className="font-bold text-[#9C1D21]">Deuxième poste</p>
                                    <p>{collab.postes.titrePoste}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-[#9C1D21]">Département </p>
                                    <p>{collab.departements.nomDepartement}</p>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            )}


        </div>
    )
}

export default ViewCollaborateur
