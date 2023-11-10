import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import FuseScrollbars from '@fuse/core/FuseScrollbars/FuseScrollbars';
import { CheckBox } from '@mui/icons-material';
import EquipeTableHeader from './EquipeTableHeader';

function EquipeTable(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([])
    const [equipeData, setEquipeData] = useState([])
    const [page, setPage] = useState(0);
    const [rowPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null,
    });

    const fetchEquipe = () => {
        axios.get('http://localhost:4001/api/equipe/all')
            .then((response) => {
                setEquipeData(response.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        fetchEquipe()
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
            setSelected(equipeData.map((n) => n.id))
            return;
        }
        setSelected([]);
    }

    function handleDeselect() {
        setSelected([]);
    }

    function handleClick(item) {
        navigate(`/business/manage/team/${item.id}/`);
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

    if (equipeData.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    There are no team!
                </Typography>
            </motion.div>
        );
    }

    console.log(equipeData)

    return (
        <div className="w-full flex flex-col min-h-full">
            <FuseScrollbars>
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <EquipeTableHeader
                        selectedEquipeId={selected}
                        order = {order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={equipeData.length}
                        onMenuItemClick={handleDeselect}    
                    />
                    <TableBody>
                        {_.orderBy(
                            equipeData, [
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
                                            {n.nomEquipe}
                                        </TableCell>
                                        <TableCell className="p-4 md:p-16 " component="th" scope="row">
                                            {n.Projet?.nomProjet}
                                        </TableCell>

                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </FuseScrollbars>
        </div>
    )
}

export default EquipeTable
