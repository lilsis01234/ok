import React, { useState } from 'react'
import { Box } from '@mui/system';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { motion } from 'framer-motion';
import { Input } from '@mui/material';


function CollaborateurRecherche({updateSearchResults}) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        updateSearchResults(term.trim())
    }


  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center mt-16 -mx-8">
            <Box
                component={motion.div}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                className="flex flex-1 w-full sm:w-auto items-center px-16 mx-8 border-1 rounded-full"
            >
                <FuseSvgIcon color="action" size={20}>
                    heroicons-outline:search
                </FuseSvgIcon>
                <Input
                    placeholder="Search contacts"
                    className="flex flex-1 px-16"
                    disableUnderline
                    value={searchTerm}
                    fullWidth
                    inputProps={{
                        'aria-label': 'Search',
                    }}
                    onChange={handleChange}
                />
            </Box>

        </div>
  )
}

export default CollaborateurRecherche
