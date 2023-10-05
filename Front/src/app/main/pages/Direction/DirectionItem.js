import { Card, Divider, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function DirectionItem(props) {
  const { direction } = props;

  const [dirigeantData, setDirigeantData] = useState([]);

  const fetchDirigeant = () => {
    axios.get('http://localhost:4000/api/collaborateur/dirigeant')
      .then((response) => {
        setDirigeantData(response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchDirigeant()
  }, [])


  let dirigeant = []
  for (collab in dirigeantData) {
    if (collab.departement1.Direction.nomDirection === direction.nomDirection ||
      collab.departement2.Direction.nomDirection === direction.nomDirection) {
      dirigeant = collab
    }
  }

  console.log(dirigeant)
  
  let id = direction.id




  return (
    <Card
      component={Link}
      to={`/business/direction/${id}`}
      role="button"
      className="flex flex-col items-start w-full h-full p-24 rounded-lg shadow rounded-lg hover:shadow-xl transition-shadow duration-150 ease-in-out"
    >
      <div className="flex flex-col flex-auto justify-start items-start w-full">
        <Typography className="mt-20 text-lg font-medium leading-5">{direction.nomDirection}</Typography>
        <Divider className="w-48 mt-24 h-2" />
      </div>
      <div className="flex flex-col flex-auto justify-end w-full">
        {dirigeant.map((dirigeant) => {
          <>
            <div className="flex items-center mt-24 -space-x-6">
              <Avatar alt="member" src={`http://localhost:4000/${dirigeant.image}`} />
            </div>
            <div className="flex items-center mt-24 text-md font-md">
              <Typography color="text.secondary">{dirigeant.nom} {dirigeant.prenom}</Typography>
            </div>
          </>
        })}
      </div>


    </Card>
  )
}

export default DirectionItem

