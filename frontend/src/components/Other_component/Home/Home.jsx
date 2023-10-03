import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
    const navigate = useNavigate();

    useEffect(()=> {
        const token = localStorage.getItem('jwt')
        if (!token){
            navigate('/');
        }
        const role = localStorage.getItem('role');
        if (role === 'Administrateur'){
            navigate('/admin/home');
            console.log('Redirection vers le page administrateur');
        } else {
            navigate('/user/profile'); //A changer quand une nouvelle module soit installer
            console.log('Redirection vers le page user');
        }
    }, [navigate]);
  return (
    <div>
      
    </div>
  )
}

export default Home
