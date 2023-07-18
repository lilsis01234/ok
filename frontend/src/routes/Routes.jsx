import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AuthForm from '../components/Auth/AuthForms'
import App from '../App'

function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthForm />} />
                <Route path="/home" element={<App />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;