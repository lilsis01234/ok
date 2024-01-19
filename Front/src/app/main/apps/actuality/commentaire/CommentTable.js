import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CommentTableHead from './CommentTableHead';
import withRouter from '@fuse/core/withRouter';
import newsWithComments from '../api/mockComment';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import moment from 'moment';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import 'moment/locale/fr';

moment.locale('fr')

function CommentTable(props) {

  const [comments, setComments] = useState([]);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);
  const [commentIdToApprouv, setCommentIdToApprouv] = useState(null);
  const [commentIdToDesapprouv, setCommentIdToDesapprouv] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isApprouvModalOpen, setIsApprouvModalOpen] = useState(false);
  const [isDesapprouvModalOpen, setIsDesapprouvModalOpen] = useState(false);

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

  const tablestyle = {
    textAlign: '-webkit-right'
  };


  const approuver = (id) => {
    axios.put(`http://localhost:4000/api/commentaire/approuver/${id}`)
  
    .then(() => {
      closeApprouvModal();
      fetchComment();
    })
  
    .catch(err => {
      console.log(err); 
      closeApprouvModal()
    });
  }

  const desapprouver = (id) => {
    axios.put(`http://localhost:4000/api/commentaire/desapprouver/${id}`)
  
    .then(() => {
      closeDesapprouvModal();
      fetchComment();
    })
  
    .catch(err => {
      console.log(err); 
      closeDesapprouvModal()
    });
  }

  const openDeleteModal = (id) => {
    setCommentIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setCommentIdToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const openApprouvModal = (id) => {
    setCommentIdToApprouv(id);
    setIsApprouvModalOpen(true);
  };

  const closeApprouvModal = () => {
    setCommentIdToApprouv(null);
    setIsApprouvModalOpen(false);
  };

  const openDesapprouvModal = (id) => {
    setCommentIdToDesapprouv(id);
    setIsDesapprouvModalOpen(true);
  };

  const closeDesapprouvModal = () => {
    setCommentIdToDesapprouv(null);
    setIsDesapprouvModalOpen(false);
  };


  const fetchComment = () => {
    axios.get('http://localhost:4000/api/commentaire/all')
      .then(res => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch(err => console.log(err));
  }
  
  useEffect(() => {
    fetchComment();
  }, [])


  const deleteComment = (id) => {

    axios.delete(`http://localhost:4000/api/commentaire/${id}`)
  
    .then(() => {
      closeDeleteModal();
      fetchComment();
    })
  
    .catch(err => {
      console.log(err); 
      closeDeleteModal()
    });
  
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <CommentTableHead  />

          <TableBody>
            { comments.map((comment) => (
                  <TableRow
                    className="h-72 cursor-pointer"
                    role="checkbox"
                    key={comment.id}
                  >

                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {comment?.Compte?.Collab?.nom} {comment?.Compte?.Collab?.prenom}
                      </TableCell>

                      <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                        {comment.contenu}
                      </TableCell>

                      <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                        {comment?.Actualite?.titre}
                      </TableCell>

                      <TableCell className="p-4 md:p-16 truncate" component="th" scope="row" align="right">
                        {moment(comment.date_comm).format('DD MMM YYYY')}
                      </TableCell>

                      <TableCell className="md:pl-52 p-4 md:p-16" component="th" scope="row" sx={tablestyle} align="right">
                        {comment.approuver == true ? (
                          <IconButton aria-label="delete" color="error" size="large" onClick={ () => openDesapprouvModal(comment.id)}>
                            <FuseSvgIcon className="text-green" size={20}>
                              heroicons-outline:check-circle
                            </FuseSvgIcon>
                          </IconButton>
                        ) : (
                          <IconButton aria-label="delete" color="error" size="large" onClick={ () => openApprouvModal(comment.id)}>
                            <FuseSvgIcon className="text-red" size={20}>
                              heroicons-outline:minus-circle
                            </FuseSvgIcon>
                          </IconButton>
                        )}
                      </TableCell>
                      
                      <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                        <IconButton aria-label="delete" color="error" size="large" onClick={ () => openDeleteModal(comment.id)}>
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>

                  </TableRow>
           ))}
          </TableBody>
        </Table>
      </FuseScrollbars>
      <Modal open={isDeleteModalOpen} onClose={closeDeleteModal}>
        <Box
          sx={style}
        >
          <p>Êtes-vous sûr de vouloir supprimer ce commentaire ?</p>
          <div className='mt-10 float-right'>
            <Button variant="contained" onClick={closeDeleteModal} color="primary" className='mr-7'>
              Annuler
            </Button>
            <Button
              variant="contained"
              onClick={() => {deleteComment(commentIdToDelete); }}
              color="error"
            >
              Supprimer
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal open={isApprouvModalOpen} onClose={closeApprouvModal}>
        <Box
          sx={style}
        >
          <p>Êtes-vous sûr de vouloir approuver ce commentaire ?</p>
          <div className='mt-10 float-right'>
            <Button variant="contained" onClick={closeApprouvModal} color="primary" className='mr-7'>
              Non
            </Button>
            <Button
              variant="contained"
              onClick={() => {approuver(commentIdToApprouv); }}
              color="success"
            >
              Oui
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal open={isDesapprouvModalOpen} onClose={closeDesapprouvModal}>
        <Box
          sx={style}
        >
          <p>Êtes-vous sûr de vouloir désapprouver ce commentaire ?</p>
          <div className='mt-10 float-right'>
            <Button variant="contained" onClick={closeDesapprouvModal} color="primary" className='mr-7'>
              Non
            </Button>
            <Button
              variant="contained"
              onClick={() => {desapprouver(commentIdToDesapprouv); }}
              color="error"
            >
              Oui
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default withRouter(CommentTable);
