import Card from '@mui/material/Card';
import { useEffect, useState} from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import moment from 'moment';
import 'moment/locale/fr';
import Link from '@mui/material/Link';

function TimelineTab() {

const [listeActuality, setListActuality] = useState([]);

const maxChars = 100;
const maxCharsTitle = 40;

//Récupération de la liste des actualités
const fetchActualities = () => {
  axios.get('http://localhost:4000/api/actualite/all')
    .then(res => {setListActuality(res.data)})
    .catch(err => console.log(err));
}

useEffect(() => {
  fetchActualities();
}, [])

  return (

      <>
        <div className="flex flex-col flex-1">
          <div className="py-32 px-56 flex flex-row flex-wrap">
            { listeActuality.map((n) => {
              return (
                <div className="flex w-2/4 px-16 mb-32">   
                  <Card className="w-full">
                    <div>
                      {n.image ? (

                      <div className="h-256 w-full bg-cover bg-center" style={{ backgroundImage: `url(http://localhost:4000/${n.image})` }}></div>

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
                          <div className="w-full h-full flex justify-center">
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
                      <div className="py-20 text-center w-full">
                        <Link color="inherit" href="#" >
                          lire la suite
                        </Link>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col w-full md:w-320 md:ltr:mr-32 md:rtl:ml-32">
          <div className="py-32 flex flex-col">
            <Card className="flex flex-col w-full px-32 pt-24 mb-32">
              <div className="flex justify-between items-center pb-16">
                <Typography className="text-2xl font-semibold leading-tight">
                  actualités recents
                </Typography>
              </div>
            </Card>
            <Card className="flex flex-col w-full px-32 pt-24 mb-32">
              <div className="flex justify-between items-center pb-16">
                <Typography className="text-2xl font-semibold leading-tight">
                   Commentaires récents
                </Typography>
              </div>
            </Card>
            <Card className="flex flex-col w-full px-32 pt-24 mb-32">
              <div className="flex justify-between items-center pb-16">
                <Typography className="text-2xl font-semibold leading-tight">
                    Categories
                </Typography>
              </div>
            </Card>
            <Card className="flex flex-col w-full px-32 pt-24 mb-32">
              <div className="flex justify-between items-center pb-16">
                <Typography className="text-2xl font-semibold leading-tight">
                    Etiquettes
                </Typography>
              </div>
            </Card>
          </div>
        </div>
      </>

  );
}

export default TimelineTab;
