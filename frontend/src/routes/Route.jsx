import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../components/Other_component/Home'
import HomeAdmin from '../components/Administrateur/HomeAdmin'
import Login from '../components/Authentification/Login'
import HomeUser from '../components/User/HomeUser'
import ErrorPage from '../components/Other_component/ErrorPage'



function AppRoute(){
    const role = localStorage.getItem('role');
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>

                {role && role.includes("Administrateur") && <Route path="/admin/home" element={<HomeAdmin/>}/>}
                {role && role.includes("User") && <Route path="/user/home" element={<HomeUser/>}/>}

                {/* 
                <Route path="/admin/home" element={<HomeAdmin/>}/>
                <Route path="/user/home" element={<HomeUser/>}/>   */}

                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute;