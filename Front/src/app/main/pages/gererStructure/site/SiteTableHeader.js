import {TableHead, TableRow, Tooltip, TableCell, TableSortLabel, lighten} from '@mui/material';
import React from 'react'

const rows = [
    {
        id: 'site',
        align: 'left',
        disablePadding: false,
        label: 'Site',
        sort: true
    },
]

function SiteTableHeader(props) {


    const createSortHandler = (property) => (event) => {
        props.onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow className='h-48 sm:h-64'>
                {rows.map((row) => {
                    return (
                        <TableCell
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? lighten(theme.palette.background.default, 0.4)
                                        : lighten(theme.palette.background.default, 0.02),
                            }}
                            className="p-4 md:p-16"
                            key={row.id}
                            align={row.align}
                            padding={row.disablePadding ? 'none' : 'normal'}
                        >
                            {row.sort && (
                                <Tooltip
                                    title="Sort"
                                    placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        onClick={createSortHandler(row.id)}
                                        className="font-semibold"
                                    >
                                        {row.label}
                                    </TableSortLabel>

                                </Tooltip>
                            )}

                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    )
}

export default SiteTableHeader
