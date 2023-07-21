import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomeAdmin from '../components/Administrateur/HomeAdmin'
import Login from '../components/Authentification/Login'

function AppRoute(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/admin/home" element={<HomeAdmin/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute;