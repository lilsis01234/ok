import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, CardHeader, Typography } from '@material-tailwind/react';
import AjoutDirection from '../AjoutDirection/AjoutDirection';
import Modal from 'react-modal'
import ModifDirection from '../ModifDirection/ModifDirection';

const ListeDirection = () => {
  const [directionList, setDirectionList] = useState([]);

  const fecthDirection = () => {
    axios.get("http://localhost:4000/api/direction/all")
    .then((response) => {
      setDirectionList(response.data)
    })
    .catch((err) => {
      console.error('Erreur lors de la récupération des données:', err)
    })
  }

  useEffect(() => {
    fecthDirection();
  }, [])

  //Pour la modification du formulaire
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [directionToEdit, setDirectionToEdit] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const EditDirection = (directionId) => {
    const selectedDirection = directionList.find((direction) => direction.id === directionId)
    setDirectionToEdit(selectedDirection)
  }

  const handleUpdateDirection = () => {
    setDirectionToEdit(null);
    fecthDirection();
  }






  return (
    <>
      <Typography variant='h2' className="text-white text-center font-[Poppins] p-10">Les Directions</Typography>
      <AjoutDirection/>
      <div>
        <div className="grid grid-cols-12 m-5 font-[Poppins] bg-white rounded-lg" >
          {directionList.map((direction) => (
            <Card key={direction.id} className='col-span-4 cursor-pointer m-5 text-center p-5' onClick={() => {EditDirection(direction.id) ; openModal()}}>
              <CardHeader floated={false} shadow={false}>
                <Typography variant='h3'>{direction.nomDirection}</Typography>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
      <div>
          <Modal
            isOpen = {isModalOpen}
            onRequestClose={closeModal}
            style = {{
              content : {
                width : '400px',
                height : '400px',
                borderRadius : '10px',
                margin: 'auto',
                top : '0',
                bottom : '0',
                left : '0',
                right : '0',
              }
            }}
          >
            <ModifDirection DirectionToEdit={directionToEdit} onDirectionUpdated={handleUpdateDirection}/>
            <button onClick={closeModal} className='closeModal'>Retourner à la page direction</button>
          </Modal>
      </div>
    </>
  )
}

export default ListeDirection
