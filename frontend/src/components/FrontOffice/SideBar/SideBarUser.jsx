// import { Typography } from '@material-tailwind/react';
import React, { useState } from 'react'
import {HiOutlineHome, HiOutlineNewspaper} from 'react-icons/hi'
import { MdEvent, MdPoll, MdBusiness} from 'react-icons/md';
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'
import { Link } from 'react-router-dom';
import {AiOutlineTeam} from 'react-icons/ai'


const SideBarUser = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toogleSideBar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
  return (
    <div className="sideBar_container">
        {isSidebarOpen && (
            <div className={`sideBar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <ul className="sideBar_menu">
                    <li className="sideBar_menu_item " ><Link to="/user/home" className="flex flex-row items-center"><HiOutlineHome className="mr-2"/>Acceuil</Link></li>
                    {/* <Typography variant="paragraph" className="text-white font-[Poppins] text-center p-3">Communauté</Typography> */}
                    <li className="sideBar_menu_item " ><Link className="flex flex-row items-center"><HiOutlineNewspaper className="mr-2"/>Actualités</Link></li>
                    <li className="sideBar_menu_item " ><Link className="flex flex-row items-center"><MdEvent className="mr-2"/>Evénements</Link></li>
                    <li className="sideBar_menu_item " ><Link className="flex flex-row items-center"><MdPoll className="mr-2"/>Sondage</Link></li>
                    <li className="sideBar_menu_item " ><Link to='/collaborateur/list' className="flex flex-row items-center"><AiOutlineTeam className="mr-2"/>Nos collaborateurs</Link></li>
                    <li className="sideBar_menu_item " ><Link to='/enterprise/organigramme' className="flex flex-row items-center"><MdBusiness className="mr-2"/>Notre entreprise</Link></li>
                    {/* <li className="sideBar_menu_item " ><Link to='/user/departements' className="flex flex-row items-center"><MdBusiness className="mr-2"/>Les départements</Link></li> */}
                </ul>
            </div>
        )}
        <button onClick={toogleSideBar} className="sideBar_button">
                {isSidebarOpen ? <IoMdClose/> : <GiHamburgerMenu />}
        </button>
    </div>
  )
}

export default SideBarUser
