import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AuthForm from '../components/Auth/AuthForms'
import HomePage from '../components/Admin/Home'


function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthForm />} />
                <Route path="/home" element={<HomePage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;