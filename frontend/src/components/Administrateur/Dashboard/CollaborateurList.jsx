import axios from 'axios'
import React, { useState, useEffect } from 'react'
import '../../../tailwind.css'
import {Avatar} from "@material-tailwind/react";
import Modal from 'react-modal';
import ViewCollaborateur from '../Collaborateur/ViewCollaborateur/ViewCollaborateur'

Modal.setAppElement('#root');


const NewCollaborateurList = () => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios
            .get("http://192.168.16.244:4003/api/collaborateur/listes_derniers_embauches")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    //Pour afficher les informations sur les nouveaux collaborateurs
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const [collabToView, setCollabToView] = useState(null);

    const viewCollab = (collabToView) => {
        const selectCollab = data.find((collab) => collab.id === collabToView)
        console.log(selectCollab)
        setCollabToView(selectCollab);
        console.log(collabToView)
    }

  return (
    <>
    <h2 className="dashboard_table_title">Liste des nouveaux collaborateurs </h2>
    <table className="dashboard_table_item">
        <thead>
            <tr>
                <th className="table_item_photo"> </th>
                <th className="table_item_matricule">Matricule</th>
                <th className="table_item_nom">Nom</th>
                <th className="table_item_prenom">Prénom</th>
                <th className="table_item_site">Site</th>
                <th className="table_item_poste">Poste</th>
                <th className="table_item_departement">Département</th>
            </tr>
        </thead>
        <tbody>
            {data.map((collaborateur, index) => (
                <tr key={index} onClick={() => {viewCollab(collaborateur.id); openModal()}}>
                    <td className="table_item_photo">
                        <Avatar src={`http://192.168.16.244:4003/${collaborateur.image}`} alt="avatar" withBorder={false} size="xs"  className="rounded-full w-16 h-16 object-cover collab_photo"/>
                    </td>
                    <td className="table_item_matricule">{collaborateur.matricule}</td>
                    <td className="table_item_nom">{collaborateur.nom}</td>
                    <td className="table_item_prenom">{collaborateur.prenom}</td>
                    <td className="table_item_site">{collaborateur.site}</td>
                    <td className="table_item_poste">{collaborateur.titrePoste}</td>
                    <td className="table_item_departement">{collaborateur.departement}</td>
                </tr>

            ))}
        </tbody>
    </table>
    <div className="modalViewCollab">
        <Modal
            isOpen={isModalOpen}
            onRequestClose = {closeModal}
            style = {{
                content : {
                    width : '800px',
                    height : '600px',
                    borderRadius : '10px',
                    margin : 'auto',
                    top : '0',
                    bottom : '0',
                    left : '0',
                    right : '0',
                }
            }}
        >
            <ViewCollaborateur CollabToView={collabToView}/>
        </Modal>
    </div>
  </>
  )
}

export default NewCollaborateurList
