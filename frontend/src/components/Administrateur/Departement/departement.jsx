import React, {useEffect} from 'react'
import Navbar from '../NavBar/NavBarAdmin'
import SideBar from '../SideBarAdmin/SideBar'
import '../../Other_component/Page.css'
import { useNavigate } from 'react-router-dom';
import ListDepartement from './listeDepartement/listeDepartement';

function PageDepartement (){
    const navigate = useNavigate();
    useEffect(() => {
        // const token = Cookies.get('jwt');
        const token = localStorage.getItem('jwt');
        console.log(token);
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
                    <ListDepartement/>
                </div>
            </div>
        </div>
    )
}

export default PageDepartement;