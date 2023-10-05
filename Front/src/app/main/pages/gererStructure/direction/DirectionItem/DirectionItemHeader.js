import { Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';

function DirectionItemHeader(props) {
    const methods = useFormContext();
    const { formState, watch, getValues } = methods;
    const { isValid, dirtyFields } = formState
    const { nomDirection } = watch(nomDirection)
    const theme = useTheme();
    const navigate = useNavigate();



    return (
        <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
            <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
                >
                    <Typography
                        className="flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        // to="/apps/e-commerce/products"
                        color="inherit"
                    >
                        <FuseSvgIcon size={20}> 
                            {theme.direction === 'ltr'
                                ? 'heroicons-outline:arrow-sm-left'
                                : 'heroicons-outline:arrow-sm-right'}
                        </FuseSvgIcon>
                        <span className="flex mx-4 font-medium">Direction</span>
                    </Typography>
                </motion.div>
            </div>
        </div>
    )
}

export default DirectionItemHeader
