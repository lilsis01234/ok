import React from 'react'
import { useNavigate } from 'react-router'



const Logout = () => {
    const navigate = useNavigate();

    const handleLagout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('role');
        navigate('/login');
        window.location.reload(true);
    }

  return (
    <div>
      <button onClick={handleLagout}>Logout</button>
    </div>
  )
}

export default Logout;
