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
import { pink,yellow } from '@mui/material/colors';

const Dashboard = () => {

  const [listeActuCategDash, setlisteActuCategDash] = useState([]);

  const fetchActualitiesByCateg = () => {
    axios.get('http://localhost:4000/api/categorie/25/actualites')
      .then(res => {setlisteActuCategDash(res.data)})
      .catch(err => console.log(err));
  }
  
  useEffect(() => {
    fetchActualitiesByCateg();
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
    };

    return(
      <>
      {/* affichage du slider */}
        <Slider {...settings}>
        {sary.map(photo =>(
          <>
          <div className="flex-auto mb-32">
            <img src={`http://localhost:4000/photo/${photo}`} className="rounded-xl" alt="Sahaza Group" />
          </div>
          </>
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
          <div className="flex justify-center w-full p-24 sm:p-32">
            <div className="w-full">
              <div className="md:flex">

                {/* Column 1 */}
                <div className="flex flex-col w-full md:w-1/2 px-16">

                  <SlideCard/>

                  <div className="flex-auto w-full rounded-sm bg-grey-100 text-center mb-32">
                    <Paper className='w-full text-white p-32 bg-center bg-cover' style={CoutdownStyle}>
                        <CountdownComponent/>
                    </Paper>
                  </div>

                  <div className="flex-auto w-full h-98 rounded-sm bg-grey-100 text-center mb-32">
                    <Paper className='w-full h-98 aspect-w-1'>
                      <Typography className="text-xl sm:text-3xl font-bold tracking-tight leading-none text-red-700">
                        Anniversaires du mois
                      </Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque lacus id enim lobortis imperdiet. Sed mauris massa, tincidunt efficitur lorem vitae, tristique lacinia velit. Donec dignissim suscipit ex, vehicula finibus magna congue nec. Donec tempus vitae felis vel dapibus. Ut hendrerit vitae magna nec malesuada.
                    </Paper>
                  </div>

                  <div className="flex-auto mb-32">
                  </div>

                  <div className="flex-auto w-200">Les 3 directions</div>
                  <div className="flex-auto w-200">Liste des formations</div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col w-full md:w-1/4 px-16">
                  <Paper className="flex flex-col flex-auto shadow rounded-2xl mb-32 overflow-hidden aspect-w-1 justify-center align-center">
                  <center><img src={Sary} alt="logo_sahaza" className='h-72 w-68' /></center>
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
                              <div className="mb-32">
                                <div>
                                  <img src={`http://localhost:4000/${actualite.image}` } className="rounded-xl" alt="actuality image"/>
                                </div>
                                <div className="mt-14">
                                  <div  className="flex flex-row items-end">
                                    <Typography className="text-lg font-semibold mr-14">
                                        DIGITAL
                                    </Typography>
                                    <span className="text-sm" >{formatDate(actualite.date_publication)}</span>
                                  </div>
                                  <div className="mt-2">
                                    <h3 className="font-bold text-2xl">{actualite.titre}</h3>
                                  </div>
                                  <div  className="flex flex-row mt-14">
                                    <span className="flex flex-row mr-10"><FavoriteIcon fontSize="small" sx={{ color: pink[300]  }} /><Typography className="text-xs ml-2">22</Typography></span>
                                    <span className="flex flex-row"><CommentIcon fontSize="small"  sx={{ color: yellow[400]  }}  /><Typography className="text-xs ml-2">4</Typography></span>
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

                {/* Column 3 */}
                <div className="flex flex-col w-full md:w-1/4 px-16">
                  <Card component={motion.div} variants={item} className="flex flex-col w-full mb-32">
                    <div className="h-224 mb-16 bg-cover bg-no-repeat w-full" style={{ backgroundImage: `url(http://localhost:4000/uploads/nom-1700223383862-775994187.jpg)` }}>

                    </div>
                    <CardContent className="!p-0">  
                      <LocalizationProvider dateAdapter={AdapterDayjs} locale="fr" >
                        <DateCalendar />
                      </LocalizationProvider>
                    </CardContent>
                  </Card>


                  <div className="flex-auto">Graphe 3 sites</div>

                  <div className="flex-auto">Citation sur SAHAZA GROUP</div>
                  <div className="flex-auto">Resultats des compétitions</div>
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
