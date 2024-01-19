import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { CheckBox } from '@mui/icons-material';
import { Box, IconButton, ListItemIcon, MenuItem, MenuList, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@mui/material';
import React, { useState } from 'react'
import { lighten } from '@mui/material/styles';

const rows = [
    {
        id: 'equipe',
        align: 'left',
        disablePadding: false,
        label: 'Equipe',
        sort: true
    },
    {
        id: 'projet',
        align: 'left',
        disablePadding: false,
        label: 'Projet',
        sort: true
    },
]


function EquipeTableHeader(props) {
    const { selectedEquipeId } = props;
    const numSelected = selectedEquipeId.length;

    const [selectedEquipeMenu, setSelectedEquipeMenu] = useState(null);

    const createSortHandler = (property) => (event) => {
        props.onRequestSort(event, property);
    };

    
    function openSelectedEquipeMenu(event) {
        setSelectedEquipeMenu(event.currentTarget);
    }

    function closeSelectedEquipeMenu() {
        setSelectedEquipeMenu(null);
    }



  return (
    <TableHead>
        <TableRow className='h-48 sm:h-64'>
            <TableCell
                 sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? lighten(theme.palette.background.default, 0.4)
                            : lighten(theme.palette.background.default, 0.02),
                }}
                padding="none"
                className="w-40 md:w-64 text-center z-99"
            >
                <CheckBox
                     indeterminate={numSelected > 0 && numSelected < props.rowCount ? "true" : "false"}
                     checked={props.rowCount !== 0 && numSelected === props.rowCount}
                     onChange={props.onSelectAllClick}
                >
                     {numSelected > 0 && (
                            <Box className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
                                sx={{
                                    background: (theme) => theme.palette.background.default,
                                }}>
                                <IconButton
                                    aria-owns={selectedEquipeId ? 'selectedProjectMenu' : null}
                                    aria-haspopup="true"
                                    onClick={openSelectedEquipeMenu}
                                    size="large"
                                >
                                    <FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon>
                                </IconButton>
                                <Menu
                                    id="selectedProductsMenu"
                                    anchorEl={selectedEquipeMenu}
                                    open={Boolean(selectedEquipeMenu)}
                                    onClose={closeSelectedEquipeMenu}
                                >
                                    <MenuList>
                                        <MenuItem
                                            uItem
                                            onClick={() => {
                                                dispatch(removeProducts(selectedEquipeMenu));
                                                props.onMenuItemClick();
                                                closeSelectedEquipeMenu();
                                            }}
                                        >
                                            <ListItemIcon className="min-w-40">
                                                <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
                                            </ListItemIcon>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>
                        )}

                </CheckBox>
            </TableCell>
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

export default EquipeTableHeader
