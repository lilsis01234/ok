import { Avatar, Typography} from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CollabParDepartement = (departToView) => {
  const [collab, setCollab] = useState(null);


  useEffect(() => {
    axios.get(`http://localhost:4000/api/departement/${departToView.departToView.id}/collaborateur`)
      .then(response => {
        setCollab(response.data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations des collaborateurs', error)
      })
  }, [departToView])

  if (!collab) {
    return <div className="border-none">Chargement en cours ....</div>
  }

  return (
    <>
    <Typography variant='h4' className='font-[Poppins] p-5 m-5 text-center'>Les équipes {departToView.departToView.nomDepartement}</Typography> 
    <div className="grid grid-cols-12 p-5 ">
      {collab.map((collaborateur) => (
        <div className="col-span-4"  key={collaborateur.id}>
          <div className="flex flex-row">
            <Avatar src={`http://localhost:4000/${collaborateur.image}`} alt={collaborateur.nom} className="m-5" size="xl"/>
            <div className="flex flex-col justify-center ">
                <Typography variant="h6" className="font-[Poppins]">{collaborateur.prenom} {collaborateur.nom}</Typography>
                <Typography variant="h6" className="font-[Poppins]">{collaborateur.matricule} </Typography>
                <Typography variant='small' className="font-[Poppins]">{collaborateur.Poste.titrePoste}</Typography>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default CollabParDepartement
