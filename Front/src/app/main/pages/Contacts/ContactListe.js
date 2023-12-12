import { List, Typography } from '@mui/material';

import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import Divider from '@mui/material/Divider';
import ContactListItem from './ContactListItem';


const ContactListe = (props) => {
    const {listCollab} = props
    if (!listCollab) {
        return null;
    }

    if (listCollab.length === 0) {
        return (
          <div className="flex flex-1 items-center justify-center h-full">
            <Typography color="text.secondary" variant="h5">
             Il n'y a pas de collaborateurs!
            </Typography>
          </div>
        );
      }

  return (
    <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
    className="flex flex-col flex-auto w-full max-h-full"
    >
        {Object.entries(listCollab).map(([key, collab]) => {
            return (
                <div key={key} className="relative">
                    {/* <Typography  color="text.secondary" className="px-32 py-4 text-14 font-medium">
                    {key}
                    </Typography> */}
                    <List className="w-full m-0 p-0">
                        <ContactListItem key={collab.id} collab={collab}/>
                    </List>
                    <Divider/>
                </div>
            )
        })}

    </motion.div>
  )
}

export default ContactListe
