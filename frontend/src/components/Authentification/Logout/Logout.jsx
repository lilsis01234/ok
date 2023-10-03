import { useNavigate } from 'react-router'
import {RiLogoutBoxRLine} from 'react-icons/ri'
import '../../BackOffice/NavBar/NavBarAdmin.css'

const Logout = () => {
    const navigate = useNavigate();

    const handleLagout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('role');
        navigate('/');
      }

  return (
    <div>
      <span onClick={handleLagout} className="logout"><RiLogoutBoxRLine className="logout-icon mr-2"/> Déconnexion </span>
    </div>
  )
}

export default Logout;
