import { useNavigate } from 'react-router'
import {RiLogoutBoxRLine} from 'react-icons/ri'
import '../../Administrateur/NavBar/navBar.css'

const Logout = () => {
    const navigate = useNavigate();

    const handleLagout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('role');
        navigate('/');
      }

  return (
    <div>
      <button onClick={handleLagout} className="logout"><RiLogoutBoxRLine className="logout-icon"/></button>
    </div>
  )
}

export default Logout;

