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
<<<<<<< HEAD
            .get("http://localhost:4001/api/collaborateur/newCollab")
=======
            .get("http://localhost:4001/api/collaborateur/newCollab")
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
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
                <th></th>
                <th className="table_item_matricule">Matricule</th>
                <th className="table_item_nom">Nom</th>
                <th className="table_item_prenom">Prénom</th>
                <th className="table_item_poste">Poste</th>
                <th className="table_item_site">Equipe</th>
                <th className="table_item_departement">Département</th>
            </tr>
        </thead>
        <tbody>
            {data.map((collaborateur, index) => (
                <tr key={index} onClick={() => {viewCollab(collaborateur.id); openModal()}}>
                    <td>
<<<<<<< HEAD
                        <Avatar src={`http://localhost:4001/${collaborateur.image}`} alt="avatar" withBorder={false} size="xs" className="rounded-full w-16 h-16 object-cover collab_photo"/>
=======
                        <Avatar src={`http://localhost:4001/${collaborateur.image}`} alt="avatar" withBorder={false} size="xs" className="rounded-full w-16 h-16 object-cover collab_photo"/>
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
                    </td>
                    <td className="table_item_matricule">{collaborateur.matricule}</td>
                    <td className="table_item_nom">{collaborateur.nom}</td>
                    <td className="table_item_prenom">{collaborateur.prenom}</td>
<<<<<<< HEAD
                    <td className="table_item_poste">{collaborateur.poste1.titrePoste}</td>
                    <td className="table_item_poste">{collaborateur.equipe1.nomEquipe}</td>
=======
                    <td className="table_item_site">{collaborateur.site}</td>
                    <td className="table_item_poste">{collaborateur.poste1.titrePoste}</td>
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
                    <td className="table_item_departement">{collaborateur.departement1.nomDepartement}</td>
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
