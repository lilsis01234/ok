import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars/FuseScrollbars';
import { ListItem, TablePagination } from '@mui/material';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import _ from 'lodash'
import PermisssionListeTableHeader from './PermisssionListeTableHeader';

function PermissionListeTable(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [permissionData, setPermissionData] = useState([])
    const [page, setPage] = useState(0);
    const [rowPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null,
    });


    const fetchPermission = () => {
        axios.get('http://localhost:4000/api/permission/all')
            .then((response) => {
                setPermissionData(response.data)
            }).catch((err) => {
                console.error(err)
            })
    }


    useEffect(() => {
        fetchPermission()
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

    function handleClick(item) {
        navigate(`/manage/permission/${item.id}`);
    }

    function handleChangePage(event, value) {
        setPage(value);
    }


    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }


    if (permissionData.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    Il n'y a pas de permision
                </Typography>
            </motion.div>
        );
    }


    return (
        <div className="w-full flex flex-col min-h-full">
            <FuseScrollbars className="grow overflow-x-auto">
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <PermisssionListeTableHeader
                        order={order}
                        onRequestSort={handleRequestSort}
                        rowCount={permissionData.length}
                    />

                    <TableBody>
                        {
                            _.orderBy(
                                permissionData, [
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
                            ], [order.direction]
                            )
                                .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                                .map((n) => (
                                    <TableRow
                                        className="h-72 cursor-pointer"
                                        hover
                                        tabIndex={-1}
                                        key={n.id}
                                        onClick={(event) => handleClick(n)}
                                    >
                                        <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.permission}</TableCell>
                                        <TableCell className="p-4 md:p-16 " component="th" scope="row">{(n.role).map(role => (
                                            <ListItem key={role.id}>{role.roleHierarchique}</ListItem>
                                        ))}
                                        </TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </FuseScrollbars>
            <TablePagination
                className="shrink-0 border-t-1"
                component="div"
                count={permissionData.length}
                rowsPerPage={rowPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Page Précédante',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Page suivante',
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default PermissionListeTable
