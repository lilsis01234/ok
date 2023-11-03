import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import FuseScrollbars from '@fuse/core/FuseScrollbars/FuseScrollbars';
import { CheckBox } from '@mui/icons-material';
import _ from 'lodash'
import { TablePagination } from '@mui/material';
import ProjetHeader from './ProjetHeader';
import ProjetTableHeader from './ProjetTableHeader';

function ProjetTable(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const [projetData, setProjetData] = useState([])
    const [page, setPage] = useState(0);
    const [rowPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null,
    });



    const fetchProject = () => {
        axios.get('http://localhost:4000/api/projet/all')
            .then((response) => {
                setProjetData(response.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        fetchProject()
        setLoading(false)
    }, [])

    if (loading) {
        return <FuseLoading />
    }

    function handleRequestSort(event, property) {
        const id = property;
        let direction = 'desc';

        if (order.id === property && order.direction === 'desc') {
            direction = 'asc';
        }

        setOrder({
            direction,
            id,
        });

    }

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            setSelected(projetData.map((n) => n.id))
            return;
        }
        setSelected([]);
    }

    function handleDeselect() {
        setSelected([]);
    }


    function handleClick(item) {
        navigate(`/business/manage/project/${item.id}/`);
    }

    function handleCheck(event, id) {
        const selectedIndex = selected.indexOf(id);
        let newSelected = []
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected)
    }

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }

    if (projetData.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    There are no project!
                </Typography>
            </motion.div>
        );
    }

    return (
        <div className="w-full flex flex-col min-h-full">
            <FuseScrollbars className="grow overflow-x-auto">
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <ProjetTableHeader
                        selectedProjectId={selected}
                        order = {order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={projetData.length}
                        onMenuItemClick={handleDeselect}
                    />
                    <TableBody>
                        {_.orderBy(
                            projetData, [
                            (o) => {
                                switch (order.id) {
                                    case 'categories': {
                                        return o.categories[0]
                                    }
                                    default: {
                                        return o[order.id];
                                    }
                                }
                            },
                        ], [order.direction])
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
                                        <TableCell className="w-40 md:w-64 text-center" padding="none">
                                            <CheckBox
                                                checked={isSelected}
                                                onClick={(event) => event.stopPropagation()}
                                                onChange={(event) => handleCheck(event, n.id)}
                                            />
                                        </TableCell>
                                        <TableCell className="p-4 md:p-16 " component="th" scope="row">
                                            {n.nomProjet}
                                        </TableCell>
                                        <TableCell className="p-4 md:p-16 " component="th" scope="row">
                                            {n.TestDepartement?.nomDepartement}
                                        </TableCell>

                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </FuseScrollbars>
            <TablePagination
                className="shrink-0 border-t-1"
                component="div"
                count={projetData.length}
                rowsPerPage={rowPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default ProjetTable
