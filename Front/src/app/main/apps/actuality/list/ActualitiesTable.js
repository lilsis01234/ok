import React,  { useEffect, useState} from 'react';
import axios from "axios";
import FuseLoading from "@fuse/core/FuseLoading/FuseLoading";
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import { TablePagination } from "@mui/material";
import { motion } from "framer-motion";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ActualitiesTableHead from './ActualitiesTableHead';
import withRouter from '@fuse/core/withRouter';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import 'moment/locale/fr';
import Typography from '@mui/material/Typography';

moment.locale('fr')


function ActualitiesTable({searchResults}) {

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  useEffect(() => {
    if (searchResults) {
      setLoading(false);
    }
  }, [searchResults]);

  if (loading) {
    return <FuseLoading />;
  }

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(searchResults.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(`/apps/actuality/${item.id}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (searchResults.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          Il n'y a pas d'actualité!
        </Typography>
      </motion.div>
    );
  }


  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ActualitiesTableHead 
            selectColladId={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={searchResults.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              searchResults,
              [
                (o) => {
                  switch (order.id) {
                    case "categories": {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    key={n.id}
                    onClick={(event) => handleClick(n)}
                  >

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.titre}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row" >
                      {n.Compte?.Collab?.nom} {n.Compte?.Collab?.prenom} 
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      { n.categorie && n.categorie.map((categorie) => ( 
                        <Typography>
                           {categorie.nom}
                        </Typography>
                        ))} 

                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {n.Type && n.Type.map((type) => ( 
                          <Typography>
                            {type.nom}
                          </Typography>
                      ))} 
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      0
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      0
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row" align="right">
                      {moment(n.date_publication).format('DD MMM YYYY')}
                    </TableCell>

                    <TableCell className="md:pl-52 p-4 md:p-16" component="th" scope="row"  style={{ textAlign: 'right' }}>
                      {n.etat == 'publie' ? (
                        <FuseSvgIcon className="text-green" size={20}>
                          heroicons-outline:check-circle
                        </FuseSvgIcon>
                      ) : (
                        <FuseSvgIcon className="text-red" size={20}>
                          heroicons-outline:minus-circle
                        </FuseSvgIcon>
                      )}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {n.visibilite}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>
      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={searchResults.length}
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
  );
}

export default withRouter(ActualitiesTable);
