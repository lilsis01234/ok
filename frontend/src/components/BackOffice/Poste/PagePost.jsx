import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../NavBar/NavBarAdmin'
import SideBar from '../SideBarAdmin/SideBar';
import ListePoste from './ListePoste/ListePoste';


const PagePoste = () => {
  const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token){
            navigate('/');
        }

        const role = localStorage.getItem('role'); 
        if (!(role === "Administrateur")){
            navigate('/home');
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
