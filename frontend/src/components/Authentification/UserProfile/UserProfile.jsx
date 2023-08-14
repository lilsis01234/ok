import React, { useEffect, useState } from 'react'
import { Avatar, Menu, MenuHandler, MenuList, MenuItem} from "@material-tailwind/react";
import axios from 'axios';
import Logout from '../Logout/Logout'
import { Link } from 'react-router-dom';



const UserProfile = () => {
    const idProfile = localStorage.getItem('id');
    const [collaborateurData, setCollaborateurData] = useState(null);

    useEffect(() => {
        axios.get(`http;//localhost:4000/api/user/profile/${idProfile}`)
            .then(response => {
                setCollaborateurData(response.data)
            })
            .catch(error => {
                console.error('Erreur lors de la récupéaration des informations du collaborateur connecté', error)
            })
    }, [idProfile]);

    if(!collaborateurData){
        return <div>Chargement en cours</div>
    }



    return (
        <>
            <Menu className="m-10" placement="bottom-end">
                <MenuHandler >
                   <Avatar src={`http;//localhost:4000/${collaborateurData.image}`} className="mr-10 rounded-full w-16 h-16 object-cover" />
                </MenuHandler>
                <MenuList>
                    <MenuItem><Link to='/user/profile'>Mon profil</Link></MenuItem>
                    <MenuItem>Paramètre</MenuItem>
                    <MenuItem><Logout/></MenuItem>
                </MenuList>
            </Menu>
          
        </>
    )
}

export default UserProfile
