import React from 'react'
import { Typography } from '@mui/material'
import { motion } from 'framer-motion';
import ContactSearch from './ContactSearch';

const ContactHeader = () => {

  return (
    <div className="p-24 sm:p-32 w-full border-b-1">
      <div className="flex flex-col items-center sm:items-start">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-24 md:text-32 font-extrabold tracking-tight leading-none"
        >
          Liste des collaborateurs
        </Typography>
      </div>

    </div>
  )
}

export default ContactHeader
