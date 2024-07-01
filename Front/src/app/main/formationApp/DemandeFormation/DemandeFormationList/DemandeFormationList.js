import FusePageCarded from '@fuse/core/FusePageCarded';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import axios from 'axios';
import { useThemeMediaQuery } from '@fuse/hooks';
import DemandeFormationListHeader from './DemandeFormationListHeader';
import DemandeFormationListAll from './DemandeFormationListAll';

function DemandeFormationList() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  const [searchResults, setSearchResults] = useState([]);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    axios.get('http://localhost:4000/api/demande_formation/view/all')
      .then(response => {
        setSearchResults(response.data)
        console.log(response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])


  return (
    <FusePageCarded
      header={
        <DemandeFormationListHeader
          // updateSearchResults={updateSearchResults}
        />
      }
      content={
        <motion.div
          className="flex flex-wrap p-24"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="widget flex w-full">
              <DemandeFormationListAll demande={searchResults}/>
          </motion.div>
        </motion.div>
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default DemandeFormationList
