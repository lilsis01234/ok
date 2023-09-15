import { Card, CardBody, CardFooter, CardHeader, Typography} from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {FiMail} from 'react-icons/fi'

const ViewCollaborateur = ({CollabToView}) => {
    const [collab, setCollab] = useState(null);

    useEffect(() => {
      axios.get(`http://localhost:4000/api/user/${CollabToView.id}/profile`)
        .then(response => {
            setCollab(response.data)
        })
        .catch(error => {
            console.error('Erreur lors de la recupération des informations des collaborateurs', error)
        })
    }, [CollabToView])

    if(!collab){
      return <div className="border-none">Chargement en cours ....</div>
    }

    

  return (
    <>
      <Card className="w-96">
        <CardHeader floated={false} className="h-80 flex items-center justify-center">
            <img src={`http://localhost:4000/${collab.Collab.image}`} alt={collab.nom} />
        </CardHeader>
        <CardBody className="text-center pt-10 ">
            <Typography variant="h4" color="blue-gray" className="mb-2 font-[Poppins]">{collab.Collab.prenom} {collab.nom} </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2 font-[Poppins]">{collab.Collab.matricule}</Typography>
            <Typography color="black" className="font-medium font-[Poppins]" >{collab.Collab.poste1.titrePoste}</Typography>
            <Typography color="black" className="font-medium font-[Poppins]" >{collab.Collab.departement1.nomDepartement}</Typography>
            {collab.Collab.postes && (
              <div>
                  <Typography color="black" className="font-medium font-[Poppins]" > ET</Typography>
                  <Typography color="black" className="font-medium font-[Poppins]" >{collab.Collab.postes.titrePoste} </Typography>
                  <Typography color="black" className="font-medium font-[Poppins]" >{collab.Collab.departements.nomDepartement} </Typography>
               </div>
            )}
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
            <Typography color="black" className="font-medium font-[Poppins] flex flex-row text-[#9C1D21]"><FiMail className="m-1"/>{collab.email}</Typography>
        </CardFooter>
      </Card>
    </>
  )
}

export default ViewCollaborateur
