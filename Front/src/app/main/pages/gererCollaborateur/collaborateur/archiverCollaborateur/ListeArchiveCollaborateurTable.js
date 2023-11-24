import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import { Table, TableBody, TableCell, TableRow, Typography, TablePagination } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import FuseScrollbars from '@fuse/core/FuseScrollbars/FuseScrollbars';
import moment from 'moment';
import 'moment/locale/fr';
import axios from 'axios';
import ListeArchiveCollaborateurTableHeader from './ListeArchiveCollaborateurTableHeader';

moment.locale('fr')
function ListeArchiveCollaborateurTable(props) {
  const [archiveCollab, setArchiveCollab] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowsPerPage] = useState(10);

  const fetchCollaborateur = () => {
    axios
      .get("http://localhost:4000/api/archive/all")
      .then((response) => {
        setArchiveCollab(response.data);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  useEffect(() => {
    fetchCollaborateur();
    setLoading(false);
  }, [])

  if (loading) {
    return <FuseLoading />
  }

  function handleClick(item) {
    navigate(`/manage/archive/collaborateur/${item.id}`);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }


  if (archiveCollab.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          Il n'y a pas de collaborateur!
        </Typography>
      </motion.div>
    );
  }


  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ListeArchiveCollaborateurTableHeader />
          <TableBody>
            {archiveCollab
              .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
              .map((n) => (
                <TableRow
                  className="h-72 cursor-pointer"
                  hover
                  // role="checkbox"
                  // aria-checked={isSelected}
                  tabIndex={-1}
                  key={n.id}
                  // selected={isSelected}
                  onClick={(event) => handleClick(n)}
                >
                  <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.matricule}</TableCell>
                  <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.nom} {n.prenom}</TableCell>
                  <TableCell className="p-4 md:p-16 " component="th" scope="row">{moment(n.dateDebauche).format('D MMMM YYYY')}</TableCell>
                  <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.poste1?.titrePoste}</TableCell>
                  <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.departement1?.nomDepartement}</TableCell>
                  <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.projet1?.nomProjet}</TableCell>
                  <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.site}</TableCell>
                  <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.entreprise}</TableCell>

                </TableRow>
              ))

            }
          </TableBody>
        </Table>
      </FuseScrollbars>
      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={archiveCollab.length}
        rowsPerPage={rowPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Page Précédent",
        }}
        nextIconButtonProps={{
          "aria-label": "Page Suivant",
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default ListeArchiveCollaborateurTable
