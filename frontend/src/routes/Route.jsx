import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../components/Other_component/Home'
import HomeAdmin from '../components/Administrateur/HomeAdmin'
import Login from '../components/Authentification/Login'
import HomeUser from '../components/User/HomeUser'

function AppRoute(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/admin/home" element={<HomeAdmin/>}/>
                <Route path="/user/home" element={<HomeUser/>}/>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute;