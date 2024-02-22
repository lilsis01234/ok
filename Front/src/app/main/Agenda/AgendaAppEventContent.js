import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import clsx from 'clsx';

function AgendaAppEventContent(props) {
    const { eventInfo } = props;

    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor:  '#204944',
                color: 'white',
            }}
            className={clsx('flex items-center w-full rounded-4 px-8 py-2 h-22 text-white')}
        >
            <Typography className="text-12 font-semibold">{eventInfo.timeText}</Typography>
            <Typography className="text-12 px-4 truncate">{eventInfo.event.title}</Typography>
        </Box>
    )
    
}

export default AgendaAppEventContent
