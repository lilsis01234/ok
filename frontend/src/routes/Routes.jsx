import React, { useEffect, useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AuthForm from '../components/Auth/AuthForms'
import HomePage from '../components/Admin/Home'
import App from '../App'
import Cookies from 'js-cookie'
import { getRoleFromToken } from '../components/Auth/getRoleFromToken'


function AppRoutes(){
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = Cookies.get('jwt');
        if (token) {
            const userRole = getRoleFromToken(token);
            setRole(userRole);
        }
    }, [])


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthForm />} />

                {role && role.includes('Administrateur') && <Route path="/home" element={<HomePage/>}/>}
                {role && role.includes('User') && < Route path="/userHome" element={<App/>}/>}

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;