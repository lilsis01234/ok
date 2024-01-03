import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars/FuseScrollbars';
import { Table, TableBody, TableRow, TableCell} from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import _ from 'lodash'
import { TablePagination } from '@mui/material';
import SiteTableHeader from './SiteTableHeader';

function SiteTable(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState([])
    const [siteData, setSiteData] = useState([])


    const [page, setPage] = useState(0);
    const [rowPerPage, setRowsPerPage] = useState(10);


    const [order, setOrder] = useState({
        direction: 'asc',
        id: null,
    });

    const fetchSite = () => {
        axios.get('http://localhost:4000/api/site/all')
        .then((response) => {
            setSiteData(response.data)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        fetchSite()
        setLoading(false)
    }, []) 

    if(loading){
        return <FuseLoading/>
    }

    
    function handleRequestSort(event, property){
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
        navigate(`/business/manage/site/${item.id}/`);
    }


    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }


    if (siteData.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    Il n'y a pa de site!
                </Typography>
            </motion.div>
        );
    }


    // console.log(siteData)



  return (
    <div className="w-full flex flex-col min-h-full">
        <FuseScrollbars className="grow overflow-x-auto">
            <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                <SiteTableHeader
                    order = {order}
                    onRequestSort={handleRequestSort}
                    rowCount={siteData.length}
                />
                <TableBody>
                {_.orderBy(
                            siteData, [
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
                            return (
                                <TableRow
                                    className="h-72 cursor-pointer"
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={n.id}
                                    onClick={(event) => handleClick(n)}
                                >
                                    <TableCell className="p-4 md:p-16 " component="th" scope="row">
                                        {n.nomSite}
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
            count={siteData.length}
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

export default SiteTable
