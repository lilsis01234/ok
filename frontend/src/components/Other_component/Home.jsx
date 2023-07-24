import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
    const navigate = useNavigate();

    useEffect(()=> {
        const role = localStorage.getItem('role');
        if (role === 'Administrateur'){
            navigate('/admin/home');
        } else {
            navigate('/user/home');
        }
    }, [navigate]);
  return (
    <div>
      
    </div>
  )
}

export default Home
