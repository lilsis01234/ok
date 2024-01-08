import { useDispatch, useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Typography, Button, Paper, Input } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ActualitiesHeader({ updateSearchResults}) {
  const dispatch = useDispatch();

  const [searchTerm, setSearhTerm] = useState('');



    const handleChange = (e) => {
        const term = e.target.value;
        // console.log(term)
        setSearhTerm(term);
        updateSearchResults(term.trim());
    };

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight"
      >
        Actualités
      </Typography>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Rechercher Actualités"
            className="flex flex-1"
            disableUnderline
            fullWidth
            value={searchTerm}
            inputProps={{
              'aria-label': 'Search',
            }}
            onChange={handleChange}
          
          />
        </Paper>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            className=""
            component={Link}
            to="/apps/addActuality"
            variant="contained"
            color="secondary"
            startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
          >
            Ajouter
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default ActualitiesHeader;
