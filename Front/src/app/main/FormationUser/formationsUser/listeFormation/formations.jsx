import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import NavBarUser from '../../NavBarUser/NavBarUser';
import SideBarUser from '../../SideBar/SideBarUser';
import { useNavigate } from 'react-router-dom';

const ListeFormationUser = () => {
  const navigate = useNavigate();
  const [formations,setFormations] = useState([]);
  const[recherche,setRecherche] = useState('');
  const[formationfiltre, setFormationsfiltre] = useState([]);
  //Pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Nombre d'éléments par page 
  const itemsPerPage = 15;
   
  useEffect(() => {
    // const token = Cookies.get('jwt');
    const token = localStorage.getItem('jwt');
    console.log(token);
    if (!token){
        navigate('/');
    }

    const role2 = localStorage.getItem('role2'); 
    console.log(role2);
    if (!(role2 === "User")){
        navigate('/home');
    }
    }, [navigate])
    
    // const id = localStorage.getItem('id');

  const fetchCollaborateur = () => {
    axios.get('http://localhost:8000/api/formation/all_formations')
      .then(res => {setFormations(res.data)})
      .catch(err => console.log(err));
  }
  // formations any formateur
  useEffect(() => {
    fetchCollaborateur();
  }, [])
  console.log(formations)
  
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFormationsfiltre(formations.slice(startIndex, endIndex));
  }, [formations, currentPage])

  const totalPages = Math.ceil(formations.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }


  return (
    <>
    <div className="page">
      <NavBarUser />
        <div className="content">
          <SideBarUser/>
            <div>
              <div className='collabListes'>
                <h1 className="collabListes_title font-bold">Les formations disponibles</h1>
                  <div className="collabListes_Item">
                    <div className="search_form">
                      <input type="text"placeholder="Rechercher une formation" value={recherche} onChange={(e)=>{setRecherche(e.target.value)}} className=""></input>
                      <button className="search_Button"> Rechercher </button>
                      {/* <Link to="#" className="AddCollab_Link">Organiser une formation</Link> */}
                    </div>
                  </div>
                <Link to="#" className="AddCollab_Link">Les formations auquelles j'ai assistées</Link>
              </div>
              {formations.length !== 0 ?(
              <>
              <table className="listDepartementUser_table">
                <thead>
                  <tr>
                    <th className="w-40">Thème</th>
                    <th className="w-60">Description</th>
                    <th className="w-60">Organisateur(trice)</th>
                    <th className="w-60">Voir plus</th>
                    {/* <th className="w-60">Accéder au forum</th> */}
                  </tr>
                </thead>
                <tbody>
                {recherche === '' || recherche === null ? (formationfiltre.map((formation)=> (
                  <tr key={formation.id}>
                    <td className="w-40">{formation.theme}</td>
                    <td className="w-60">{formation.description}</td>
                    <td className='w-60'>{formation.Formateur.nom} {formation.Formateur.prenom}</td>
                    <td className="w-60">
                      <button className="table_item_icon"><Link to= {`/user/formation/${formation.id}`}>Voir plus</Link></button>
                    </td>
                  </tr>
                ))) : (
                formationfiltre.filter((formations)=>formations.theme.toLowerCase().includes(recherche.toLowerCase()) || formations.description.toLowerCase().includes(recherche.toLowerCase())).map((formation) => (
                  <tr key={formation.id}>
                    <td className="w-40">{formation.theme}</td>
                    <td className="w-60">{formation.description}</td>
                    <td className='w-60'>{formation.Formateur.nom} {formation.Formateur.prenom}</td>
                    <td className="w-60">
                      <button className="table_item_icon"><Link to= {`/user/formation/${formation.id}`}>Voir plus</Link></button>
                    </td>
                  </tr>
                ))
                )}
                </tbody>
              </table>
              <div className="list_pagination">
              {Array.from({length : totalPages}, (_, index) => index + 1).map((page) => (
                <button
                    key={page}
                    className={page === currentPage ? "active" : ""}
                    onClick={() => handlePageChange(page)}
                >
                {page}
                </button>
              ))}
              </div>
              </>
              ) : (
                <h3>Pas de formation pour le moment</h3>
              )}
            </div>
        </div>
    </div>
    </>
  )
}

export default ListeFormationUser