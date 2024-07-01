import React from 'react'
import { Avatar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const DemandeFormationListAll = ({ demande }) => {
  console.log(demande)
  return (
    <div>
      {demande.length !== 0 && demande.map((item, index) => (
        <div key={index} className="training-request-item flex items-center">
          {item.Profil_Collab?.image ? (
            <Avatar
              key={item.Profil_Collab?.id}
              className="w-96 h-96 mr-10"
              alt={item.Profil_Collab?.nom}
              src={`http://localhost:4000/${item.Profil_Collab?.image}`}
            />
          ) : (
            <Avatar
              key={item.Profil_Collab?.id}
              className="w-96 h-96 mr-10"
              alt={item.Profil_Collab?.nom}
            >
              {item.Profil_Collab?.nom ? item.Profil_Collab?.nom[0] : '?'}
            </Avatar>
          )}
          <div>
            <Typography className="font-bold">
              {item.Profil_Collab?.nom} {item.Profil_Collab?.prenom}
            </Typography>
            <Typography className="text-gray-600">{item.titre}</Typography>
            <Typography className="text-gray-500">{item.details}</Typography>

            <Link to={`/voirPlus/demande/${item.id}`} className="text-blue-500 underline mb-2 block">
              Voir plus
            </Link>
            {/* <div className="flex">
              <button onClick={() => Approuver(item.id)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                Approuver
              </button>
              <button onClick={() => Desapprouver(item.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                Desapprouver
              </button>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DemandeFormationListAll
