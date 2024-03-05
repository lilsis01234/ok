import { useRef, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import ImageIcon from '@mui/icons-material/Image';
import IconButton from '@mui/material/IconButton';
import { Autocomplete } from '@mui/material';
import Link from '@mui/material/Link';
import parse from 'html-react-parser';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';


function AddActualityTab() {


  const {actualityId} = useParams();
  const [ActualityToEdit, setActualityToEdit] = useState('');
  const [extraitToEdit, setExtraitToEdit] = useState('');
  const [titreToEdit, settitreToEdit] = useState('');
  const [wysiwygContent, setWysiwygContent] = useState('');
  const [imgMiseEnAvant, setImgMiseEnAvant] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedVisibilite, setSelectedVisibilite] = useState('');
  const [selectedEtat, setSelectedEtat] = useState('');
  const [idImageToChange, setidImageToChange] = useState(null);
  const [nameImgActu, setNameImgActu] = useState('');
  const [isChecked, setChecked] = useState(false);
  
  const fetchActualityToEdit = () => {
    axios.get(`http://localhost:4000/api/actualite/${actualityId}`)
    .then(res => {
      setActualityToEdit(res.data);
      setExtraitToEdit(res.data.actuality?.extrait);
      settitreToEdit(res.data.actuality?.titre);
      setWysiwygContent(res.data.actuality?.contenu);
      setImgMiseEnAvant(res.data.actuality?.image);
      setSelectedCategory(res.data.actuality?.categorie);
      setSelectedTag(res.data.actuality?.Tag);
      setSelectedTypes(res.data.actuality?.Type);
      setSelectedVisibilite(res.data.actuality?.visibilite);
      setSelectedEtat(res.data.actuality?.etat);
      setNameImgActu(res.data.actuality?.image);
      setChecked(res.data.actuality?.commentaire);
    })
    .catch(err => console.log(err));
  }

  const getIdImgActualityByName = () => {
    if (nameImgActu) {
      axios.get(`http://localhost:4000/api/actualite/getidimg?name=${nameImgActu}`)
        .then(res => {
          // console.log(res.data);
          setidImageToChange(res.data?.actualityImg?.id);
        })
        .catch(err => console.log(err));
    }
  }

  
  useEffect(() => {
    fetchActualityToEdit();
  }, [])



  useEffect(() => {
    getIdImgActualityByName();
  }, [nameImgActu])
  

  const [listeCategorie, setListCategorie] = useState([]);
  const [listeType, setListType] = useState([]);
  const [listeTag, setListTag] = useState([]);
  const [isInputCategVisible, setIsInputCategVisible] = useState(false);
  const [isInputTypeVisible, setIsInputTypeVisible] = useState(false);
  const [isInputTagVisible, setIsInputTagVisible] = useState(false);
  const [newCategName, setnewCategName] = useState('');
  const [newTypeName, setnewTypeName] = useState('');
  const [newTagName, setnewTagName] = useState('');
  const [boutonDesableCateg, setBoutonDesableCateg] = useState(true);
  const [boutonDesableType, setBoutonDesableType] = useState(true);
  const [boutonDesableTag, setBoutonDesableTag] = useState(true);
  const [dateActuelle, setDateActuelle] = useState('');


  const handleTypesChange = (event, newValues) => {
    setSelectedTypes(newValues);
  };
  
  const getSelectedTypeIds = () => {
    return selectedTypes.map((type) => type.id).join(',');
  };

  const handleCategoryChange = (event, newValues) => {
    setSelectedCategory(newValues);
  };

  const getSelectedCategoryIds = () => {
    return selectedCategory.map((categorie) => categorie.id).join(',');
  };

  const handleTagChange = (event, newValues) => {
    setSelectedTag(newValues);
  };

  const getSelectedTagIds = () => {
    return selectedTag.map((categorie) => categorie.id).join(',');
  };


  const fetchCategories = () => {
    axios.get('http://localhost:4000/api/categorie/all')
      .then(res => {setListCategorie(res.data)})
      .catch(err => console.log(err));
  }
  
  const fetchTypes = () => {
    axios.get('http://localhost:4000/api/type/all')
    .then(res => {setListType(res.data)})
    .catch(err => console.log(err));
  }

  const fetchTags = () => {
    axios.get('http://localhost:4000/api/tag/all')
    .then(res => {setListTag(res.data)})
    .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchCategories();
    fetchTypes();
    fetchTags();
  }, [])


  const deleteActuality = () => {

    axios.delete(`http://localhost:4000/api/actualite/${actualityId}`)
  
    .then(res => {

          console.log('reponse : ', res.data);
          navigate('/apps/actuality/list')
          dispatch(showMessage({ message: 'Actualité supprimer' }));

    })
  
    .catch(err => {
      console.log(err);
    });
  
  }


  const handleLinkClickAddCateg = (e) => {
    e.preventDefault();
    setIsInputCategVisible(true);
  };



  const handleAddCategClick = async (e) => { e.preventDefault();

    if (newCategName) {

    const ApiPostCateg = 'http://localhost:4000/api/categorie/new';
    const nom = newCategName;
    const dataForm = { nom };
    axios.post(ApiPostCateg, dataForm)
        .then(res => {
          if (res.data) {
              setListCategorie([...listeCategorie, res.data]);
              setnewCategName('');
              setIsInputCategVisible(false);
          }
        })
        .catch (err => {
          dispatch(showMessage({message : err.response.data.message}));
          setnewCategName('');
          setIsInputCategVisible(false);
        }); 
      } else {
        setBoutonDesableCateg(true);
        setIsInputCategVisible(false);
      }
    
  };

  const handleLinkClickAddType = (e) => {
    e.preventDefault();
    setIsInputTypeVisible(true);
  };

  const handleAddTypeClick = async (e) => { e.preventDefault();

    if (newTypeName) {

    const ApiPostType = 'http://localhost:4000/api/type/new';
    const nom = newTypeName;
    const dataForm = { nom };
    axios.post(ApiPostType, dataForm)
        .then(res => {
          if (res.data) {
              setListType([...listeType, res.data]);
              setnewTypeName('');
              setIsInputTypeVisible(false);
          }
        })
        .catch (err => {
          dispatch(showMessage({message : err.response.data.message}));
          setnewTypeName('');
          setIsInputTypeVisible(false);
        }); 
      } else {
        setBoutonDesableType(true);
        setIsInputTypeVisible(false);
      }
    
  };

  const handleLinkClickAddTag = (e) => {
    e.preventDefault();
    setIsInputTagVisible(true);
  };

  const handleAddTagClick = async (e) => { e.preventDefault();

    if (newTagName) {

    const ApiPostTag = 'http://localhost:4000/api/tag/new';
    const nom = newTagName;
    const dataForm = { nom };
    axios.post(ApiPostTag, dataForm)
        .then(res => {
          if (res.data) {
              setListTag([...listeTag, res.data]);
              setnewTagName('');
              setIsInputTagVisible(false);
          }
        })
        .catch (err => {
          dispatch(showMessage({message : err.response.data.message}));
          setnewTagName('');
          setIsInputTagVisible(false);
        });  
      } else {
        setBoutonDesableTag(true);
        setIsInputTagVisible(false);
      }
    
  };

  
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('nom', file);    
        const serveurApiImg = 'http://localhost:4000/api/actualite/image';      
        axios.post(serveurApiImg, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(res => {

            if (res.data.nom) {
                  const img = `<div><img src="http://localhost:4000/${res.data.nom}" alt="image téléchargée" /></div>`;
                  setWysiwygContent(wysiwygContent + img);
            }

          })
          .catch(err => console.log(err));
          
      }
    };
    input.click();
  };

  const changeImageHandlerMea = (id) => {

      axios.delete(`http://localhost:4000/api/actualite/image/${id}`)
    
      .then((res) => {
        console.log(res.data);
        imageHandlerMea();

      })
    
      .catch(err => {
        console.log(err);
      });
    

  }

  const deleteImg = (id) => {

      axios.delete(`http://localhost:4000/api/actualite/image/${id}`)
    
      .then((res) => {
        console.log(res.data);
        setImgMiseEnAvant('');
      })
    
      .catch(err => {
        console.log(err);
      });
    
  }

  const actualityFieldImgToEmpty = (id) => {

      axios.put(`http://localhost:4000/api/actualite/image/${id}`)
    
      .then((res) => {
        console.log(res.data);
      })
    
      .catch(err => {
        console.log(err);
      });
    
  }

  const accordionStyle = {
    marginBottom: 0,
  };


  const imageHandlerMea = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('nom', file);    
        const serveurApiImg = 'http://localhost:4000/api/actualite/image';      
        axios.post(serveurApiImg, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(res => {

            if (res.data.nom) {
                  // const imgMea = `http://localhost:4000/${res.data.nom}`;
                  const imgMea = res.data.nom;
                  setImgMiseEnAvant(imgMea);
                  setidImageToChange(res.data.id);
            }

          })
          .catch(err => console.log(err));
          
      }
    };
    input.click();
  };
  
  
      

  const modules = {
    toolbar: {
      container: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', { 'color': [] }],
      ['blockquote'],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean'] 
      ]
  }
};
  

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const obtenirDateActuelle = () => {
    const maintenant = new Date();
    const annee = maintenant.getFullYear();
    const mois = (maintenant.getMonth() + 1).toString().padStart(2, '0');
    const jour = maintenant.getDate().toString().padStart(2, '0');
    setDateActuelle(`${annee}-${mois}-${jour}`);
  };


  const formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);


  const handleWysiwygChange = (value) => {
    setWysiwygContent(value);
  };
  
  const handleChangeVisibilite  = (event) => {
    setSelectedVisibilite(event.target.value);
  };
  
  const handleChangeEtat  = (event) => {
    setSelectedEtat(event.target.value);
  };

  const handleSubmit = () => {

    const titre = titreToEdit;
    const extrait = extraitToEdit;
    const visibilite = selectedVisibilite;
    const etat = selectedEtat;
    const category = getSelectedCategoryIds().split(',');
    const type = getSelectedTypeIds().split(',');
    const tag = getSelectedTagIds().split(',');
    const contenu =  wysiwygContent;
    const updatedAt = dateActuelle;
    // const date_publication = dateActuelle;
    const image = imgMiseEnAvant;
    const commentaire = isChecked;
    


    const data = {
      titre,
      contenu,
      extrait,
      updatedAt,
      etat,
      visibilite,
      category,
      type,
      tag,
      image,
      commentaire

    };

    const serveurApi = `http://localhost:4000/api/actualite/${actualityId}`;
    axios.put(serveurApi, data)
        .then(res => {

          if (res.data) {
              console.log('reponse : ', res.data);

          }
          dispatch(showMessage({ message: 'Actualité mise à jour' }));
          navigate('/apps/actuality/list');

        })
        .catch(err => console.log(err));

  }
  

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full">
      <form>
        <div className="md:flex flex-row justify-between items-center">
          <Typography className="text-3xl font-semibold tracking-tight leading-8 mb-24 mt-16">
                Modifier un nouvel article
          </Typography>
          <div>
            <Button type="button" className="py-10 px-32" variant="contained" color="error" size="small" aria-label="post" onClick={() => deleteActuality()}>
              Supprimer
            </Button>
            <Button type="button" className="py-10 px-32 ml-12" variant="contained" color="primary" size="small" aria-label="post" onClick={() => navigate('/apps/actuality/list')} >
              Annuler
            </Button>
            <Button type="button" className="py-10 px-32 ml-12" variant="contained" color="success" size="small" aria-label="post" onClick={() => {handleSubmit();obtenirDateActuelle()}}>
              Mettre à jour
            </Button>
          </div>
        </div>
        
        <Card component={motion.div} variants={item} className="flex flex-col w-full px-32 py-24 mb-24">
          <TextField
            name="titre"
            id="titre"
            label="Saisissez votre titre ici"
            value={titreToEdit}
            onChange={(e) => {settitreToEdit(e.target.value)}}
            variant="outlined"
            required
            fullWidth
          />
        </Card>
        
        <div className="md:flex">
          <div className="flex flex-col flex-1 relative">

            <IconButton onClick={imageHandler}  className="p-8 absolute top-0 right-0 rounded-none rounded-tr-2xl hover:text-blue-700" variant="contained" size="small">
              <ImageIcon />
            </IconButton>

            <Card
              component={motion.div}
              variants={item}
              className="w-full overflow-hidden min-h-480 mb-32"
            >
              <ReactQuill className="h-full" theme="snow" value={wysiwygContent} onChange={handleWysiwygChange} modules={modules} />
            </Card>

              <Card
              component={motion.div}
              variants={item}
              className="w-full overflow-hidden mb-32"
            >
              <Input
                name="extrait"
                id="extrait"
                className="p-24 w-full"
                classes={{ root: 'text-14' }}
                placeholder="Rédiger un extrait (facultatif)"
                value={extraitToEdit}
                onChange={(e) => {setExtraitToEdit(e.target.value)}}
                multiline
                rows="6"
                margin="none"
                required
                disableUnderline
              />
            </Card>
          </div>

          <div className="flex flex-col w-full md:w-320 md:rtl:ml-32 ml-32">
          <Card component={motion.div} variants={item} className="flex flex-col w-full px-32 pt-24 mb-32">
              <div className="flex justify-between items-center pb-16">
                <Typography className="text-2xl font-semibold leading-tight">
                  Propriétés
                </Typography>
              </div>

              <CardContent className="p-0 mb-16">    
                <FormControl fullWidth>
                  <FormLabel htmlFor="visibilite" className="font-medium text-14" component="legend">
                     Etiquettes
                  </FormLabel>
                  <Autocomplete
                    multiple
                    options={listeTag}
                    getOptionLabel={(option) => option.nom}
                    value={selectedTag}
                    onChange={handleTagChange}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FormControl>
                <Link color="inherit" href="#" onClick={ handleLinkClickAddTag} >
                  Ajouter une étiquettes
                </Link>
                {isInputTagVisible && ( 
                <div className="relative mt-7 flex">
                  <TextField 
                    variant="outlined" 
                    size="small" 
                    fullWidth 
                    value={newTagName}
                    onChange={(e) => {setnewTagName(e.target.value);setBoutonDesableTag(false);}} 
                  />
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    className="absolute top-0 right-0 h-full rounded-l-none rounded-r"
                    disabled={boutonDesableTag ? true : undefined}
                    onClick={handleAddTagClick}
                  >
                    Ajouter
                  </Button>
                </div>
                )}   
                <FormControl className="mt-24" fullWidth>
                  <FormLabel htmlFor="visibilite" className="font-medium text-14" component="legend">
                    Catégories
                  </FormLabel>
                  <Autocomplete
                    multiple
                    options={listeCategorie}
                    getOptionLabel={(option) => option.nom}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FormControl>
                <Link color="inherit" href="#" onClick={ handleLinkClickAddCateg} >
                  Ajouter une catégorie
                </Link>
                {isInputCategVisible && ( 
                <div className="relative mt-7 flex">
                  <TextField 
                    type='text'
                    variant="outlined" 
                    size="small" 
                    fullWidth
                    value={newCategName}
                    onChange={(e) => {setnewCategName(e.target.value);setBoutonDesableCateg(false);}}
                  />
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    className="absolute top-0 right-0 h-full rounded-l-none rounded-r"
                    disabled={boutonDesableCateg ? true : undefined}
                    onClick={handleAddCategClick}
                  >
                    Ajouter
                  </Button>
                </div>
                )}
                <FormControl className="mt-24" fullWidth>
                    <FormLabel htmlFor="visibilite" className="font-medium text-14" component="legend">
                      Types
                    </FormLabel>
                    <Autocomplete
                      multiple
                      options={listeType}
                      getOptionLabel={(option) => option.nom}
                      value={selectedTypes}
                      onChange={handleTypesChange}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
                <Link color="inherit" href="#" onClick={handleLinkClickAddType} >
                  Ajouter un type
                </Link>
                {isInputTypeVisible && ( 
                <div className="relative mt-7 flex">
                  <TextField 
                    variant="outlined" 
                    size="small" 
                    fullWidth
                    value={newTypeName}
                    onChange={(e) => {setnewTypeName(e.target.value);setBoutonDesableType(false);}}
                  />
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    className="absolute top-0 right-0 h-full rounded-l-none rounded-r"
                    onClick={handleAddTypeClick}
                    disabled={boutonDesableType ? true : undefined}
                  >
                    Ajouter
                  </Button>
                </div>
                )}
              </CardContent>
            </Card> 
            <Card component={motion.div} variants={item} className="flex flex-col w-full px-32 pt-24 mb-32">
              <div className="flex justify-between items-center pb-16">
                <Typography className="text-2xl font-semibold leading-tight">
                  Image mise en avant
                </Typography>
              </div>

              <CardContent className="p-0">                        
                <FormControl className="mb-16" fullWidth>
                { (!imgMiseEnAvant || imgMiseEnAvant == '') ? 
                  <Button type="button" className="py-10 px-32" variant="outlined" color="inherit" size="small" aria-label="post" onClick={imageHandlerMea}>
                    ajouter une image
                  </Button>
                    : 
                  <Button type="button" className="py-10 px-32" variant="outlined" color="inherit" size="small" onClick={() => {changeImageHandlerMea(idImageToChange)}}>
                    changer l'image
                  </Button>
                    }
                  { imgMiseEnAvant &&  imgMiseEnAvant != '' && ( <div>
                    <img src={`http://localhost:4000/${imgMiseEnAvant}`} alt="image" className="mt-32" />
                    <Link color="inherit" href="#" onClick={(e) => {e.preventDefault();deleteImg(idImageToChange);actualityFieldImgToEmpty(actualityId)}} >
                      Supprimer l'image
                    </Link>
                  </div>
                  )}
                </FormControl>                   
              </CardContent>
            </Card>
            <Card component={motion.div} variants={item} className="flex flex-col w-full px-32 pt-24 mb-32">
              <div className="flex justify-between items-center pb-16">
                <Typography className="text-2xl font-semibold leading-tight">
                  Récapitulatif
                </Typography>
              </div>

              <CardContent className="p-0">                        
                <FormControl className="mb-16" required fullWidth>
                  <FormLabel htmlFor="visibilite" className="font-medium text-14" component="legend">
                    visibilité
                  </FormLabel>
                  <Select name="visibilite" id="visibilite" value={selectedVisibilite} onChange={handleChangeVisibilite} variant="outlined" fullWidth>
                    <MenuItem value="public">publique</MenuItem>
                    <MenuItem value="privee">privée</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className="mb-16" required fullWidth>
                  <FormLabel htmlFor="etat" className="font-medium text-14" component="legend">
                    État
                  </FormLabel>
                  <Select name="etat" id="etat"  value={selectedEtat} onChange={handleChangeEtat} variant="outlined" fullWidth>
                    <MenuItem value="publie">publié</MenuItem>
                    <MenuItem value="brouillon">brouillon</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
            
            <Card component={motion.div} variants={item} className="flex flex-col w-full px-32 pt-24">
              <div className="flex justify-between items-center pb-16">
                <Typography className="text-2xl font-semibold leading-tight">
                Commentaire
                </Typography>
              </div>
              <CardContent className="p-0">                           
                <FormControl className="mb-16" fullWidth>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
                      label="Autoriser les commentaires"
                    />
                  </FormGroup>
                </FormControl>                 
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

export default AddActualityTab;
