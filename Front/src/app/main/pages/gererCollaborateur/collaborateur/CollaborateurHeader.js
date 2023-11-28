import { Typography, Button} from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';


function CollaborateurHeader() {
  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
            <Typography
                component={motion.span}
                initial={{ x: -20 }}
                animate={{ x: 0, transition: { delay: 0.2 } }}
                delay={300}
                className="text-24 md:text-32 font-extrabold tracking-tight"
            >
                Collaborateurs
            </Typography>
            <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                >
                    <Button
                        className=""
                        component={Link}
                        to="/manage/collaborator/new"
                        variant="contained"
                        color="secondary"
                        startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
                    >
                        Ajouter
                    </Button>
                </motion.div>
            </div>

        </div>
  )
}

export default CollaborateurHeader