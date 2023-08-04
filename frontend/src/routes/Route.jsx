import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../components/Other_component/Home/Home'
import Login from '../components/Authentification/Login/Login'
import HomeUser from '../components/User/HomeUser/HomeUser'
import ErrorPage from '../components/Other_component/ErrorPage/ErrorPage'
import ForgotPasswordForm from '../components/Authentification/ForgotPasswordForm/ForgotPasswordForm'
import ResetPasswordForm from '../components/Authentification/ResetPasswordForm/ResetPasswordForm'
import HomeAdmin from '../components/Administrateur/HomeAdmin/HomeAdmin'
import PageDepartement from '../components/Administrateur/Departement/Departement'
import AddCollab from '../components/Administrateur/CrudCollab/formulaire/AddCollab'
import UpdateCollab from '../components/Administrateur/CrudCollab/formulaire/updateCollab'
import ListeCollab from '../components/Administrateur/CrudCollab/listeCollaborateur/listeCollab'
import CollabParPoste from '../components/Administrateur/CrudCollab/collabParposte/collabParPoste'
import ListDepartement from '../components/Administrateur/CrudCollab/collabParDepartement/departements'
import CollabParDepartement from '../components/Administrateur/CrudCollab/collabParDepartement/collabParDepartement'

function AppRoute(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/password/reset_request/" element={<ForgotPasswordForm/>}/>
                <Route path="/reset-password/:token" element={<ResetPasswordForm/>}/>


                <Route path="/admin/departement" element={<PageDepartement/>}/>
                {/* <Route path='/admin/postes' element={<Postes/>}/> */}
                <Route path="/admin/poste" element={<PagePoste/>}/>



                <Route path="/admin/home" element={<HomeAdmin/>}/> 
                <Route path="/user/home" element={<HomeUser/>}/>

                
                <Route path='/admin/add'element={<AddCollab/>}/>
                <Route path='/admin/update/:id' element={<UpdateCollab/>}/>
                <Route path='/admin/postes/collab/:idposte' element={<CollabParPoste/>}/>
                <Route path='/admin/listeCollab' element={<ListeCollab/>}/>
                <Route path='/admin/departements' element={<ListDepartement/>}/>
                <Route path='/collab/:nomDepartement' element={<CollabParDepartement/>}/>
                {/* 
                <Route path="/admin/home" element={<HomeAdmin/>}/>
                <Route path="/user/home" element={<HomeUser/>}/>   */}

                <Route path="/error" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute;
