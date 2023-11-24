import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useState } from 'react';
import TimelineTab from './tabs/TimelineTab';
import useThemeMediaQuery from './../../../../../@fuse/hooks/useThemeMediaQuery';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '& > .container': {
      maxWidth: '100%',
    },
  },
}));

function ActualityListApp() {
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
    <Root
      header={
        <div className="flex flex-col">
          <img
            className="h-160 lg:h-320 object-cover w-full"
            src="assets/images/pages/profile/cover.jpg"
            alt="Profile Cover"
          />

          <div className="flex flex-col flex-0 lg:flex-row items-center max-w-7xl w-full mx-auto px-32 lg:h-72">
            <div className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32">
              <Typography color="text.secondary">développeur Web, Fivoarana</Typography>
            </div>

            <div className="hidden lg:flex h-32 mx-32 border-l-2" />

            <div className="flex items-center mt-24 lg:mt-0 space-x-24">
              <div className="flex flex-col items-center">
                <Typography className="text-sm font-medium" color="text.secondary">
                  Collaborateurs
                </Typography>
              </div>
            </div>
          </div>
        </div>
      }
      content={
        <div className="flex flex-auto justify-center w-full max-w-7xl mx-auto p-24 sm:p-32">
          <TimelineTab />
        </div>
      }
      scroll={isMobile ? 'normal' : 'page'}
    />
  );
}

export default ActualityListApp;  
