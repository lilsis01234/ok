import React, { useState, useEffect } from "react";
import axios from "axios";
import FuseLoading from "@fuse/core/FuseLoading/FuseLoading";
import FuseScrollbars from "@fuse/core/FuseScrollbars/FuseScrollbars";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import { TablePagination } from "@mui/material";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import CollaborateurTableHeader from "./CollaborateurTableHeader";
import moment from "moment";
import 'moment/locale/fr';

moment.locale('fr')

function CollaborateurTable(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [collaborateurData, setCollaborateurData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  const fetchCollaborateur = () => {
    axios
      .get("http://localhost:4000/api/collaborateur/all")
      .then((response) => {
        setCollaborateurData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchCollaborateur();
    setLoading(false);
  }, []);

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
      setSelected(collaborateurData.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(`/manage/collaborator/${item.id}`);
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

  if (collaborateurData.length === 0) {
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

  // console.log(collaborateurData)

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <CollaborateurTableHeader
            selectColladId={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={collaborateurData.length}
            onMenuItemClick={handleDeselect}
          />
          <TableBody>
            {_.orderBy(
              collaborateurData,
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
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={(event) => handleClick(n)}
                  >
                    {/* <TableCell
                      className="w-40 md:w-64 text-center"
                      padding="none"
                    >
                      <CheckBox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell> */}
                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.matricule}</TableCell>
                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.nom} {n.prenom}</TableCell>
                    {/* <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.dateNaissance}</TableCell> */}
                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{moment(n.dateNaissance).format('D MMMM YYYY')}</TableCell>
                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.poste1?.titrePoste}</TableCell>
                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.departement1?.nomDepartement}</TableCell>
                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.projet1?.nomProjet}</TableCell>
                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.site}</TableCell>
                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.entreprise}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>
      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={collaborateurData.length}
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

export default CollaborateurTable;
