import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Avatar, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Divider } from '@mui/material'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon'
import format from 'date-fns/format';
import {Box} from '@mui/material'

import FuseLoading from '@fuse/core/FuseLoading/FuseLoading'

const ContactView = () => {
    const [data, setData] = useState()
    const { id } = useParams();



    const fetchCollaborateur = () => {
        axios.get(`http://localhost:4000/api/user/${id}/profile`)
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchCollaborateur();
    }, [])

    if (!data) {
        return <FuseLoading />
    }




    return (
        <>
            {data && (
                <>
                    <Box
                        className="relative h-160 sm:h-192 px-32 sm:px-48"
                        sx={{
                            backgroundColor: 'background.default',
                        }}
                    ></Box>

                    <div className="relative flex flex-col flex-auto items-center p-24 pt-0 sm:p-48 sm:pt-0">
                        <div className="w-full max-w-3xl">
                            <div className="flex flex-auto items-end -mt-64">
                                <Avatar
                                    sx={{
                                        borderWidth: 4,
                                        borderStyle: 'solid',
                                        borderColor: 'background.paper',
                                        backgroundColor: 'background.default',
                                        color: 'text.secondary',
                                    }}
                                    className="w-128 h-128 text-64 font-bold"
                                    src={`http://localhost:4000/${data.Collab?.image}`}
                                >

                                </Avatar>

                            </div>

                            <Typography className="mt-12 text-2xl font-bold truncate">{data.Collab?.matricule}</Typography>
                            <Typography className="mt-12 text-2xl font-bold truncate">{data.Collab?.nom}  {data.Collab?.prenom} </Typography>
                            <Divider className="mt-16 mb-24" />

                            <div className="flex flex-col space-y-32">
                                {data.Collab?.poste1.titrePoste && (
                                    <div className="flex items-center">
                                        <FuseSvgIcon>heroicons-outline:briefcase</FuseSvgIcon>
                                        <div className="ml-24 leading-6">{data.Collab?.poste1.titrePoste}</div>
                                    </div>
                                )}

                                {data.Collab?.projet1?.nomProjet && (
                                    <div className="flex items-center">
                                        <FuseSvgIcon>heroicons-outline:users</FuseSvgIcon>
                                        <div className="ml-24 leading-6">{data.Collab?.projet1?.nomProjet}</div>
                                    </div>
                                )}



                                {data.Collab.equipe?.nomEquipe && (
                                    <div className="flex items-center">
                                        <FuseSvgIcon>heroicons-outline:user-group</FuseSvgIcon>
                                        <div className="ml-24 leading-6">{data.Collab.equipe?.nomEquipe}</div>
                                    </div>
                                )}



                                {data.Collab.departement1.nomDepartement && (
                                    <div className="flex items-center">
                                        <FuseSvgIcon>heroicons-outline:office-building</FuseSvgIcon>
                                        <div className="ml-24 leading-6">{data.Collab?.departement1?.nomDepartement}</div>
                                    </div>
                                )}

                                {data.Collab.site && (
                                    <div className="flex items-center">
                                        <FuseSvgIcon>heroicons-outline:office-building</FuseSvgIcon>
                                        <div className="ml-24 leading-6">{data.Collab?.site}</div>
                                    </div>
                                )}


                                <div className="flex">
                                    <FuseSvgIcon>heroicons-outline:mail</FuseSvgIcon>
                                    <div className="min-w-0 ml-24 space-y-4">
                                        <div className="flex items-center leading-6" key={data.email}>
                                            <a
                                                className="hover:underline text-primary-500"
                                                href={`mailto: ${data.email}}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {data.email}
                                            </a>


                                        </div>
                                    </div>
                                </div>

                                <div className="flex">
                                    <FuseSvgIcon>heroicons-outline:phone</FuseSvgIcon>
                                    <div className="min-w-0 ml-24 space-y-4">
                                        <div className="flex items-center leading-6" >
                                            <div className="ml-10 font-mono">{data.Collab?.tel}</div>
                                            <div className="ml-10 font-mono">{data.Collab?.tel2}</div>
                                        </div>

                                    </div>
                                </div>


                                {data.Collab?.lot && (
                                    <div className="flex items-center">
                                        <FuseSvgIcon>heroicons-outline:location-marker</FuseSvgIcon>
                                        <div className="ml-24 leading-6">{data.Collab.lot} {data.Collab.quartier} {data.Collab.ville}</div>
                                    </div>
                                )}

                                {data.Collab?.dateNaissance && (
                                    <div className="flex items-center">
                                        <FuseSvgIcon>heroicons-outline:cake</FuseSvgIcon>
                                        <div className="ml-24 leading-6">
                                            {format(new Date(data.Collab?.dateNaissance), 'MMMM d, y')}
                                        </div>
                                    </div>
                                )}


                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ContactView
