import React from 'react'
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Box, Card } from '@mui/material';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

function AccountSetting() {
    const container = {
        show: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }
    
    
      const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }

      const link_password = '/setting/account/password'
      const link_profile = '/settings/account/profile'
    return (
        <div className="flex grow shrink-0 flex-col items-center container p-24 sm:p-40">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
                <Typography className="mt-16 md:mt-96 text-3xl md:text-6xl font-extrabold tracking-tight leading-7 sm:leading-10 text-center">
                    Paramètres de compte
                </Typography>
            </motion.div>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mt-32 md:mt-64 items-center justify-center"
            >
                  <motion.div variants={item} className="min-w-full sm:min-w-224 min-h-360">
                    <Card 
                         component={Link}
                         to={link_password}
                         role="button"
                         className="flex flex-col items-start w-full h-full p-24 rounded-lg shadow rounded-lg hover:shadow-xl transition-shadow duration-150 ease-in-out"
                    >
                        <div className="flex flex-col flex-auto justify-center items-center w-full">
                            <Box
                                 sx={{
                                    backgroundColor: 'secondary.light',
                                    color: 'secondary.dark',
                                  }}
                                  className="flex items-center justify-center p-16 rounded-full"
                            >
                                <FuseSvgIcon size={48}>heroicons-outline:lock-closed</FuseSvgIcon>
                            </Box>
                            <Typography  className="mt-20 text-lg font-medium leading-5">Modifier mot de passe</Typography>
                        </div>
                    </Card>
                  </motion.div>
                  <motion.div variants={item} className="min-w-full sm:min-w-224 min-h-360">
                    <Card 
                         component={Link}
                         to={link_profile}
                         role="button"
                         className="flex flex-col items-start w-full h-full p-24 rounded-lg shadow rounded-lg hover:shadow-xl transition-shadow duration-150 ease-in-out"
                    >
                        <div className="flex flex-col flex-auto justify-center items-center w-full">
                            <Box
                                 sx={{
                                    backgroundColor: 'secondary.light',
                                    color: 'secondary.dark',
                                  }}
                                  className="flex items-center justify-center p-16 rounded-full"
                            >
                                <FuseSvgIcon size={48}>heroicons-outline:users</FuseSvgIcon>
                            </Box>
                            <Typography  className="mt-20 text-lg font-medium leading-5">Modifier le profil</Typography>
                        </div>
                    </Card>
                  </motion.div>
            </motion.div>
        </div>
    )
}

export default AccountSetting
