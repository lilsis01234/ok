import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../../../image/sahaza.svg';
import {FaPlus,FaListUl} from 'react-icons/fa';
import {MdWorkspacesFilled,MdOutlineBusiness} from 'react-icons/md'



const CollabParDepartement = () => {
  const { nomDepartement } = useParams();
  const[recherche,setRecherche]=useState('');
  const [collabs, setCollabs] = useState([]);
  const [filteredCollabs, setFilteredCollabs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/collaborateur/all_collaborateurs')
      .then((res) => {
        setCollabs(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const filtered = collabs.filter(collab => collab.departement.includes(nomDepartement));
    setFilteredCollabs(filtered);
  }, [collabs, nomDepartement]);

  return (
    <div>
      <h1>Collaborateurs chez {nomDepartement}</h1>
     
    <div className="main">
      <div className="sidebar">
      <img className="logo" src={logo} alt='logo sahaza'/>
      <input type='text' id='recherche'className="add-input" placeholder="rechercher" onChange={(e)=>setRecherche(e.target.value)}/>
      <button className="ajout"><Link to='/admin/add'><FaPlus/></Link></button>
      <button className="ajout2"><Link to='/admin/listeCollab'><FaListUl/></Link></button>
      <button className="ajout2"><Link to='/admin/postes'><MdWorkspacesFilled/></Link></button>
      <button className="ajout2"><Link to='/admin/departements'><MdOutlineBusiness/></Link></button>
     
      </div>

    <div className='tableau'>
    <div  className="listeCollabo">
      <table className="listeCollabo">
          <thead>
          <tr>
              <th>Photo</th>
              <th>Numéro matricule</th>
              <th>Nom</th>
              <th>Prenoms</th>
              <th>Adresse</th>
              <th>Ville</th>
              <th>Téléphone</th>
              <th>Date de naissance</th>
              <th>Poste</th>
              <th>Date d'embauche</th>

          </tr>
          </thead>
          <tbody>
            {recherche === '' ? (filteredCollabs.map(Collab =>
            <tr key={Collab.id}>
              <td><img src={`http://localhost:4000/${Collab.image}`} alt={Collab.nom}/></td>
              <td>{Collab.matricule}</td>
              <td>{Collab.nom}</td>
              <td>{Collab.prenom}</td>
              <td>{Collab.lot}</td>
              <td>{Collab.ville}</td>
              <td>{Collab.tel}</td>
              <td>{Collab.dateNaissance}</td>
              <td>{Collab.titrePoste}</td>
              <td>{Collab.dateEmbauche}</td>
              </tr>
            )):
            (filteredCollabs.filter(filteredCollabs=>filteredCollabs.nom.includes(recherche)).map(Collab=>
                <tr key={Collab.id}>
                <td><img src={`http://localhost:4000/${Collab.image}`} alt={Collab.nom}/></td>
                <td>{Collab.matricule}</td>
                <td>{Collab.nom}</td>
                <td>{Collab.prenom}</td>
                <td>{Collab.lot}</td>
                <td>{Collab.ville}</td>
                <td>{Collab.tel}</td>
                <td>{Collab.dateNaissance}</td>
                <td>{Collab.titrePoste}</td>
                <td>{Collab.dateEmbauche}</td>
                </tr>
            ))
            }
          </tbody>    
          </table>
    </div>
    </div>
    </div>
    </div>
  );
}

export default CollabParDepartement;