import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TablePagination, TableRow, Typography } from '@mui/material';
import FuseScrollbars from '@fuse/core/FuseScrollbars/FuseScrollbars';
import axios from 'axios';
import RoleHierarchiqueTableHeader from './RoleHierarchiqueTableHeader';

function RoleHierarchiqueListTable(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [roleHierarchiqueData, setRoleHierarchiqueData] = useState([])
    const [page, setPage] = useState(0);
    const [rowPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null,
    });

    const fetchRole = () => {
        axios.get('http://localhost:4000/api/roleHierarchique/all')
            .then((response) => {
                console.log(response.data)
                setRoleHierarchiqueData(response.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        fetchRole()
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
       navigate(`/manage/role/${item.id}/`);
    }


    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }


    if (roleHierarchiqueData.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    Il n'y a pas de rôle
                </Typography>
            </motion.div>
        );
    }

    return (
        <div className="w-full flex flex-col min-h-full">
            <FuseScrollbars className="grow overflow-x-auto">
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <RoleHierarchiqueTableHeader
                        order={order}
                        onRequestSort={handleRequestSort}
                        rowCount={roleHierarchiqueData.length}
                    />
                    <TableBody>
                        {_.orderBy(
                            roleHierarchiqueData, [
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
                                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.roleHierarchique}</TableCell>
                                    <TableCell className="p-4 md:p-16 " component="th" scope="row">{n.Role?.titreRole}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </FuseScrollbars>
            <TablePagination
                className="shrink-0 border-t-1"
                component="div"
                count={roleHierarchiqueData.length}
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

        </div >
    )
}

export default RoleHierarchiqueListTable
