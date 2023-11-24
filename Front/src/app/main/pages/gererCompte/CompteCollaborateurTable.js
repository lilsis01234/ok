import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars/FuseScrollbars';
import { Table, TableBody, TableCell, TablePagination, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import CompteCollaborateurTableHeader from './CompteCollaborateurTableHeader';

function CompteCollaborateurTable() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [compteData, setCompteData] = useState([])
    const [page, setPage] = useState(0);
    const [rowPerPage, setRowsPerPage] = useState(10);


    const fetchCompteCollaborateur = () => {
        axios
            .get("http://localhost:4000/api/compte_collaborateur/all")
            .then((response) => {
                setCompteData(response.data);
            })
            .catch((err) => {
                console.error(err)
            })
    }

    console.log(compteData)

    useEffect(() => {
        fetchCompteCollaborateur();
        setLoading(false);
    }, [])

    if (loading) {
        return <FuseLoading />;
    }

    function handleClick(item) {
        navigate(`/manage/collaborator/${item.id}`);
    }

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }


    if (compteData.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    Il n'y a pas de compte collaborateur!
                </Typography>
            </motion.div>
        );
    }

    return (
        <div className="w-full flex flex-col min-h-full">
            <CompteCollaborateurTableHeader/>
            <FuseScrollbars className="grow overflow-x-auto">
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <TableBody>
                        {compteData
                            .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                            .map((n) => (
                                <TableRow
                                    className="h-72 cursor-pointer"
                                    hover
                                    tabIndex={-1}
                                    key={n.id}
                                // onClick={(event) => handleClick(n)}
                                >
                                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.Collab?.matricule}</TableCell>
                                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.Collab?.nom} {n.Collab?.prenom}</TableCell>
                                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.Collab?.poste1?.titrePoste}</TableCell>
                                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.Collab?.departement1?.nomDepartement}</TableCell>
                                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.email}</TableCell>
                                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.RoleHierarchique?.roleHierarchique}</TableCell>
                                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.RoleHierarchique?.Role?.titreRole}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </FuseScrollbars>
            <TablePagination
                className="shrink-0 border-t-1"
                component="div"
                count={compteData.length}
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
    )
}

export default CompteCollaborateurTable
