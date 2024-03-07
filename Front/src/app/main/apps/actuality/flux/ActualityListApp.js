import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import TimelineTab from './tabs/TimelineTab';
import useThemeMediaQuery from './../../../../../@fuse/hooks/useThemeMediaQuery';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const [listeActuality, setListActuality] = useState([]);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const navigate = useNavigate();

  //Récupération de la liste des actualités
  const fetchActualities = () => {
    axios.get('http://localhost:4000/api/actualite/all')
      .then(res => { setListActuality(res.data) })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchActualities();
  }, []);

  return (
    <Root
      header= {
        <div className="flex flex-col">
          <Box className="h-160 lg:h-112 object-cover w-full" sx={{ backgroundColor: 'primary.main' }}>

          </Box>

          <div className="flex flex-col flex-0 lg:flex-row items-center max-w-7xl w-full mx-auto px-32 lg:h-72">
            <div className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32">
              <Typography color="text.secondary">< span className="hover:cursor-pointer hover:underline hover:text-blue-900" onClick={() => navigate("/apps/timeline")}>Actualitées</span>  liste des actualitées</Typography>
            </div>
          </div>
        </div>
      }
      content={
        <div className="flex flex-auto justify-center w-full max-w-7xl mx-auto p-24 sm:p-32">
          <TimelineTab listeActuality={listeActuality} />
        </div>
      }
      scroll={isMobile ? 'normal' : 'page'}
    />
  );

}

export default ActualityListApp;  
