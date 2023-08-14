import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Administrateur/NavBar/NavBarAdmin'
import SideBar from '../../Administrateur/SideBarAdmin/SideBar'
import HomeUser from '../../User/HomeUser/HomeUser'
import { Accordion, AccordionBody, AccordionHeader, Avatar, Button} from '@material-tailwind/react'
import './UserProfile.css'
import {MdModeEdit} from 'react-icons/md'
import Modal from 'react-modal'

import moment from 'moment'; 
import 'moment/locale/fr'



const Profil = () => {
    const role = localStorage.getItem('role')
    const idProfile = localStorage.getItem('id')
    const [collaborateurData, setCollaborateurData] = useState(null);

    const [open, setOpen] = useState(1);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const [alwaysOpen, setAlwaysOpen] = useState(true);
    const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur)

    const [compteData, setCompteData] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false)

    const CloseModal = () => {
        setIsModalOpen(false);
    }

    const OpenModal = () => {
        setIsModalOpen(true)
    }


    useEffect(() => {
        axios.get(`http;//localhost:4000/api/user/profile/${idProfile}`)
            .then(response => {
                setCollaborateurData(response.data)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations du collaborateur connecté', error)
            })
    }, [idProfile])

    useEffect(() => {
        axios.get(`http;//localhost:4000/api/user/account/${idProfile}`)
            .then(response => {
                setCompteData(response.data)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des emails du collaborateur', error)
            })
    }, [idProfile])
    



    if (!collaborateurData) {
        return <div>Chargement en cours ...</div>
    }

    const formattedDateBirth = moment(collaborateurData.dateNaissance).format('DD MMMM YYYY');
    const formattedDateEmbauche = moment(collaborateurData.dateEmbauche).format('DD MMMM YYYY')

  


    return (
        <div className="page">
            {role === 'Administrateur' ?
                <Navbar /> : <HomeUser />
            }
            <div className="content">
                {role === 'Administrateur' ?
                    <SideBar /> : <h1>SideBar User</h1>
                }
                <div className="main-content">
                    <div className="bg-black rounded-md userProfile flex flex-row">
                        <div className="m-8 p-5 grid grid-row-3">
                            <Avatar src={`http;//localhost:4000/${collaborateurData.image}`} variant="rounded" className="row-span-2 imagePhoto"/>
                            <Button className="h-10 flex flex-row justify-center bg-[#9C1D21]" onClick={()=>{OpenModal()}}><MdModeEdit/>Modifier</Button>
                        </div>
                        <div className="bg-white m-5 p-5 rounded-md w-full">
                            <Accordion open={alwaysOpen}>
                                <AccordionHeader onClick={handleAlwaysOpen} className="font-[Poppins]">Informations personnelle</AccordionHeader>
                                <AccordionBody className="font-[Poppins]">
                                    <div className="grid grid-cols-12 px-10">
                                        <div className="col-span-4">
                                            <p className="font-bold text-[#9C1D21]">Matricule</p>
                                            <p>{collaborateurData.matricule}</p>
                                        </div>
                                        <div className="col-span-4">
                                            <p className="font-bold text-[#9C1D21]">Nom</p>
                                            <p>{collaborateurData.nom}</p>
                                        </div>
                                        <div className="col-span-4">
                                            <p className="font-bold text-[#9C1D21]">Prénom</p>
                                            <p>{collaborateurData.prenom}</p>
                                        </div>

                                    </div>
                                    <div className="grid grid-cols-12 px-10 py-3">
                                        <div className="col-span-4">
                                            <p className="font-bold text-[#9C1D21]">Date de Naissance</p>
                                            <p>{formattedDateBirth}</p>
                                        </div>
                                        <div className="col-span-4">
                                            <p className="font-bold text-[#9C1D21]">Sexe</p>
                                            <p>{collaborateurData.sexe}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 px-10 py-3">
                                        <div className="col-span-4">
                                            <p className="font-bold text-[#9C1D21]">Lot</p>
                                            <p>{collaborateurData.lot}</p>
                                        </div>
                                        <div className="col-span-4">
                                            <p className="font-bold text-[#9C1D21]">Quartier</p>
                                            <p>{collaborateurData.quartier}</p>
                                        </div>
                                        <div className="col-span-4">
                                            <p className="font-bold text-[#9C1D21]">Ville</p>
                                            <p>{collaborateurData.ville}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 px-10 py-3">
                                        <div className="col-span-4">
                                            <p className="font-bold text-[#9C1D21]">Tel</p>
                                            <p>{collaborateurData.tel}</p>
                                        </div>
                                        <div className="col-span-4 ">
                                            <p className="font-bold text-[#9C1D21]">Email</p>
                                            <p>{compteData}</p>
                                        </div>
                                    </div>
                                </AccordionBody>
                            </Accordion>
                            <Accordion open={open === 2}>
                                <AccordionHeader onClick={() => handleOpen(2)} className="font-[Poppins]"> Informations professionnelle </AccordionHeader>
                                <AccordionBody className="font-[Poppins]">
                                    <div className="grid grid-cols-12 px-10">
                                        <div className="col-span-4 ">
                                            <p className="font-bold text-[#9C1D21]">Date d'embauche</p>
                                            <p>{formattedDateEmbauche}</p>
                                        </div>
                                        <div className="col-span-4 ">
                                            <p className="font-bold text-[#9C1D21]">Poste</p>
                                            <p>{collaborateurData.Poste.titrePoste}</p>
                                        </div>
                                        <div className="col-span-4 ">
                                            <p className="font-bold text-[#9C1D21]">Département</p>
                                            <p>{collaborateurData.Poste.Departement.nomDepartement}</p>
                                        </div>
                                    </div>
                                </AccordionBody>
                            </Accordion>
                        </div>
                    </div>
                    <div>
                        <Modal
                            isOpen = {isModalOpen}
                            onRequestClose = {CloseModal}
                            style = {
                                {
                                    content : {
                                        width : '1000px',
                                        height : '700px',
                                        borderRadius : '10px',
                                        margin: 'auto',
                                        top : '0',
                                        bottom : '0',
                                        left : '0',
                                        right : '0',
                                    }
                                }
                            }
                        >
                              <h2 className="font-bold text-2xl text-center font-['Poppins']">Modifier mes informations personnelles</h2>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profil
