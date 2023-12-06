import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import EntrepriseStructureItem from './EntrepriseStructureItem';

function EntrepriseStructure() {
  const [departement, setDepartement] = useState();
  const [loading, setLoading] = useState(true);

  const fetchDepartement = () => {
    axios
      .get('http://localhost:4000/api/departement/allWithoutDirection')
      .then((response) => {
        setDepartement(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données des département')
        setLoading(true)
      })
  }

  useEffect(() => {
    fetchDepartement();
  }, [])

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

  if (loading) {
    return (<FuseLoading />)
  }


  if (departement.length === 0) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            className="flex flex-1 items-center justify-center h-full"
        >
            <Typography color="text.secondary" variant="h5">
                Aucun département enregistré dans la base de donnée!
            </Typography>
        </motion.div>
    );
}




  return (
    <div className="flex grow shrink-0 flex-col items-center container p-24 sm:p-40">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
        <Typography className="mt-16 md:mt-96 text-3xl md:text-6xl font-extrabold tracking-tight leading-7 sm:leading-10 text-center">
          Les départements
        </Typography>
      </motion.div>
      <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mt-32 md:mt-64"
            >
               {departement && departement.map((departement) => (
                    <motion.div variants={item} className="min-w-full sm:min-w-224 min-h-360" key={departement.id}>
                        {/* <DirectionItem membre={membre} key={membre.id} /> */}
                        {<EntrepriseStructureItem departements={departement} key={departement.id}/>}
                    </motion.div>
                ))}
            </motion.div>

    </div>
  )
}

export default EntrepriseStructure
