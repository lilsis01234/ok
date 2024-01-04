import { useTheme } from '@emotion/react';
import FuseLoading from '@fuse/core/FuseLoading';
import { selectUser } from 'app/store/userSlice';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import { useThemeMediaQuery } from '@fuse/hooks';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { Tab, Tabs } from '@mui/material';
import AproposTab from './tabs/AproposTab';



const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.divider,
        '& > .container': {
            maxWidth: '100%',
        },
    },
}));

function Profile() {
    const theme = useTheme()
    const navigate = useNavigate();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    const user = useSelector(selectUser)
    const idUser = user.data?.CompteId

    const [userData, setUserData] = useState()
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/user/${idUser}/profile`)
            .then(response => {
                setUserData(response.data)
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations du collaborateur connecté', error)
            })
    }, [idUser])

    if (!userData) {
        return <FuseLoading />
    }

    const handleRetour = () => {
        navigate(-1);
    }

    function handleTabChange(event, value) {
        setSelectedTab(value);
    }

    return (
        <Root
            header={
                <div className="flex flex-col">
                    <Box
                        className="h-160 lg:h-320 w-full bg-cover bg-center relative overflow-hidden"
                        sx={{ backgroundColor: 'primary.dark' }}
                    >
                        <svg
                            className="absolute inset-0 pointer-events-none"
                            viewBox="0 0 960 540"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMax slice"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Box
                                component="g"
                                sx={{ color: 'primary.light' }}
                                className="opacity-20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="100"
                            >
                                <circle r="234" cx="196" cy="23" />
                                <circle r="234" cx="790" cy="491" />
                            </Box>
                        </svg>
                        <div className="w-full h-full flex justify-center group-hover:scale-125 duration-700 ease-in-out">
                            <img src="http://localhost:4000/uploads/nom-1700809994203-518251709.png" alt="logo" />
                            {/* <img src="assets/images/logo/LogoSahaza.png" alt="logo" /> */}
                        </div>
                    </Box>
                    <div className="flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72">
                        <div>
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
                            >
                                <Typography
                                    className="flex items-center sm:mb-12"
                                    component={Link}
                                    role="button"
                                    color="inherit"
                                    onClick={() => handleRetour()}
                                >
                                    <FuseSvgIcon size={20}>
                                        {theme.direction === 'ltr'
                                            ? 'heroicons-outline:arrow-sm-left'
                                            : 'heroicons-outline:arrow-sm-right'}
                                    </FuseSvgIcon>
                                    <span className="flex mx-4 font-medium">Retour</span>
                                </Typography>
                            </motion.div>
                        </div>
                        <div className="-mt-96 lg:-mt-88 rounded-full">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
                                {userData.Collab?.image ? (
                                    <Avatar
                                        sx={{ borderColor: 'background.paper' }}
                                        className="w-128 h-128 border-4"
                                        src={`http://localhost:4000/${userData.Collab?.image}`}
                                        alt="User avatar"
                                    />
                                ) : (
                                    <Avatar sx={{ borderColor: 'background.paper' }}
                                        className="w-128 h-128 border-4">{userData.Collab?.nom ? userData.Collab?.nom[0] : '?'}</Avatar>
                                )}
                            </motion.div>
                        </div>
                        <div className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32">
                            <Typography className="text-lg font-bold leading-none">{userData.Collab?.nom} {userData.Collab?.prenom} </Typography>
                            <Typography color="text.secondary">{userData.Collab?.matricule}</Typography>
                        </div>
                        <div className="flex flex-1 justify-end my-16 lg:my-0">
                            <Tabs
                                value={selectedTab}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="inherit"
                                variant="scrollable"
                                scrollButtons={false}
                                className="-mx-4 min-h-40"
                                classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
                                TabIndicatorProps={{
                                    children: (
                                        <Box
                                            sx={{ bgcolor: 'text.disabled' }}
                                            className="w-full h-full rounded-full opacity-20"
                                        />
                                    ),
                                }}
                            >
                                <Tab
                                    className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                                    disableRipple
                                    label="A propos"
                                />
                                <Tab
                                    className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                                    disableRipple
                                    label="Congés"
                                />
                                <Tab
                                    className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                                    disableRipple
                                    label="Formations"
                                />
                            </Tabs>
                        </div>
                    </div>

                </div>
            }
            content = {
                <div className="flex flex-auto justify-center w-full max-w-5xl mx-auto p-24 sm:p-32">
                    {selectedTab === 0 && <AproposTab userData={userData}/>}
                </div>
            }
            scroll={isMobile ? 'normal' : 'page'}
        />
    )
}

export default Profile
