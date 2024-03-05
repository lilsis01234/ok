import { useRef, useEffect, useState} from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import CountdownComponent from './EventCountDown/Count';
import { Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import Sary from "../../sary.png";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from 'react-router-dom';
import { pink,yellow } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const Dashboard = () => {
        
  const [listeActuCategDash, setlisteActuCategDash] = useState([]);
  const [formations, setFormations] = useState([]);
  const user = localStorage.getItem('user');
  const userConnected = JSON.parse(user);
  // const id = userConnected.id;

  const fetchActualitiesByCateg = () => {
    axios.get('http://localhost:4000/api/categorie/25/actualites')
      .then(res => {setlisteActuCategDash(res.data)})
      .catch(err => console.log(err));
  }
  
  const fetchFormation = () => {
    axios.get('http://localhost:4000/api/formations/all_formations')
      .then(res => {
        // console.log(res.data)
        setFormations(res.data)
      })
      .catch(err => console.log(err));
  }
  
  const navigate = useNavigate();
  useEffect(() => {
    fetchActualitiesByCateg();
    fetchFormation();
  }, [])


  const formatDate = (isoDateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(isoDateString);
  return date.toLocaleDateString('fr-FR', options);
};

  const sary = ['DSC_0162.JPG','Olivier014.jpg','Olivier028.jpg','Olivier047.jpg','Olivier059.jpg','DSC_0076.JPG','DSC_0097.JPG','DSC_0568.JPG','DSC_0569.JPG','DSC_0570.JPG'];

  function SlideCard(){
    const settings = {
     infinite: true,
     speed: 300,
     slidesToShow: 1,
     slidesToScroll: 1,
     autoplay:true,
     arrows: false
    };

    return(
      <>
      {/* affichage du slider */}
        <Slider {...settings}>
        {sary.map((photo, index) =>(
          <div key={index} className="flex-auto mb-32">
            <img src={`http://localhost:4000/photo/${photo}`} className="rounded-xl" alt="Sahaza Group" />
          </div>
        ))
        }
        </Slider>  
      </>
    )
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const CoutdownStyle = {
    backgroundColor: '#0d4bc1',
    backgroundImage: `url(http://localhost:4000/photo/block_bg.png)` ,
  };

  return (
    <FusePageSimple
      content={
        <>
          <div className="flex justify-center w-full md:p-24 xs:p-4">
            <div className="w-full">
              <div className="items-start md:flex md:flex-col ps:flex-row">

                {/* Column 1 */}
                <div className="flex flex-col md:w-full ps:w-1/2 px-16 mb-32">

                  <SlideCard/>

                  <div className="flex-auto w-full rounded-sm bg-grey-100 text-center mb-32">
                    <Paper className='w-full text-white p-32 bg-center bg-cover' style={CoutdownStyle}>
                        <CountdownComponent/>
                    </Paper>
                  </div>

                  <div className="flex-auto w-full rounded-sm bg-grey-100 text-center mb-32">
                    <Paper className='w-full p-24'>
                      {/* <Typography className="text-xl sm:text-3xl font-bold tracking-tight leading-none text-red-700 mb-14">
                        Anniversaires du mois
                      </Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque lacus id enim lobortis imperdiet. Sed mauris massa, tincidunt efficitur lorem vitae, tristique lacinia velit. Donec dignissim suscipit ex, vehicula finibus magna congue nec. Donec tempus vitae felis vel dapibus. Ut hendrerit vitae magna nec malesuada. */}
                      <img src='http://localhost:4000/uploads/nom-1709534327076-821779664.jpg' alt='anniversaire' />
                    </Paper>
                  </div>

                  <div className="flex-auto text-center w-full mb-32">
                    <Paper className='w-full p-24'>
                      <Typography className="font-bold">
                        Les 3 directions
                      </Typography>
                    </Paper>
                  </div>

                  <div className="flex-auto w-full">
                    <Paper className='w-full p-32'>
                      <Typography className="text-xl sm:text-3xl font-bold tracking-tight leading-none text-red-400 mb-32 text-center">
                          Nos formations
                      </Typography>

                      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {formations.map((formation) => (
                        <>
                          <ListItem key={formation.id} alignItems="flex-center" className='mb-14'>
                            <ListItemAvatar>
                              <Avatar sx={{ width: 56, height: 56 }} alt={formation.Formateur.prenom} src={`http://localhost:4000/${formation.Formateur.image}`} />
                            </ListItemAvatar>
                            <ListItemText
                              className='ml-14'
                              primary={`${formation.Formateur.nom} ${formation.Formateur.prenom}`}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {formation.theme}
                                  </Typography>
                                  {`- ${formation.description}`}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </>
                        ))}
                        
                      </List>
                    </Paper>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="flex xs:flex-col md:w-full ps:w-1/2 sm:flex-row ps:flex-col xl:flex-row">
                  {/* Column 2 1 */}
                  <div className="flex flex-col xs:w-full sm:w-1/2 ps:w-full ps:w-full xl:w-1/2 px-16">
                    <Paper className="flex flex-col flex-auto shadow rounded-2xl mb-32 overflow-hidden aspect-w-1 justify-center items-center">
                    <img src={Sary} alt="logo_sahaza" className='h-72 w-68' />
                      <div className="text-center">
                        <Typography className="text-xl sm:text-3xl font-bold tracking-tight leading-none text-red-400">
                          Mot du jour
                        </Typography>
                      </div>

                      <Typography
                        className="flex items-baseline justify-center w-full mt-20 mb-24"
                        color="text.secondary"
                      >
                        <b className="px-8">Exemple de mot du jour</b>
                      </Typography>

                    </Paper>

                    <Card  className="p-36 mb-32 ">
                      <div className="flex pb-16 flex-col">
                        <Typography className="text-3xl font-semibold pb-14 mb-32 border-b">
                            Actualités
                        </Typography>
                        <div>
                          {listeActuCategDash.map((categorie) => (
                            <div key={categorie.id}>
                                {categorie.Actualites.map((actualite) => (
                                <div key={actualite.id} className="mb-32">
                                  <div>
                                    <img src={`http://localhost:4000/${actualite.image}` } className="rounded-xl" alt="actuality image"/>
                                  </div>
                                  <div className="mt-14">
                                    <div  className="flex flex-row items-end">
                                      <Typography className="text-lg font-semibold mr-14">
                                          BLOG
                                      </Typography>
                                      <span className="text-sm" >{formatDate(actualite.date_publication)}</span>
                                    </div>
                                    <div className="mt-2">
                                      <h3 className="font-bold ps:text-xl lg:text-2xl hover:cursor-pointer hover:underline hover:text-blue-900" onClick={() => {navigate(`/actuality/${actualite.id}`)}}>{actualite.titre}</h3>
                                    </div>
                                    <div  className="flex flex-row mt-14">
                                      <span className="flex flex-row mr-10"><FavoriteIcon fontSize="small" sx={{ color: pink[300]  }} /><Typography className="text-xs ml-2">{actualite.nombre_reactions}</Typography></span>
                                      <span className="flex flex-row"><CommentIcon fontSize="small"  sx={{ color: yellow[400]  }}  /><Typography className="text-xs ml-2">{actualite.nombre_commentaires}</Typography></span>
                                    </div>
                                  </div>
                                </div>
                                ))}
                            </div>
                          ))}
                        </div>
                      </div>

                    </Card>

                  </div>
                  {/* Column 2 2 */}
                  <div className="flex flex-col xs:w-full sm:w-1/2 ps:w-full xl:w-1/2 px-16">
                    <Card component={motion.div} variants={item} className="flex flex-col w-full mb-32">
                      <div className="h-224 mb-16 bg-cover bg-no-repeat w-full" style={{ backgroundImage: `url(http://localhost:4000/uploads/nom-1700223383862-775994187.jpg)` }}>

                      </div>
                      <CardContent sx={{ p: 0, "& .MuiDateCalendar-root": { width: "100%" } }}>  
                        <LocalizationProvider dateAdapter={AdapterDayjs} locale="fr">
                          <DateCalendar />
                        </LocalizationProvider>
                      </CardContent>
                    </Card>


                    <div className="flex-auto text-center w-full mb-32">
                      <Paper className='w-full h-full flex justify-center p-24'>
                        <Typography className="font-bold">
                          Graphe 3 sites
                        </Typography>
                      </Paper>
                    </div>

                    <div className="flex-auto text-center w-full mb-32">
                      <Paper className='w-full h-full flex justify-center p-24'>
                        <Typography className="font-bold">
                          Citation sur SAHAZA GROUP
                        </Typography>
                      </Paper>
                    </div>

                    <div className="flex-auto text-center w-full mb-32">
                      <Paper className='w-full h-full flex justify-center p-24'>
                        <Typography className="font-bold">
                          Resultats des compétitions
                        </Typography>
                      </Paper>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export default Dashboard;
