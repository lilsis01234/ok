import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import AgendaViewMenu from './AgendaViewMenu';
import { useDispatch } from 'react-redux';
import { openNewEventDialog } from './store/eventsSlice';
import EventDialog from './dialog/event/EventDialog';

function AgendaHeader(props) {
    const { calendarRef, currentDate, onToggleLeftSidebar } = props;
    const calendarApi = () => calendarRef.current?.getApi();

    const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

    
    //pour récupérer la position du boîte de dialogue
    const [dialogPosition, setDialogPosition] = useState({x : 0, y : 0});


    const handleDialogOpen = (ev) => {
        // Récupérer les coordonnées du clic de souris par rapport à la fenêtre
        setIsEventDialogOpen(true)
        const positionX = ev.clientX;
        const positionY = ev.clientY;
        
        // Mettre à jour l'état avec les nouvelles coordonnées
        setDialogPosition({ x: positionX, y: positionY });
    };

    //Pour fermer le PopOvez
    const closePopover = () => {
        setIsEventDialogOpen(false);
    }
 



    return (
        <div className="flex flex-col md:flex-row w-full p-12 justify-between z-10 container">
            <div className="flex flex-col sm:flex-row items-center">
                <div className="flex items-center">
                    <IconButton
                        onClick={(ev) => onToggleLeftSidebar()}
                        aria-label="open left sidebar"
                        size="small"
                    >
                        <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
                    </IconButton>
                    <Typography className="text-2xl font-semibold tracking-tight whitespace-nowrap mx-16">
                        {currentDate?.view.title}
                    </Typography>
                </div>

                <div className="flex items-center">
                    <Tooltip title="Précédant">
                        <IconButton aria-label="Previous" onClick={() => calendarApi().prev()}>
                            <FuseSvgIcon size={20}>heroicons-solid:chevron-left</FuseSvgIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Suivant">
                        <IconButton aria-label="Next" onClick={() => calendarApi().next()}>
                            <FuseSvgIcon size={20}>heroicons-solid:chevron-right</FuseSvgIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Aujourd'hui">
                        <div>
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.3 } }}>
                                <IconButton aria-label="today" onClick={() => calendarApi().today()} size="large">
                                    <FuseSvgIcon>heroicons-outline:calendar</FuseSvgIcon>
                                </IconButton>
                            </motion.div>
                        </div>
                    </Tooltip>

                </div>
            </div>


            <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
                <IconButton
                     className="mx-8"
                     aria-label="add"
                     onClick={handleDialogOpen}
                >
                    <FuseSvgIcon>heroicons-outline:plus-circle</FuseSvgIcon>
                </IconButton>
                <AgendaViewMenu currentDate={currentDate} calendarApi={calendarApi} />

            </motion.div>

            {isEventDialogOpen && (
                <EventDialog open={isEventDialogOpen} type={'new'} position={dialogPosition} closePopover={closePopover}/>
            )}


        </div>
    )
}

export default AgendaHeader
