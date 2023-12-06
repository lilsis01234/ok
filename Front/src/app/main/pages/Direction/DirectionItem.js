import { Avatar, Card, Divider, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

function DirectionItem(props) {
    const { membre } = props;



    return (
        <Card
            component={Link}
            to={membre.id}
            role="button"
            className="flex flex-col items-start w-full h-full p-24 rounded-lg shadow rounded-lg hover:shadow-xl transition-shadow duration-150 ease-in-out"
        >
            <div className="flex flex-col flex-auto justify-start items-center w-full">
                <Typography className="mt-20 text-lg font-medium leading-5">{membre.departement1?.Direction?.nomDirection}</Typography>
                <Divider className="w-48 mt-24 h-2" />
            </div>
            <div className="flex flex-col flex-auto w-full p-32 text-center">
                <div className="w-128 h-128 mx-auto rounded-full overflow-hidden">
                    {/* <img className="w-full h-full object-cover" src={`http://localhost:4000/${membre.image}`} alt="member" /> */}
                    {membre.image ? (
                        <Avatar
                            sx={{
                                backgroundColor: 'background.paper',
                                color: 'text.secondary',
                            }}
                            className="avatar text-32 font-bold w-96 h-96" alt="user photo" src={`http://localhost:4000/${membre.image}`} />
                    ) : (
                        <Avatar sx={{
                            backgroundColor: 'background.paper',
                            color: 'text.secondary',
                        }}
                            className="avatar text-32 font-bold w-96 h-96">{membre.nom ? membre.nom[0] : '?'}</Avatar>
                    )}

                </div>
                <Typography className="mt-24 font-medium">{membre.prenom} {membre.nom}</Typography>
                <Typography color="text.secondary">{membre.poste1?.titrePoste}</Typography>
            </div>

        </Card>
    )
}

export default DirectionItem
