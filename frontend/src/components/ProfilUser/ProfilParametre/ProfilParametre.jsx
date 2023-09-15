import React, {  useState } from 'react'
import Navbar from '../../BackOffice/NavBar/NavBarAdmin'
import SideBar from '../../BackOffice/SideBarAdmin/SideBar'
import axios from 'axios'
import { Card, CardHeader, Typography, CardBody, Input, Alert} from '@material-tailwind/react'
import { FiAlertCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import NavBarUser from '../../FrontOffice/NavBarUser/NavBarUser'
import SideBarUser from '../../FrontOffice/SideBar/SideBarUser'


const ProfilParametre = () => {
    const role = localStorage.getItem('role')
    const idProfile = localStorage.getItem('id')
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPasswword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[&%$^!])[a-zA-Z0-9&%$^!]{1,8}$/;
      
      if (!regex.test(password)){
        setError('Votre mot de passe doit contenir des chiffres, des majuscules et des minuscules, et des caractères spéciaux : & % $ ^ !')
      }

      if (password !== confirmPasswword){
        setError('Les mots de passes ne correspondent pas');
      }

      const formData = {password}

  
        axios.put(`http://localhost:4000/api/compte_collaborateur/${idProfile}/edit`, formData)
        .then((response) => {
          alert('Mot de Passe modifié avec succès')
          navigate('/home')
        })
        .catch((error) => {
          console.error(error)
        })
  


    }
  
    

    
  return (
    <div className="page">
        {role === 'Administrateur' ?
            <Navbar /> : <NavBarUser/>
        }
        <div className="content">
            {role === 'Administrateur' ? <SideBar/> : <SideBarUser/>}
            <div className="main-content">
              <div className="flex flex-col items-center justify-center">
                <Card className="m-10 w-1/2">
                  <CardHeader variant="gradient" color="gray" className="mb-4 grid h-28 place-items-center">
                    <Typography variant="h3" color="white" className="font-[Poppins] text-xl"> Modifier mot de passe </Typography>
                  </CardHeader>
                  <CardBody >
                    {error && <Alert icon={<FiAlertCircle/>} variant="ghost" color="red" className="mb-3">{error}</Alert>}
                      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input label="Nouveau mot de passe" size="lg" onChange={(e) => {setPassword(e.target.value)}} type="password"/>
                        <Input label="Confirmer le mot de passe" size="lg"  onChange={(e) => {setConfirmPassword(e.target.value)}} type="password"/>
                        <button className="m-3 p-3 bg-[#9C1D21] text-white rounded-lg w-60 self-center" >Enregistrer la modification</button>
                      </form>
                  </CardBody>
                </Card>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ProfilParametre
