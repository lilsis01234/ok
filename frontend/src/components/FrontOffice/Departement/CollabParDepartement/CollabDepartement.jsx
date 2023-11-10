import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBarUser from '../../NavBarUser/NavBarUser';
import SideBarUser from '../../SideBar/SideBarUser';
import { Typography, Avatar } from '@material-tailwind/react';

const CollabDepartement = () => {
  const [collabs, setCollab] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const[departement,setDepartement] = useState([]);

useEffect(() => {
  const fetchCollaborateur = () => {
    axios
<<<<<<< HEAD
      .get(`http://localhost:4000/api/departement/${id}/collaborateur`)
=======
      .get(`http://localhost:4000/api/departement/${id}/collaborateur`)
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
      .then((res) => {
        setCollab(res.data);
      })
      .catch((err) => console.log(err));
<<<<<<< HEAD
    axios.get("http://localhost:4000/api/departement/all_departement")
=======
    axios.get("http://localhost:4000/api/departement/all_departement")
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
      .then((response) => {
           setDepartement(response.data);
      })
      .catch((err)=>{
          console.error('Erreur lors de la récupération des données:', err)
      })
  };

  fetchCollaborateur()

}, [id])
  

 

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/');
    }

    const role = localStorage.getItem('role');
    if (!(role === 'User')) {
      navigate('/home');
    }
  }, [navigate]);

  const nomdepartement= departement.filter((departement)=>departement.id.toString()=== id.toString());
  const departementsUniques = Array.from(new Set(nomdepartement.map(dep => dep.nomDepartement)));
  console.log("DEPARTEMENT:", departementsUniques); 
  return (
    <div>
      <div className="page">
        <NavBarUser />
        <div className="content">
          <SideBarUser />
          <div>
            <Typography variant="h2">
              Collaborateurs dans le département{' '}{departementsUniques}
            </Typography>
            {collabs.length === 0 ? (
              <p>Pas de collaborateur dans ce département</p>
            ) : (
              <div className="m-5 p-5 bg-white grid grid-cols-12 rounded-lg">
                <div className="flex flex-row">
                  {collabs.map((collab) => (
                    <>
                      <Avatar
<<<<<<< HEAD
                        src={`http://localhost:4000/${collab.image}`}
=======
                        src={`http://localhost:4000/${collab.image}`}
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
                        alt={collab.nom}
                        size="xxl"
                        className="m-3"
                      />
                      <div className="flex flex-col justify-center">
                        <Typography variant="h6">
                          {collab.prenom} {collab.nom}
                        </Typography>
                        <Typography variant="h6">{collab.matricule}</Typography>
                        <Typography variant="small">
                          {collab.quartier}, {collab.ville}
                        </Typography>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollabDepartement;


