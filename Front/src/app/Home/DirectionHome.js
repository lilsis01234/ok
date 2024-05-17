import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

function DirectionHome() {
    const [membreDirection, setMembreDirection] = useState(null);
    
    const fetchDirection = () => {
        axios.get('http://localhost:4000/api/membreDirection/all')
            .then((response) => {
                setMembreDirection(response.data)
            })
            .catch((eror) => {
                console.error('Erreur lors de la récupération des donnés concernant les membres de la direction')
            })
    }

    useEffect(() => {
        fetchDirection();
    }, [])


    const container = {
        show: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }


    if (!Array.isArray(membreDirection)) {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            className="flex flex-1 items-center justify-center h-full"
          >
            <Typography color="text.secondary" variant="h6">
                Pas de donnée direction enregistrée pour le moment!
            </Typography>
          </motion.div>
        );
      }






  return (
    <div>
      
    </div>
  )
}

export default DirectionHome
