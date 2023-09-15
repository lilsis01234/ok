import React from 'react'
import NavBarAdmin from '../NavBar/NavBarAdmin'
import SideBar from '../SideBarAdmin/SideBar'
import ListeDirection from './ListeDirection/ListeDirection'

const Direction = () => {
  return (
    <div className="page">
        <NavBarAdmin/>
        <div className='content'>
            <SideBar/>
            <div className='main-content'>
                <div className='flex flex-col content-center w-full bg-black rounded-lg'>
                    <ListeDirection/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Direction
