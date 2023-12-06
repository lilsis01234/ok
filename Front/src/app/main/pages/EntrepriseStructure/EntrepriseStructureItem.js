import { Card, Typography, Divider, AvatarGroup, Avatar } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';


function EntrepriseStructureItem(props) {
    const { departements } = props;
    const { departement, membres } = departements
    const link = `/entreprise/structure/${departement.id}`

    return (
        <Card
            component={Link}
            to={link}
            role="button"
            className="flex flex-col items-start w-full h-full p-24 rounded-lg shadow rounded-lg hover:shadow-xl transition-shadow duration-150 ease-in-out"
        >
            <div className="flex flex-col flex-auto justify-start items-start w-full">
                <Typography className="mt-20 text-lg font-medium leading-5">{departement.nomDepartement}</Typography>
                <Divider className="w-48 mt-24 h-2" />
            </div>
            <div className="flex flex-col flex-auto justify-end w-full">
                <div className="flex items-center mt-24 -space-x-6">
                    <AvatarGroup max={4}>
                        {membres.map((member) => (
                            // ...
                            (
                                member.image ? (
                                    <Avatar key={member.id} src={`http://localhost:4000/${member.image}`} />
                                ) : (
                                    <Avatar key={member.id}>{member.nom ? member.nom[0] : '?'}</Avatar>
                                )
                            )
                            // ...
                        ))}
                    </AvatarGroup>
                </div>
            </div>
            <div className="flex items-center mt-24 text-md font-md">
                <Typography color="text.secondary">{departement.Direction?.nomDirection}</Typography>
            </div>
        </Card>
    )
}

export default EntrepriseStructureItem
