import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState} from 'react';
import useThemeMediaQuery from '../../../../../@fuse/hooks/useThemeMediaQuery';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { pink,yellow } from '@mui/material/colors';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import parse from 'html-react-parser';
import moment from 'moment';
import Card from '@mui/material/Card';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
  const [relatedActuality, setRelatedActuality] = useState([]);
  const [prevandnext, setPrevAndNext] = useState([]);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const maxChars = 100;
  const maxCharsTitle = 40; 


  //Récupération de la liste des actualités similaire
  const fetchActualities = () => {
    axios.get(`http://localhost:4000/api/actualite/related/${actualityId}`)
      .then(res => {setRelatedActuality(res.data)})
      .catch(err => console.log(err));
  }

  const fetchPrevAndNextActuality = () => {
    axios.get(`http://localhost:4000/api/actualite/prevandnext/${actualityId}`)
      .then(res => {setPrevAndNext(res.data)})
      .catch(err => console.log(err));
  }
  
  //Récupération de la liste des actualités
  const fetchActuality = () => {
    axios.get(`http://localhost:4000/api/actualite/${actualityId}`)
      .then(res => {
          setActuality(res.data);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchActualities();
    fetchActuality();
    fetchPrevAndNextActuality();
  }, [actualityId]);



  return (
    <Root
      header={
        <div className="flex flex-col">
          <Box className="h-160 lg:h-112 object-cover w-full" sx={{ backgroundColor: 'primary.main' }}>

          </Box>
          <div style={{ backgroundImage: `url(http://localhost:4000/uploads/nom-1702387770857-570566007.png)`, backgroundColor: '#fafafd'}}>
            <div className="flex flex-col flex-0 lg:flex-row items-center max-w-7xl w-full mx-auto py-40 px-16"  >
              <div className="flex flex-row w-full justify-between items-center">
                <Typography className='text-3xl font-bold'>Détail de l'actualité </Typography>
                <Typography color="text.secondary">< span className="hover:cursor-pointer hover:underline hover:text-blue-900" onClick={() => navigate("/apps/timeline")}>Actualitées</span> > {Actuality?.actuality?.titre}</Typography>
              </div>
            </div>
          </div>
        </div>
      }
      content={
        <div className="flex flex-auto flex-col justify-center items-center w-full max-w-7xl mx-auto p-24 sm:p-32">
          <div>
            <Typography className='text-center my-16' color="text.secondary">par :  {Actuality?.actuality?.Compte?.Collab?.nom} {Actuality?.actuality?.Compte?.Collab?.prenom} </Typography>
            <Typography className='text-4xl font-bold text-center mb-24'>{Actuality?.actuality?.titre} </Typography>
          </div>
          <div  className="mb-40">
            <div className="flex flex-row items-start">
              <div className="flex flex-row items-center justify-center mr-20">
                <FuseSvgIcon className="text-48 mr-5" size={16} color="text.secondary">heroicons-outline:calendar</FuseSvgIcon>
                <Typography className='text-center' color="text.secondary">{moment(Actuality?.actuality?.date_publication).format('DD MMM YYYY')}</Typography>
              </div>
              
              {Actuality?.actuality?.categorie && Actuality?.actuality?.categorie.length != 0 && ( 
                <div className="flex flex-row">
                  {Actuality.actuality.categorie.map((categorie) => (
                    <div className="flex flex-row items-center hover:cursor-pointer group mr-20" onClick={() => {navigate(`/apps/timeline/categorie/${categorie.id}`);}}>
                      <FuseSvgIcon className="text-48 mr-5 group-hover:text-blue-900" size={16} color="text.secondary">heroicons-outline:folder</FuseSvgIcon>
                      <Typography className='text-center group-hover:text-blue-900' color="text.secondary">{categorie.nom}</Typography>
                    </div>
                    ))}
                </div>
              )}

              {Actuality?.actuality?.Type && Actuality?.actuality?.Type.length != 0 && (
                <div className="flex flex-row items-center justify-center">
                  {Actuality.actuality.Type.map((type) => (
                    <div className="flex flex-row items-center hover:cursor-pointer group  mr-20" onClick={() => {navigate(`/apps/timeline/type/${type.id}`);}}>
                      <FuseSvgIcon className="text-48 mr-5 group-hover:text-blue-900" size={16} color="text.secondary">heroicons-outline:minus</FuseSvgIcon>
                      <Typography className='text-center group-hover:text-blue-900' color="text.secondary">{type.nom}</Typography>
                    </div>
                  ))}
                </div>
              )}
              
            </div>
          </div>
          {Actuality?.actuality?.Type && Actuality?.actuality?.Type.length != 0 && (
            <div className='mb-40'>
                <div className="flex flex-row items-center justify-center">
                  {Actuality.actuality.Tag.map((tag) => (
                    <div className="hover:cursor-pointer mr-20" onClick={() => {navigate(`/apps/timeline/tag/${tag.id}`);}}>
                      <Typography className='text-center text-sky-400/25 text-blue-600 hover:text-blue-800 hover:underline hover:text-sky-400/100'>#{tag.nom}</Typography>
                    </div>
                  ))}
                </div>
            </div>
          )}

          {Actuality?.actuality?.image && (
            <div className="w-4xl flex justify-center mb-60">
                <img src={`http://localhost:4000/${Actuality?.actuality?.image}`} alt="image mise en avant" className="max-w-[60%] h-auto" />
            </div>
          )}

          {Actuality?.actuality?.contenu && (
            <div className="w-3xl flex mb-32">
              <Card className="w-full p-32" >
                <div dangerouslySetInnerHTML={{ __html: Actuality?.actuality?.contenu }} />
              </Card>
            </div>
          )}
          <div className="w-3xl flex mb-32">
            <ButtonGroup className="w-full" variant="contained" aria-label="outlined button group">
              <Button 
                className="w-1/2 justify-start pl-20" 
                startIcon={<NavigateBeforeIcon />} 
                onClick={() => {navigate(`/actuality/${prevandnext.actualitePrecedente}`)}} 
                disabled={prevandnext.actualitePrecedente === null}
              >
                Prev post
              </Button>
              <Button 
                className="w-1/2 justify-end pr-20" 
                variant="contained" 
                endIcon={<NavigateNextIcon />} 
                onClick={() => {navigate(`/actuality/${prevandnext.actualiteSuivante}`)}} 
                disabled={prevandnext.actualiteSuivante === null}
              >
                Next post
              </Button>
            </ButtonGroup>
          </div>
          <div className='w-3xl flex justify-center border-b-2 border-slate-900 my-32'>
            <Typography className='after:content-[" "] after:w-full after:absolute after:right-0 after:left-0 after:bottom-0 after:h-3 after:bg-[#818cf8] text-2xl font-bold text-center pb-10 inline-block relative' color="text.secondary">Articles Similaires</Typography>
          </div>
          <div className="w-3xl p-16 flex flex-row flex-wrap">
            { 
              relatedActuality.map((n) => {
              return (
                <div className="flex w-2/4 px-16 mb-32">   
                  <Card className="w-full shadow-md hover:shadow-2xl hover:cursor-pointer group" onClick={() => {navigate(`/actuality/${n.id}`)}} >
                    <div className="h-256 overflow-hidden">
                      {n.image ? (

                      <div className="h-256 w-full bg-cover bg-center group-hover:scale-110 duration-700 ease-in-out" style={{ backgroundImage: `url(http://localhost:4000/${n.image})`}}></div>

                      ) : (

                        <Box
                          className="h-256  w-full bg-cover bg-center relative overflow-hidden"
                          sx={{ backgroundColor: 'primary.dark' }}
                        >
                          <svg
                            className="absolute inset-0 pointer-events-none"
                            viewBox="0 0 960 540"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMax slice"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <Box
                              component="g"
                              sx={{ color: 'primary.light' }}
                              className="opacity-20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="100"
                            >
                              <circle r="234" cx="196" cy="23" />
                              <circle r="234" cx="790" cy="491" />
                            </Box>
                          </svg>
                          <div className="w-full h-full flex justify-center group-hover:scale-125 duration-700 ease-in-out">
                            <img src="http://localhost:4000/uploads/nom-1700809994203-518251709.png" alt="logo" />
                          </div>
                          <Box
                            component="svg"
                            className="absolute -top-64 -right-64 opacity-20"
                            sx={{ color: 'primary.light' }}
                            viewBox="0 0 220 192"
                            width="140px"
                            height="109px"
                            fill="none"
                          >
                            <defs>
                              <pattern
                                id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                                patternUnits="userSpaceOnUse"
                              >
                                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
                              </pattern>
                            </defs>
                            <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
                          </Box>
                        </Box>
                      )}
                    </div>
                    <div className="p-24 pb-0 relative z-50 text-center">
                      <div className="px-14 py-14 text-center rounded-3xl mt-n4 bg-white mt-[-50px]">
                        <span className="text-base" color="text.secondary">
                          {moment(n.date_publication).format('DD MMM YYYY')}
                        </span>
                      </div> 
                      <Typography className="text-xl font-semibold mb-8 min-h-56">
                        {n.titre.length > maxCharsTitle ? `${n.titre.substring(0, maxCharsTitle)}...` : n.titre}
                      </Typography>
                      <div className="mb-24 min-h-64">
                        <Typography className="text-base" color="text.secondary">
                          {n.extrait.length > maxChars ? `${n.extrait.substring(0, maxChars)}...` : n.extrait}
                        </Typography>
                      </div>
                      <div className="mb-24 min-h-10">
                        <Typography className="text-base" color="text.secondary">
                            {n.Compte?.Collab?.nom} {n.Compte?.Collab?.prenom} 
                        </Typography>
                      </div>
                    </div>
                    <div className="flex flex-row py-20 w-full justify-evenly border-t-[0.5px]">
                      <span className="flex flex-row items-center"><FavoriteIcon sx={{ color: pink[300]  }} /><Typography className="text-xs ml-2">22</Typography></span>
                      <span className="flex flex-row items-center"><CommentIcon  sx={{ color: yellow[400]  }}  /><Typography className="text-xs ml-2">4</Typography></span>
                    </div>
                  </Card>
                </div>
              );
            })}

          </div>

        </div>
      }
      scroll={isMobile ? 'normal' : 'page'}
    />
  );
}

export default ActualitiesByCategorie;  
