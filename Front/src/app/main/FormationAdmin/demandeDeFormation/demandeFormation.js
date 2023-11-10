import React,{useState,useEffect} from 'react'
import axios from 'axios'

const DemandeFormations = () => {
  const[DemandeFormations,setDemandes] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:4000/api/demande_formation/approuveparRrh')
    .then(res=>setDemandes(res.data))
    .catch(err=>console.log(err))
  })
  return (
    <div>
        <h1 className="collabListes_title font-bold">Demandes de formations</h1>
        {DemandeFormations.map((demande)=>(
          <h1>{demande.nom}</h1>
        ))}
    </div>
  )
}

export default DemandeFormations