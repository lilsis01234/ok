import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState} from 'react';
import useThemeMediaQuery from '../../../../../@fuse/hooks/useThemeMediaQuery';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import moment from 'moment';

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

function ActualitiesByCategorie() {

  const navigate = useNavigate();
  const {actualityId} = useParams();
  const [Actuality, setActuality] = useState([]);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

//Récupération de la liste des actualités
const fetchActuality = () => {
  axios.get(`http://localhost:4000/api/actualite/${actualityId}`)
    .then(res => {
        setActuality(res.data);
    })
    .catch(err => console.log(err));
}

useEffect(() => {
  fetchActuality();
}, [actualityId]);

console.log(Actuality);
  return (
    <Root
      header={
        <div className="flex flex-col">
          <Box className="h-160 lg:h-112 object-cover w-full" sx={{ backgroundColor: 'primary.main' }}>

          </Box>
          <div style={{ backgroundImage: `url(http://localhost:4000/uploads/nom-1702387770857-570566007.png)`, backgroundColor: '#fafafd'}}>
            <div className="flex flex-col flex-0 lg:flex-row items-center max-w-7xl w-full mx-auto py-40 px-16"  >
              <div className="flex flex-row w-full justify-between items-center">
                <Typography className='text-3xl font-bold'>Détail de l'actualitée </Typography>
                <Typography color="text.secondary">< span className="hover:cursor-pointer" onClick={() => navigate("/apps/timeline")}>Actualitées</span> > {Actuality?.actuality?.titre}</Typography>
              </div>
            </div>
          </div>
        </div>
      }
      content={
        <div className="flex flex-auto flex-col justify-center items-center w-full max-w-7xl mx-auto p-24 sm:p-32">
          <div>
            <Typography className='text-center my-16' color="text.secondary">par :  {Actuality?.actuality?.Compte?.Collab?.nom} {Actuality?.actuality?.Compte?.Collab?.prenom} </Typography>
            <Typography className='text-4xl font-bold text-center mb-32'>{Actuality?.actuality?.titre} </Typography>
          </div>
          <div  className="mb-40">
            <div className="flex flex-row items-center justify-center">
              <FuseSvgIcon className="text-48 mr-10" size={16} color="text.secondary">heroicons-outline:calendar</FuseSvgIcon>
              <Typography className='text-center' color="text.secondary">{moment(Actuality?.actuality?.date_publication).format('DD MMM YYYY')}</Typography>
            </div>
          </div>
          <div className="max-w-4xl">
            {Actuality?.actuality?.image && (
              <img src={`http://localhost:4000/${Actuality?.actuality?.image}`} alt="image mise en avant" />
            )}
          </div>
        </div>
      }
      scroll={isMobile ? 'normal' : 'page'}
    />
  );
}

export default ActualitiesByCategorie;  
