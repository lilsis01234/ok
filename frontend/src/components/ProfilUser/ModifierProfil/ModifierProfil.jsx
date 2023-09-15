import { Avatar, Accordion, AccordionBody, AccordionHeader, Alert, Input} from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'

const ModifierProfil = ({ CollabToEdit}) => {
    const [image, setImage] = useState(CollabToEdit?.image || '');
    const [lot, setLot] = useState(CollabToEdit?.lot || '');
    const [quartier, setQuartier] = useState(CollabToEdit?.quartier || '');
    const [ville, setVille] = useState(CollabToEdit?.ville || '');
    const [tel, setTel] = useState(CollabToEdit?.tel || '');

    useEffect(() => {
        if (CollabToEdit) {
            setImage(CollabToEdit.image) 
            setLot(CollabToEdit.lot )
            setQuartier(CollabToEdit.quartier )
            setVille(CollabToEdit.ville)
            setTel(CollabToEdit.tel)
        } else {
            setImage("")
            setLot("")
            setQuartier("")
            setVille("")
            setTel("")
        }
    }, [CollabToEdit])

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            image,
            lot,
            quartier,
            ville,
            tel
        }
        axios.put(`http://localhost:4000/api/collaborateur/${CollabToEdit.id}/edit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((response) => {
                alert('Information personnelle mise à jour avec succès')
                window.location.reload();
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const [selectImage, setSelectImage] = useState(null);
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setImage(selectedFile);
        setSelectImage(selectedFile)
    }

    const [open, setOpen] = useState(1);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const [alwaysOpen, setAlwaysOpen] = useState(true);
    const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur)


    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <Accordion open={alwaysOpen}>
                    <AccordionHeader onClick={handleAlwaysOpen} className="font-[Poppins]">Photo de Profil</AccordionHeader>
                    <AccordionBody className="font-[Poppins] flex flex-col items-center">
                        {!selectImage && image && (
                            <Avatar src={`http://localhost:4000/${image}`} className="w-32 h-32 rounded-full"/>
                        )}
                        {selectImage && (
                            <Avatar src={URL.createObjectURL(selectImage)} className="w-32 h-32 rounded-full" />
                        )}
                        <input type='file' onChange={handleImageChange} className='justify-self-center font-[Poppins]' name="image" ></input>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2}>
                    <AccordionHeader onClick={() => handleOpen(2)}>Mise à jour des coordonnées</AccordionHeader>
                    <AccordionBody>
                        <Alert icon={<FiAlertCircle />} variant="ghost" color="red">Veuillez modifier ces éléments si seleument si votre adresse et votre numéro de téléphone a été changé</Alert>
                        <div className="flex flex-row p-2">
                            <div className="p-3">
                                <label> Lot : </label>
                                <Input value={lot} type='text' onChange={(e) => { setLot(e.target.value) }} />
                            </div>
                            <div className="p-3">
                                <label> Quartier : </label>
                                <Input value={quartier} type='text' onChange={(e) => { setQuartier(e.target.value) }}/>
                            </div>
                            <div className="p-3">
                                <label> Ville : </label>
                                <Input value={ville} type='text' onChange={(e) => { setVille(e.target.value) }}/>
                            </div>
                        </div>
                        <div className="flex flex-row p-2">
                            <div className="p-3">
                                <label> Téléphone : </label>
                                <Input value={tel} type='text' onChange={(e) => { setTel(e.target.value) }}/>
                            </div>
                        </div>
                    </AccordionBody>
                </Accordion>
                <button className="p-3 bg-[#9C1D21] text-white rounded-lg w-60 self-center">Enregistrer la modification</button>
            </form>
        </div>
    )
}

export default ModifierProfil
