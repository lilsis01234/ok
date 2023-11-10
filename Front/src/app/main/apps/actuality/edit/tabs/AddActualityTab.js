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



function AddActualityTab() {
  
  const [wysiwygContent, setWysiwygContent] = useState('');
  const [imgMiseEnAvant, setImgMiseEnAvant] = useState('');
  const [listeCategorie, setListCategorie] = useState([]);
  const [listeType, setListType] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [idImageToChange, setidImageToChange] = useState(null);

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


  const fetchCategories = () => {
    axios.get('http://localhost:4001/api/actualite/categorie/all')
      .then(res => {setListCategorie(res.data)})
      .catch(err => console.log(err));
  }
  
  const fetchTypes = () => {
    axios.get('http://localhost:4001/api/actualite/type/all')
    .then(res => {setListType(res.data)})
    .catch(err => console.log(err));
  }
  
  useEffect(() => {
    fetchCategories();
    fetchTypes();
  }, [])

  
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('nom', file);    
        const serveurApiImg = 'http://localhost:4001/api/actualite/image';      
        axios.post(serveurApiImg, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(res => {

            if (res.data.nom) {
                  const img = `<img src="http://localhost:4001/${res.data.nom}" alt="image téléchargée" />`;
                  setWysiwygContent(wysiwygContent + img);
            }

          })
          .catch(err => console.log(err));
          
      }
    };
    input.click();
  };

  const changeImageHandlerMea = (id) => {

      axios.delete(`http://localhost:4001/api/actualite/image/${id}`)
    
      .then((res) => {
        console.log(res.data);
        imageHandlerMea();

      })
    
      .catch(err => {
        console.log(err);
      });
    

  }

  const deleteImg = (id) => {

      axios.delete(`http://localhost:4001/api/actualite/image/${id}`)
    
      .then((res) => {
        console.log(res.data);
        setImgMiseEnAvant('');
      })
    
      .catch(err => {
        console.log(err);
      });
    
  }


  const imageHandlerMea = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('nom', file);    
        const serveurApiImg = 'http://localhost:4001/api/actualite/image';      
        axios.post(serveurApiImg, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(res => {

            if (res.data.nom) {
                  const imgMea = `http://localhost:4001/${res.data.nom}`;
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


  const formRef = useRef(null);
  const isCheckboxChecked = useRef(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData(formRef.current);
    
    const titre = formData.get('titre');
    const extrait = formData.get('extrait');
    const visibilite = formData.get('visibilite');
    const etat = formData.get('etat');
    const category = getSelectedCategoryIds().split(',');
    const type = getSelectedTypeIds().split(',');
    const contenu = wysiwygContent;
    const date_publication = '2023-10-27';
    const imageMiseEnAvant = imgMiseEnAvant;


    const dataForm = {
      titre,
      contenu,
      date_publication,
      extrait,
      etat,
      visibilite,
      category,
      type,
      imageMiseEnAvant

    };

    console.log(dataForm);

    // const serveurApi = 'http://localhost:4001/api/actualite/new';
    // axios.post(serveurApi, dataForm, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    //     .then(res => {

    //       if (res.data) {
    //           console.log('reponse : ', res.data);
    //           window.location.reload();
    //       }

    //     })
    //     .catch(err => console.log(err));
      
  }


  const handleWysiwygChange = (value) => {
    setWysiwygContent(value);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="md:flex flex-row justify-between items-center">
          <Typography className="text-3xl font-semibold tracking-tight leading-8 mb-24 mt-16">
                Modifier l'article
          </Typography>
          <Button type="submit" className="py-10 px-32" variant="contained" color="secondary" size="small" aria-label="post">
            Enregistrer
          </Button>
        </div>
        <Card component={motion.div} variants={item} className="flex flex-col w-full px-32 py-24 mb-24">
          <TextField
            name="titre"
            id="titre"
            label="Saisissez votre titre ici"
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
              className="w-full overflow-hidden min-h-384 mb-32"
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
                multiline
                rows="6"
                margin="none"
                disableUnderline
              />
            </Card>
          </div>
          <div className="flex flex-col w-full md:w-320 md:rtl:ml-32 ml-32">
            <Card component={motion.div} variants={item} className="flex flex-col w-full px-32 pt-24 mb-32">
              <div className="flex justify-between items-center pb-16">
                <Typography className="text-2xl font-semibold leading-tight">
                  Image mise en avant
                </Typography>
              </div>

              <CardContent className="p-0">                        
                <FormControl className="mb-16" fullWidth>
                { !imgMiseEnAvant ? 
                  <Button type="button" className="py-10 px-32" variant="outlined" color="inherit" size="small" aria-label="post" onClick={imageHandlerMea}>
                    ajouter une image
                  </Button>
                    : 
                  <Button type="button" className="py-10 px-32" variant="outlined" color="inherit" size="small" onClick={() => {changeImageHandlerMea(idImageToChange)}}>
                    changer l'image
                  </Button>
                    }
                  { imgMiseEnAvant ? ( <div>
                    <img src={imgMiseEnAvant} alt="image" className="mt-32" />
                    <Link color="inherit" href="javascript:void(0)" onClick={() => {deleteImg(idImageToChange)}} >
                      Supprimer l'image
                    </Link>
                  </div>
                  ) : ''}
                </FormControl>                   
              </CardContent>
            </Card>
            <Card component={motion.div} variants={item} className="flex flex-col w-full px-32 pt-24 mb-32">
              <div className="flex justify-between items-center pb-16">
                <Typography className="text-2xl font-semibold leading-tight">
                    État et visibilité
                </Typography>
              </div>

              <CardContent className="p-0">                        
                <FormControl className="mb-16" required fullWidth>
                  <FormLabel htmlFor="visibilite" className="font-medium text-14" component="legend">
                    visibilité
                  </FormLabel>
                  <Select name="visibilite" id="visibilite" defaultValue="public" variant="outlined" fullWidth>
                    <MenuItem value="public">publique</MenuItem>
                    <MenuItem value="privee">privée</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className="mb-16" required fullWidth>
                  <FormLabel htmlFor="etat" className="font-medium text-14" component="legend">
                    État
                  </FormLabel>
                  <Select name="etat" id="etat" defaultValue="publie" variant="outlined" fullWidth>
                    <MenuItem value="publie">publié</MenuItem>
                    <MenuItem value="brouillon">brouillon</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
            <Card component={motion.div} variants={item} className="flex flex-col w-full px-32 pt-24 mb-32">
              <div className="flex justify-between items-center pb-16">
                <Typography className="text-2xl font-semibold leading-tight">
                    Catégories et type
                </Typography>
              </div>

              <CardContent className="p-0">    
                <FormControl className="mb-16" required fullWidth>
                  <FormLabel htmlFor="categorie" className="font-medium text-14" component="legend">
                    Categorie
                  </FormLabel>
                    <Autocomplete
                      multiple
                      options={listeCategorie}
                      getOptionLabel={(option) => option.nom}
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
                <FormControl className="mb-16" required fullWidth>
                  <FormLabel htmlFor="types" className="font-medium text-14" component="legend">
                    Types
                  </FormLabel>
                    <Autocomplete
                      multiple
                      options={listeType}
                      getOptionLabel={(option) => option.nom}
                      value={selectedTypes}
                      onChange={handleTypesChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
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
                      control={
                        <Checkbox
                          name="commentaire"
                          onChange={() => {
                            isCheckboxChecked.current = !isCheckboxChecked.current;
                          }}
                        />
                      }
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
