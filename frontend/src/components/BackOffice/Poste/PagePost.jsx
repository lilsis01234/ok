import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../NavBar/NavBarAdmin'
import SideBar from '../SideBarAdmin/SideBar';
import ListePoste from './ListePoste/ListePoste';
<<<<<<< HEAD
import jwt_decode from "jwt-decode";
=======
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9


const PagePoste = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
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
=======
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token){
            navigate('/');
        }

        const role = localStorage.getItem('role'); 
        if (!(role === "Administrateur")){
            navigate('/home');
        }

>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
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
