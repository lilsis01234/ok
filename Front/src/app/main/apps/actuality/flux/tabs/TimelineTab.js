import Card from '@mui/material/Card';
import { useEffect, useState} from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import moment from 'moment';
import 'moment/locale/fr';
import {TablePagination} from '@mui/material';
import Link from '@mui/material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { pink,yellow } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

function TimelineTab() {

const [listeActuality, setListActuality] = useState([]);
const [listeFiveActuality, setListFiveActuality] = useState([]);
const [listeCategories, setListCategories] = useState([]);
const [listeTags, setListTags] = useState([]);
const [listeTypes, setListTypes] = useState([]);
const [page, setPage] = useState(0);
const [rowPerPage, setRowsPerPage] = useState(10);

const gradientBackground = {
  background: 'rgb(228,225,225)',
  background: 'linear-gradient(170deg, rgba(228,225,225,1) 0%, rgba(255,255,255,1) 38%, rgba(255,255,255,1) 76%, rgba(227,223,223,1) 100%)'
  };

const maxChars = 100;
const maxCharsTitle = 40;

//Récupération de la liste des actualités
const fetchActualities = () => {
  axios.get('http://localhost:4000/api/actualite/all')
    .then(res => {setListActuality(res.data)})
    .catch(err => console.log(err));
}

//Récupération de la liste des 5 dernier actualités
const fetchFiveActualities = () => {
  axios.get('http://localhost:4000/api/actualite/new-actualities')
    .then(res => {setListFiveActuality(res.data)})
    .catch(err => console.log(err));
}

//Récupération de la liste des Categories
const fetchAllCategorie = () => {
  axios.get('http://localhost:4000/api/categorie/all')
    .then(res => {setListCategories(res.data)})
    .catch(err => console.log(err));
}

//Récupération de la liste des etiquettes
const fetchAllTag = () => {
  axios.get('http://localhost:4000/api/tag/all')
    .then(res => {setListTags(res.data)})
    .catch(err => console.log(err));
}

//Récupération de la liste des etiquettes
const fetchAllTypes = () => {
  axios.get('http://localhost:4000/api/type/all')
    .then(res => {setListTypes(res.data)})
    .catch(err => console.log(err));
}

useEffect(() => {
  fetchAllCategorie();
  fetchFiveActualities();
  fetchActualities();
  fetchAllTag();
  fetchAllTypes();
}, [])


function handleChangePage(event, value) {
  setPage(value);
}

function handleChangeRowsPerPage(event) {
  setRowsPerPage(event.target.value);
}


  return (

      <>
        <div className="flex flex-col flex-1">
          <div className="py-32 px-32 flex flex-row flex-wrap">
            { listeActuality
              .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
              .map((n) => {
              return (
                <div className="flex w-2/4 px-16 mb-32">   
                  <Card className="w-full shadow-md hover:shadow-2xl hover:cursor-pointer group">
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
          <TablePagination
                className="shrink-0 border-t-1"
                component="div"
                count={listeActuality.length}
                rowsPerPage={rowPerPage}
                page={page}
                backIconButtonProps={{
                    "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                    "aria-label": "Next Page",
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
        <div className="flex flex-col w-full md:w-320">
          <div className="py-32 flex flex-col">
            <Card 
              className="w-full p-32 mb-32"
            >
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
                className="caret-blue-950"
                >
                  <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Rechercher une actualité"
                  inputProps={{ 'aria-label': 'recherche d\'actualité' }}

                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Card>
            <Card className="flex w-full p-32 mb-32">
              <div className="flex flex-col">
                <Typography variant="h5" gutterBottom 
                  className="relative text-xl font-semibold leading-tight pb-10 mb-20 after:content-[' '] after:h-[2px] after:w-[40px] after:absolute after:bottom-0 after:bg-[#0F172A] after:left-0 ">
                    actualités recents
                </Typography>
                <div>
                  <ul>
                  { listeFiveActuality.map((n) => {
                    return (
                      <li className="mb-10 text-sm flex flex-row items-center">
                        <FuseSvgIcon className="text-48 mr-10" size={16} color="secondary">heroicons-outline:document-duplicate</FuseSvgIcon>
                        <Typography variant="caption" className="m-0 hover:underline hover:text-blue-900 hover:cursor-pointer" gutterBottom onClick={() => {alert('ok');}}>
                          {n.titre}
                        </Typography>
                      </li>
                    );
                  })}
                  </ul>
                </div>
              </div>
            </Card>
            <Card className="flex w-full p-32 mb-32">
              <div className="flex flex-col">
                <Typography variant="h5" gutterBottom 
                  className="relative text-xl font-semibold leading-tight pb-10 mb-20 after:content-[' '] after:h-[2px] after:w-[40px] after:absolute after:bottom-0 after:bg-[#0F172A] after:left-0 ">
                    Categories
                </Typography>
                <div>
                  <ul>
                  { listeCategories.map((n) => {
                    return (
                      <li className="mb-10 text-sm flex flex-row items-center">
                        <FuseSvgIcon className="text-48 mr-10" size={16} color="secondary">heroicons-outline:chevron-right</FuseSvgIcon>
                        <Typography variant="caption" className="m-0 hover:underline hover:text-blue-900 hover:cursor-pointer" gutterBottom onClick={() => {alert('ok');}}>
                          {n.nom}
                        </Typography>
                      </li>
                    );
                  })}
                  </ul>
                </div>
              </div>
            </Card>
            <Card className="flex w-full p-32 pr-0 mb-32">
              <div className="flex flex-col">
                <Typography variant="h5" gutterBottom 
                  className="relative text-xl font-semibold leading-tight pb-10 mb-20 after:content-[' '] after:h-[2px] after:w-[40px] after:absolute after:bottom-0 after:bg-[#0F172A] after:left-0 ">
                    Etiquettes
                </Typography>
                <div>
                  <ul className="text-sm flex flex-row flex-wrap">
                  { listeTags.map((n) => {
                    return (
                      <li className="mb-11 mr-2.5 ">
                        <Typography variant="caption" className="p-5 border border-slate-600 m-0 hover:text-blue-600 hover:cursor-pointer" gutterBottom onClick={() => {alert('ok');}}>
                          {n.nom}
                        </Typography>
                      </li>
                    );
                  })}
                  </ul>
                </div>
              </div>
            </Card>
            <Card className="flex w-full p-32 mb-32">
              <div className="flex flex-col">
                <Typography variant="h5" gutterBottom 
                  className="relative text-xl font-semibold leading-tight pb-10 mb-20 after:content-[' '] after:h-[2px] after:w-[40px] after:absolute after:bottom-0 after:bg-[#0F172A] after:left-0 ">
                    Types
                </Typography>
                <div>
                  <ul>
                  { listeTypes.map((n) => {
                    return (
                      <li className="mb-10 text-sm flex flex-row items-center">
                        <FuseSvgIcon className="text-48 mr-10" size={16} color="secondary">material-twotone:arrow_right</FuseSvgIcon>
                        <Typography variant="caption" className="m-0 hover:underline hover:text-blue-900 hover:cursor-pointer" gutterBottom onClick={() => {alert('ok');}}>
                          {n.nom}
                        </Typography>
                      </li>
                    );
                  })}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </>

  );
}

export default TimelineTab;
