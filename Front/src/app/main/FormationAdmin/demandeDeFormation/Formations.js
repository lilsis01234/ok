import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import ListeFormationAdmin from '../listeFormationsAdmin/listeFormationsAdmin'
import './demandeFormation.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Formations = () => {
  // const navigate = useNavigate();
  // const [listevisible,setVisible] = useState(false);
  
  // useEffect(() => {
  //   // const token = Cookies.get('jwt');
  //   const token = localStorage.getItem('jwt');
  //   if (!token){
  //       navigate('/');
  //   }

  //   const role = localStorage.getItem('role'); 
  //   if (!(role === "Administrateur")){
  //       navigate('/home');
  //   }
  //   }, [navigate])
    

const Formation = ()=>{
  // const idrole = localStorage.getItem('idrole');
  // console.log(idrole);

  const[Formation,setFormations] = useState([]);

  const fetchFormation = () => {
    axios.get('http://localhost:4001/api/formations/all_formations')
      .then(res => {setFormations(res.data)
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchFormation();
  })


  const [recherche,setRecherche] = useState(null);
  return (
    <>
    <center>
    <div className='content'>
      <div className='collabListes'>
        <h1 className="collabListes_title font-bold">Liste des formations</h1>
          <div className="collabListes_Item">
            <div className="search_form">
            <input type='text' placeholder='rechercher ici' onChange={(e) => {
              setRecherche(e.target.value);
            }}
          onKeyUp={(e) => {
               if (e.key === "Enter") {
                e.target.focus(); // Maintenir le focus sur l'input après avoir appuyé sur "Enter"
              }}}/>
            </div>
          </div>
      </div>
    </div>
    </center>

    {Formation.length !== 0 ? (
      <table className="training_table">
          <thead>
              <tr>
                  <th className="w-100">Auteur</th>
                  <th className="w-100">Thème</th>
                  <th className="w-100">Description</th>
                  <th className="w-100">Organisateur(trice)</th>
                  <th className="w-100">Voir plus</th>
              </tr>
          </thead>
          <tbody>
              {recherche === '' || recherche === null ? (Formation.map((formation)=> (
              <tr key={formation.id}>
                {formation.Auteur&&<td >{formation.Auteur.nom} {formation.Auteur.prenom}</td>}
                  <td >{formation.theme}</td>
                  <td >{formation.description}</td>
                  {formation.Formateur ? (<td >{formation.Formateur.nom} {formation.Formateur.prenom}</td>):(<td>Formateur inconnu</td>)}

                  <td ><button className="table_item_icon"><Link to= {`/admin/formation/${formation.id}`}>Voir plus</Link></button></td>
              </tr>
              ))) : (

             Formation.filter((formations)=>formations.theme.toLowerCase().includes(recherche.toLowerCase())||formations.description.toLowerCase().includes(recherche.toLowerCase()) ).map((formation) => (
              <tr key={formation.id}>
                {formation.Auteur&&<td >{formation.Auteur.nom} {formation.Auteur.prenom}</td>}
                  <td >{formation.theme}</td>
                  <td >{formation.description}</td>
                  {formation.Formateur ? (<td >{formation.Formateur.nom} {formation.Formateur.prenom}</td>):(<td>Formateur inconnu</td>)}
                  {/* lien formation/idFormation voir plus */}
                  <td><button className="table_item_icon"><Link to= {`/admin/formation/${formation.id}`}>Voir plus</Link></button></td>
              </tr>
              ))
              )}
          </tbody>
      </table>):
    (
      <h3>Aucune formation pour le moment</h3>
    ) 
    }
    </>
  )
}

  return (
            <div>
              <div className="collabListes">
                {/* <button className="visible" onClick={() => setVisible(!listevisible)}>
                <h1>{listevisible ? 'Voir les demandes de formations' : 'Voir les formations disponibles'}</h1>
                </button> */}
               <Formation />
              </div>
            </div>
  )
}

export default Formations