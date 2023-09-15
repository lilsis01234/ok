import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../NavBar/NavBarAdmin'
import SideBar from '../SideBarAdmin/SideBar';
import ListePoste from './ListePoste/ListePoste';
import jwt_decode from "jwt-decode";


const PagePoste = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('jwt')

    if (token){
        const decodedToken = jwt_decode(token)
        console.log(decodedToken)
        if(!decodedToken.exp){
            localStorage.removeItem('jwt');
            navigate('/')
        } 
    } 
    }, [navigate])




  return (
    <div className="page">
        <Navbar/>
        <div className="content">
            <SideBar/>
            <div className="main-content">
                <ListePoste/>
              </div>
            </div>
        </div>
  )
}

export default PagePoste;
