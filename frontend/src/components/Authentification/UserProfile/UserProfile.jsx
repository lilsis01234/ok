import React, { useEffect, useState } from 'react'
import { Avatar, Menu, MenuHandler, MenuList, MenuItem} from "@material-tailwind/react";
import axios from 'axios';
import Logout from '../Logout/Logout'
import { useNavigate } from 'react-router-dom';
import {FaRegUser} from 'react-icons/fa'
import {FiSettings} from 'react-icons/fi'




const UserProfile = () => {

    const idProfile = localStorage.getItem('id');
    const [collaborateurData, setCollaborateurData] = useState(null);
    const navigate = useNavigate();
   
    useEffect(() => {
<<<<<<< HEAD
        axios.get(`http://localhost:4000/api/user/${idProfile}/profile`)
=======
        axios.get(`http://localhost:4000/api/user/${idProfile}/profile`)
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
            .then(response => {
                setCollaborateurData(response.data)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations du collaborateur connecté', error)
            })
    }, [idProfile]);
 

    if(!collaborateurData){
        return <div>Chargement en cours</div>
    } 



    return (
        <>
            <Menu className="m-10 fixed" placement="bottom-end" >
                <MenuHandler >
<<<<<<< HEAD
                   <Avatar src={`http://localhost:4000/${collaborateurData.Collab.image}`} className="mr-10 rounded-full w-16 h-16 object-cover mt-2" />
=======
                   <Avatar src={`http://localhost:4000/${collaborateurData.Collab.image}`} className="mr-10 rounded-full w-16 h-16 object-cover mt-2" />
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
                </MenuHandler>
                <MenuList>
                    <MenuItem onClick={() => navigate('/user/profile')} className="flex flex-row"><FaRegUser className="mr-2 text-[#9C1D21]"/> Mon profil</MenuItem>
                    <MenuItem onClick={() => navigate('/user/accountSetting')} className="flex flex-row"><FiSettings className="mr-2 text-[#9C1D21]" /> Paramètre</MenuItem>
                    <MenuItem><Logout/></MenuItem>
                </MenuList>
            </Menu>
          
        </>
    )
}

export default UserProfile
