import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Typography } from '@mui/material';
import DirectionItem from './DirectionItem';
import DirectionNewItem from './DirectionNewItem';

function DirectionList() {
    const [direction, setDirection] = useState([]);

    const container = {
        show: {
            transition: {
                staggerChildren: 0.1,
            }
        }
    }

    const fetchDirection = () => {
        axios.get('http://localhost:4001/api/direction/all')
            .then((response) => {
                setDirection(response.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        fetchDirection();
    }, [])

    console.log(direction)

    return (
        <div className="flex grow shrink-0 flex-col items-center container p-24 sm:p-40">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
                <Typography className="mt-16 md:mt-96 text-3xl md:text-6xl font-extrabold tracking-tight leading-7 sm:leading-10 text-center">
                    Direction List
                </Typography>
            </motion.div>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mt-32 md:mt-64"
            >
                {direction.map((direction) => (
                    <motion.div className="min-w-full sm:min-w-224 min-h-360" key={direction.id}>
                        <DirectionItem direction={direction} key={direction.id} />
                    </motion.div>
                ))}

                {/* <motion.div className="min-w-full sm:min-w-224 min-h-360">
                    <DirectionNewItem />
                </motion.div> */}

            </motion.div>


        </div>
    )
}

export default DirectionList
