import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import DirectionItem from './DirectionItem';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';

function Direction() {
    const [membreDirection, setMembreDirection] = useState();
    const [loading, setLoading] = useState(true);

    const fetchDirection = () => {
        axios
            .get('http://localhost:4000/api/membreDirection/all')
            .then((response) => {
                // console.log(response.data)
                setMembreDirection(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des donnés concernant les membres de la direction')
                setLoading(true)
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


    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    if(loading){
        return(<FuseLoading/>)
    }


    return (
        <div className="flex grow shrink-0 flex-col items-center container p-24 sm:p-40">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
                <Typography className="mt-16 md:mt-96 text-3xl md:text-6xl font-extrabold tracking-tight leading-7 sm:leading-10 text-center">
                    Les directions
                </Typography>
            </motion.div>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mt-32 md:mt-64"
            >
                {membreDirection && membreDirection.map((membre) => (
                    <motion.div variants={item} className="min-w-full sm:min-w-224 min-h-360" key={membre.id}>
                        <DirectionItem membre={membre} key={membre.id} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default Direction
