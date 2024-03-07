import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useEffect, useState} from 'react';
import useThemeMediaQuery from '../../../../../@fuse/hooks/useThemeMediaQuery';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { pink,yellow,blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { InputLabel } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import moment from 'moment';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Input from '@mui/material/Input';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import { FacebookSelector, FacebookCounter } from '@charkour/react-reactions';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Link from '@mui/material/Link';
import Popover from '@mui/material/Popover';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';


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
  const [commentaire, setCommentaire] = useState([]);
  const [relatedActuality, setRelatedActuality] = useState([]);
  const [prevandnext, setPrevAndNext] = useState([]);
  const [comment, setComment] = useState('');
  const [loadingBouton, setLoadingBouton] = useState(false);
  const [dateActuelle, setDateActuelle] = useState('');
  const [facebookHidden, setFacebookHidden] = useState(true);
  const [likeButtonHidden, setLikeButtonHidden] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [reactionAndUser, setReactionAndUser] = useState([]);


  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const maxChars = 100;
  const maxCharsTitle = 40; 
  const dispatch = useDispatch();
  const reactions = ['like', 'love', 'haha'];
  const user = useSelector(selectUser);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


const formaterDate = (dateString) => {

  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
  return new Intl.DateTimeFormat('fr-FR', options).format(date);

}

const showFacebookReaction = () => {
  setLikeButtonHidden(true);
  setFacebookHidden(false);
}

const HiddeFacebookReaction = () => {
  setLikeButtonHidden(false);
  setFacebookHidden(true);
}


const handleClickPopOver = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClosePopOver = () => {
  setAnchorEl(null);
};

const saveReaction = (reactionType) => {
  const serveurApi = 'http://localhost:4000/api/reaction/new';
  const mapping = {
      'like': { type: 'jaime', message: "reaction j'aime ajoutée" },
      'love': { type: 'jadore', message: "reaction j'adore ajoutée" },
      'haha': { type: 'drole', message: "reaction drôle ajoutée" }
  };

  const reactionData = mapping[reactionType];

  axios.post(serveurApi, {
      type: reactionData.type,
      act_id: actualityId,
      compte_id: user.data.CompteId
  })
      .then(res => {
          if (res.data) {
              console.log(res.data);
              if (res.data.message.includes('existait déjà et a été supprimée')) {
                  // La réaction existait déjà et a été supprimée
                  dispatch(showMessage({ message: "La réaction existait déjà et a été supprimée." }));
                  fetchReaction();
              } else {
                  // La réaction a été ajoutée avec succès
                  dispatch(showMessage({ message: reactionData.message }));
                  fetchReaction();
              }
          }
      })
      .catch(err => {
          console.log(err);
      });

  HiddeFacebookReaction();
};


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

  //Récupération de la liste des commentaires dejas approuver de l'actualité par son id
  const fetchComment = () => {
    axios.get(`http://localhost:4000/api/commentaire/actualite/${actualityId}`)
      .then(
        res => {
          setCommentaire(res.data);
      })
      .catch(err => console.log(err));
  }

  //Récupération de la liste des reactions et son auteur de l'actualité par son id
  const fetchReaction = () => {
    axios.get(`http://localhost:4000/api/reaction/actualite/${actualityId}`)
      .then(res => {
        setReactionAndUser(res.data);
      })
      .catch(err => console.log(err));
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const obtenirDateActuelle = () => {
    const maintenant = new Date();
    const annee = maintenant.getFullYear();
    const mois = (maintenant.getMonth() + 1).toString().padStart(2, '0');
    const jour = maintenant.getDate().toString().padStart(2, '0');
    setDateActuelle(`${annee}-${mois}-${jour}`);
  };


  const handleSubmit = async (e) => { 

    e.preventDefault();

    const contenu =  comment;
    const compt_id =  user.data.CompteId;
    const date_comm = dateActuelle;
    const act_id = actualityId;

    setLoadingBouton(true);
    
    const dataForm = { 

      contenu,
      compt_id,
      date_comm,
      act_id
    
    };


    const serveurApi = 'http://localhost:4000/api/commentaire/new';
    axios.post(serveurApi, dataForm)
      .then(res => {
        if (res.data) {
            console.log(res.data);
            setLoadingBouton(false);
            setComment('');
            dispatch(showMessage({ message: "Commentaire sauvegardée, attente d'approbation" }));
        }
      })
      .catch (err => {
        console.log(err);
      }); 

  
  }

  useEffect(() => {
    fetchActualities();
    fetchActuality();
    fetchPrevAndNextActuality();
    fetchComment();
    fetchReaction();
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
                <Typography sx={{ color: 'text.secondary' }}>< span className="hover:cursor-pointer hover:underline hover:text-blue-900" onClick={() => navigate("/apps/timeline")}>Actualitées</span> > {Actuality?.actuality?.titre}</Typography>
              </div>
            </div>
          </div>
        </div>
      }
      content={
        <div className="flex flex-auto flex-col justify-center items-center w-full max-w-7xl mx-auto p-24 sm:p-32">
          <div>
            <Typography className='text-center my-16' sx={{ color: 'text.secondary' }}>par :  {Actuality?.actuality?.Compte?.Collab?.nom} {Actuality?.actuality?.Compte?.Collab?.prenom} </Typography>
            <Typography className='text-4xl font-bold text-center mb-24'>{Actuality?.actuality?.titre} </Typography>
          </div>
          <div  className="mb-40">
            <div className="flex flex-row items-start">
              <div className="flex flex-row items-center justify-center mr-20">
                <FuseSvgIcon className="text-48 mr-5 text-[#6B7280]" size={16} sx={{ color: 'text.secondary' }}>heroicons-outline:calendar</FuseSvgIcon>
                <Typography className='text-center' sx={{ color: 'text.secondary' }}>{moment(Actuality?.actuality?.date_publication).format('DD MMM YYYY')}</Typography>
              </div>
              
              {Actuality?.actuality?.categorie && Actuality?.actuality?.categorie.length != 0 && ( 
                <div className="flex flex-row">
                  {Actuality.actuality.categorie.map((categorie, index) => (
                    <div key={index} className="flex flex-row items-center hover:cursor-pointer group mr-20" onClick={() => {navigate(`/apps/timeline/categorie/${categorie.id}`);}}>
                      <FuseSvgIcon className="text-48 mr-5 group-hover:text-blue-900 text-[#6B7280]" size={16} sx={{ color: 'text.secondary' }}>heroicons-outline:folder</FuseSvgIcon>
                      <Typography className='text-center group-hover:text-blue-900' sx={{ color: 'text.secondary' }}>{categorie.nom}</Typography>
                    </div>
                    ))}
                </div>
              )}

              {Actuality?.actuality?.Type && Actuality?.actuality?.Type.length != 0 && (
                <div className="flex flex-row items-center justify-center">
                  {Actuality.actuality.Type.map((type, index) => (
                    <div key={index} className="flex flex-row items-center hover:cursor-pointer group  mr-20" onClick={() => {navigate(`/apps/timeline/type/${type.id}`);}}>
                      <FuseSvgIcon className="text-48 mr-5 group-hover:text-blue-900 text-[#6B7280]" size={16} sx={{ color: 'text.secondary' }}>heroicons-outline:minus</FuseSvgIcon>
                      <Typography className='text-center group-hover:text-blue-900' sx={{ color: 'text.secondary' }}>{type.nom}</Typography>
                    </div>
                  ))}
                </div>
              )}
              
            </div>
          </div>
          {Actuality?.actuality?.Type && Actuality?.actuality?.Type.length != 0 && (
            <div className='mb-40'>
                <div className="flex flex-row items-center justify-center">
                  {Actuality.actuality.Tag.map((tag, index) => (
                    <div key={index} className="hover:cursor-pointer mr-20" onClick={() => {navigate(`/apps/timeline/tag/${tag.id}`);}}>
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

          {Actuality?.actuality?.contenu && Actuality.actuality.contenu != " " &&(
            <div className="w-3xl flex mb-32">
              <Card className="w-full p-32" >
                <div dangerouslySetInnerHTML={{ __html: Actuality?.actuality?.contenu }} />
              </Card>
            </div>
          )}

          <div className="w-3xl flex mb-32">
            <Card className="w-full px-32 py-20">
              <div className="pb-10 border-b border-slate-900">
                <div>
                  <FacebookCounter counters={reactionAndUser} user={user?.data?.displayName} onClick={handleClickPopOver} />
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClosePopOver}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <div className='p-20 max-h-[220px] overflow-scroll'>
                      {reactionAndUser.map((n, index) => {
                        return (
                            <Typography key={index} className='text-sm'>
                            
                              {(n.emoji == "like") && (<span className='mr-10 mb-10'><ThumbUpIcon  sx={{ color: blue[300], fontSize: 'small'  }}  /></span>)}
                              {(n.emoji == "love") && (<span className='mr-10 mb-10'><FavoriteIcon  sx={{ color: pink[300], fontSize: 'small'  }} /></span>)}
                              {(n.emoji == "haha") && (<span className='mr-10 mb-10'><EmojiEmotionsIcon  sx={{ color: yellow[300], fontSize: 'small'  }} /></span>)}

                              {n.by}

                            </Typography>
                        );
                      })}
                    </div>
                    

                  </Popover>
                </div>
              </div>
              <div className="flex flex-row pt-10 items-center">
                <div hidden={facebookHidden} className="mr-20" onMouseLeave={() => {HiddeFacebookReaction()}}>
                  <FacebookSelector iconSize={20} reactions={reactions} onSelect={(e) => {saveReaction(e);}}/> 
                </div>
                <div  hidden={likeButtonHidden}   onMouseOver={() => {showFacebookReaction()}}>
                 <div className="flex flex-row items-center hover:cursor-pointer group  mr-20" >
                    <ThumbUpIcon style={{ fontSize: '1.6rem' }} sx={{ color: 'text.secondary' }} className="text-48 mr-5 text-[#6B7280]"/>
                    <Typography className='text-center group-hover:text-blue-900' sx={{ color: 'text.secondary' }}>j'aime</Typography>
                  </div>
                </div>  
                <div>
                  <div className="flex flex-row items-center hover:cursor-pointer group  mr-20">
                    <CommentIcon style={{ fontSize: '1.6rem' }} sx={{ color: 'text.secondary' }} className="text-48 mr-5 group-hover:text-blue-900 text-[#6B7280]"/>
                    <Typography className='text-center group-hover:text-blue-900' sx={{ color: 'text.secondary' }}>{Actuality?.actuality?.nombre_commentaires} commentaire</Typography>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          
          
          <div className="w-3xl flex my-32">
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
          {commentaire && commentaire != '' &&  (
            <div>
              <div className='w-3xl flex justify-center border-b-2 border-slate-900 my-32'>
                <Typography className='after:content-[" "] after:w-full after:absolute after:right-0 after:left-0 after:bottom-0 after:h-3 after:bg-[#818cf8] text-2xl font-bold text-center pb-10 inline-block relative' sx={{ color: 'text.secondary' }}>{Actuality?.actuality?.nombre_commentaires} Commentaires</Typography>
              </div>        
              <div className="p-6 w-3xl mb-32">
                {commentaire.map((comment, index) => (
                  <Card key={index} variant="outlined" className="mb-4">
                    <CardContent className="flex items-start p-24">
                      <Avatar alt={comment?.Compte?.Collab?.nom} src={`http://localhost:4000/${comment?.Compte?.Collab?.image}`} className="mr-6 mt-1" sx={{ width: 56, height: 56 }}/>
                      <div>
                        <Typography variant="subtitle1" gutterBottom>
                          {comment?.Compte?.Collab?.nom} {comment?.Compte?.Collab?.prenom}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {formaterDate(comment.createdAt)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} className="mt-16">
                          {comment.contenu}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {Actuality?.actuality?.commentaire &&  (
            <div className='w-2xl p-40 border-2 border-slate-900 rounded-2xl my-32'>
              <div className='flex justify-center border-b-2 border-slate-900 mb-32'>
                  <Typography 
                    className='after:content-[" "] after:w-full after:absolute after:right-0 after:left-0 after:bottom-0 after:h-3 after:bg-[#818cf8] text-2xl font-bold text-center pb-10 inline-block relative' 
                    sx={{ color: 'text.secondary' }}
                  >
                      Exprimez-vous :
                  </Typography>
              </div>
              <form onSubmit={handleSubmit}>
                <Typography 
                  className='text-center mb-32' 
                  sx={{ color: 'text.secondary' }}
                >
                  Les champs requis sont indiqués *
                </Typography>
                <InputLabel required  shrink htmlFor="bootstrap-input">
                  commentaire
                </InputLabel>
                <Card
                  component={motion.div}
                  variants={item}
                  className="w-full overflow-hidden mb-32"
                >
                  <Input
                    value={comment}
                    onChange={(e) => {setComment(e.target.value)}}
                    className="p-24 w-full"
                    classes={{ root: 'text-14' }}
                    multiline
                    rows="6"
                    margin="none"
                    disableUnderline
                  />
                </Card>
                <div className="flex justify-center my-32">
                  <LoadingButton 
                    type="submit"
                    variant="contained" 
                    color="secondary" 
                    onClick={obtenirDateActuelle} 
                    endIcon={<SendIcon />}
                    disabled={!comment || !comment.trim()}
                    loading={loadingBouton}
                    loadingPosition="end"
                    aria-label="post"
                  >
                    Poster un commentaire
                  </LoadingButton>
                </div>
              </form>
            </div>
          )}
          {relatedActuality && relatedActuality != '' &&  (<>
          <div className='w-3xl flex justify-center border-b-2 border-slate-900 my-32'>
            <Typography className='after:content-[" "] after:w-full after:absolute after:right-0 after:left-0 after:bottom-0 after:h-3 after:bg-[#818cf8] text-2xl font-bold text-center pb-10 inline-block relative' sx={{ color: 'text.secondary' }}>Articles Similaires</Typography>
          </div>
          <div className="w-3xl p-16 flex flex-row flex-wrap">
            { 
              relatedActuality.map((n) => {
              return (
                <div key={n.id} className="flex w-2/4 px-16 mb-32">   
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
                        <span className="text-base">
                          {moment(n.date_publication).format('DD MMM YYYY')}
                        </span>
                      </div> 
                      <Typography className="text-xl font-semibold mb-8 min-h-56">
                        {n.titre.length > maxCharsTitle ? `${n.titre.substring(0, maxCharsTitle)}...` : n.titre}
                      </Typography>
                      <div className="mb-24 min-h-64">
                        <Typography className="text-base" sx={{ color: 'text.secondary' }}>
                          {n.extrait.length > maxChars ? `${n.extrait.substring(0, maxChars)}...` : n.extrait}
                        </Typography>
                      </div>
                      <div className="mb-24 min-h-10">
                        <Typography className="text-base" sx={{ color: 'text.secondary' }}>
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
          </>)}

        </div>
      }
      scroll={isMobile ? 'normal' : 'page'}
    />
  );
}

export default ActualitiesByCategorie;  
