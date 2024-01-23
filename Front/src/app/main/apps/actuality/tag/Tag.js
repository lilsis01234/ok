import { useRef, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 7
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-tag(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }));


function ModernComingSoonPage() {

  const [boutonDesable, setBoutonDesable] = useState(true);
  const [nomInput, setNomInput] = useState('');
  const [newName, setNewName] = useState('');
  const [listeTag, setListTag] = useState([]);
  const [nouveauTag, setNouveauTag] = useState('');
  const [tagIdToDelete, setTagIdToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [idTagEdit, setidTagEdit] = useState('');
  const [nomToEdit, setNomToEdit] = useState('');

  const dispatch = useDispatch();
  const formRef = useRef(null);
  
  const openDeleteModal = (id) => {
    setTagIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setTagIdToDelete(null);
    setIsDeleteModalOpen(false);
  };


const fetchTags = () => {
  axios.get('http://localhost:4000/api/tag/all')
    .then(res => {setListTag(res.data)})
    .catch(err => console.log(err));
}

useEffect(() => {
  fetchTags();
}, [])

const handleSubmit = async (e) => { e.preventDefault();

  if (nomInput) {

    const formData = new FormData(formRef.current);
    const nom = formData.get('nom');
    const dataForm = { nom };
  
  
    const serveurApi = 'http://localhost:4000/api/tag/new';
    axios.post(serveurApi, dataForm)
        .then(res => {
          if (res.data) {
              setNouveauTag(res.data.nom);
              setListTag([...listeTag, res.data]);
              setNomInput('');
          }
        })
        .catch (err => {
          console.log(err);
          dispatch(showMessage({message : err.response.data.message}));
          setNomInput('');
        }); 
  } else {
    setBoutonDesable(true);
  }

}

const deleteTag = (id) => {

  axios.delete(`http://localhost:4000/api/tag/${id}`)

  .then(() => {
    const updatedTag = listeTag.filter(tag => tag.id !== id);
    setListTag(updatedTag);
    closeDeleteModal();
  })

  .catch(err => {
    console.log(err); 
    closeDeleteModal()
  });

}

const editTag = (id, nom) => {
  setNomToEdit(nom);
  setIsEditing(true);
  setidTagEdit(id);
}

const handleEdit = (e) => {

  const id = idTagEdit;
  const nom = newName;
  const dataForm = { nom };

  if(nom) {
    
    axios.put(`http://localhost:4000/api/tag/${id}`, dataForm)
  
    .then((res) => {
        console.log(res.data);
        setNewName('');
        fetchTags();
        setIsEditing(false);
      })
  
    .catch(err => {console.log(err)});

  } else {
    setBoutonDesable(true);
  }


}

const cancelEdit = () => {
  setIsEditing(false);
}

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0 md:p-32">
      <Paper className="flex w-full sm:w-auto min-h-full sm:min-h-auto md:w-full md:max-w-6xl rounded-0 sm:rounded-2xl sm:shadow overflow-hidden">
        <div className="w-full sm:w-auto py-32 px-16 sm:p-48 md:p-64 ltr:border-r-1 rtl:border-l-1">
          <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
            <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />

            <Typography className="mt-32 text-3xl font-extrabold tracking-tight leading-tight">
              Tag d'actualités :
            </Typography>
            <Typography className="mt-2">
            Une formulaire de gestion qui permet aux utilisateurs d'ajouter des tags d'actualités.
            </Typography>

            {isEditing ? (
              <form
                name="editForm"
                noValidate
                className="flex flex-col justify-center w-full py-48"
              >
            
                <TextField
                  name="nom"
                  id="nom"
                  className="mb-24"
                  label="Nouvelle nom de la tag"
                  tag="text"
                  variant="outlined"
                  value={newName}
                  onChange={(e) => {setNewName(e.target.value);setBoutonDesable(false);}}
                  required={true}
                  fullWidth
                />
                  <Button
                      variant="contained"
                      color="secondary"
                      className=" w-full mt-4 mb-16"
                      aria-label="Register"
                      size="large"
                      onClick={handleEdit}
                      disabled={boutonDesable ? "disabled" : undefined}
                  >
                      Mettre à jour
                  </Button>
                  <Button
                      variant="contained"
                      color="error"
                      className=" w-full mt-4 mb-16"
                      aria-label="Register"
                      size="large"
                      onClick={cancelEdit}
                  >
                      Annuler
                  </Button>
              </form>
                    ) : (
                      <form 
                          ref={formRef}
                          onSubmit={handleSubmit}
                          name="comingSoonForm"
                          noValidate
                          className="flex flex-col justify-center w-full py-48"
                        >
                        
                          <TextField
                            name="nom"
                            id="nom"
                            className="mb-24"
                            label="Nom de la tag"
                            tag="text"
                            variant="outlined"
                            required
                            value={nomInput}
                            onChange={(e) => {setNomInput(e.target.value);setBoutonDesable(false);}}
                            fullWidth
                          />
                          <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          className=" w-full mt-4 mb-32"
                          aria-label="Register"
                          tag="submit"
                          size="large"
                          disabled={boutonDesable ? true : undefined}
                          >
                          ajouter
                          </Button>
                      </form>
                    ) 
                } 

          </div>
        </div>
        <TableContainer className="max-h-512">
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left" >Nom</StyledTableCell >
                        <StyledTableCell  align="center">Action</StyledTableCell >
                    </TableRow>
                </TableHead>
                <TableBody>
                {listeTag.map((n) => (
                    <StyledTableRow 
                    key={n.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <StyledTableCell  component="th" scope="row" align="left" >
                    {n.nom}
                    </StyledTableCell >
                    <StyledTableCell  align="center">
                        <IconButton aria-label="edit" color="secondary"  onClick={ () => editTag(n.id, n.nom)} >
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="error" onClick={ () => openDeleteModal(n.id)} >
                            <DeleteIcon />
                        </IconButton>
                    </StyledTableCell >
                    </StyledTableRow >
                ))}
                </TableBody>
            </Table>
        </TableContainer>
      </Paper>
      <Modal open={isDeleteModalOpen} onClose={closeDeleteModal}>
        <Box
          sx={style}
        >
          <p>Êtes-vous sûr de vouloir supprimer cet tag d'actualité ?</p>
          <div className='mt-10 float-right'>
            <Button variant="contained" onClick={closeDeleteModal} color="primary" className='mr-7'>
              Annuler
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                deleteTag(tagIdToDelete);
                setNomInput('');
              }}
              color="error"
            >
              Supprimer
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModernComingSoonPage;
