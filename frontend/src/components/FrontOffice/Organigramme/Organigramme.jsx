import { Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBarUser from '../NavBarUser/NavBarUser'
import SideBarUser from '../SideBar/SideBarUser'
import Modal from 'react-modal'
import CollabParDepartement from './CollabParDepartement';

const Organigramme = () => {
  const [departement, setDepartement] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/departement/all")
    .then((response) => {
      setDepartement(response.data);
    })
    .catch((err) => {
      console.error('Erreur lors de la récupération des donnée:', err)
    })
  }, [])


   //Liste sans le departement direction
  //  const [departementList, setDepartementList] = useState([]);

  //Pour afficher les membres de chaque departements
  const [departToView, setdepartToView] = useState(null);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);

  const openViewModal = () => {
    setIsModalViewOpen(true)
  }

  const closeViewModal = () => {
    setIsModalViewOpen(false)
  }

  const ViewModal = (departementId) => {
    const selectedDepartement = departement.find((departement) => departement.id === departementId)
    setdepartToView(selectedDepartement)
  }





  return (
    <div className="page">
        <NavBarUser/>
        <div className="content">
            <SideBarUser/>
            <div className="main-content"> 
              <div className="bg-black m-5 p-2 rounded-lg"> 
                  <Typography variant="h3" className="text-white text-center font-[Poppins] p-5 m-5">Les départements de Sahaza Group</Typography>
                  <div className="bg-white rounded-lg p-2 grid grid-cols-12 m-2 p-2">
                    {departement.map((departementItem) =>(
                      <div key={departementItem.nomDepartement} 
                            className="col-span-3 m-2 cursor-pointer rounded-lg trannsition hover:-translate-y-1 hover:scale-110 hover:bg-[#9C1D21] hover:text-white duration-300" 
                            onClick={() => {openViewModal(); ViewModal(departementItem.id)}}>
                          <Typography variant="h5" className="font-[Poppins] text-center p-5">{departementItem.nomDepartement}</Typography>
                      </div>
                    ))}
                  </div>
                  <div>
                    <Modal 
                      isOpen = {isModalViewOpen}
                      onRequestClose = {closeViewModal}
                      style = {
                        {
                          content : {
                            width : '900px',
                            height : '600px',
                            padding : '10px',
                            margin : 'auto'
                          }
                        }
                      }
                    >
                        <CollabParDepartement departToView={departToView}/>
                    </Modal>
                  </div> 
              </div>
            </div>
        </div>
    </div>
  )
}

export default Organigramme
