import { Avatar, Input, Button} from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ArchiveCollaborateur = ({CollabToArchive}) => {

  const [image, setImage] = useState(CollabToArchive?.image || '');
  const [nom, setNom] = useState(CollabToArchive?.nom || '');
  const [prenom, setPrenom] = useState(CollabToArchive?.prenom || '');
  const [statut, setStatut] = useState('');


  useEffect(() => {
    if (CollabToArchive) {
      setImage(CollabToArchive.image)
      setNom(CollabToArchive.nom)
      setPrenom(CollabToArchive.prenom)
      setStatut('')
    } else {
      setImage("")
      setNom("")
      setPrenom("")
      setStatut("")
    }
  }, [CollabToArchive])

 

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      statut
    }


    axios.post(`http://localhost:4000/api/archive/${CollabToArchive.id}`, formData)
      .then((response) => {
        alert('Collaborateur archivé avec succès')
      })
      .catch((error) => {
        console.error(error)
      })

     
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center">
            <Avatar src={`http://localhost:4000/${image}`} size="xxl" className="m-5"/>
            <label className="p-5 text-center font-['Poppins']">Pour quelle raison voulez vous supprimer {nom} {prenom}?</label>
            <Input variant="static" type="text" onChange={(e) => { setStatut(e.target.value) }} value={statut} size="lg"/>
            
            {/* <input type="text" onChange={(e) => { setStatut(e.target.value) }} value={statut} /> */}
            <Button type="submit" variant="filled" className="m-2">Supprimer</Button>
        </div>
      </form>
    </div>
  )
}

export default ArchiveCollaborateur
