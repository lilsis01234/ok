import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { CheckBox } from '@mui/icons-material';
import { IconButton, ListItemIcon, TableHead, TableRow, Tooltip, TableCell, TableSortLabel, lighten} from '@mui/material';
import React, { useState }  from 'react'

const rows = [
    {
        id: 'poste',
        align: 'left',
        disablePadding: false,
        label: 'Poste',
        sort: true
    }, 
    {
        id: 'departement',
        align: 'left',
        disablePadding: false,
        label: 'Département',
        sort: true
    }, 
]


function PosteTableHeader(props) {
    const { selectedPosteId } = props;
    const numSelected = selectedPosteId.length;

    const [selectedPosteMenu, setSelectedPosteMenu] = useState(null);

    const createSortHandler = (property) => (event) => {
        props.onRequestSort(event, property);
      };

      function openSelectedPosteMenu(event) {
        setSelectedPosteMenu(event.currentTarget);
      }

      function openSelectedPosteMenu(event) {
        setSelectedPosteMenu(event.currentTarget);
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
                            aria-owns={selectedPosteId ? 'selectedProductsMenu' : null}
                            aria-haspopup="true"
                            onClick={openSelectedPosteMenu}
                            size="large"
                        >
                            <FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon>
                        </IconButton>
                        <Menu
                            id="selectedProductsMenu"
                            anchorEl={selectedPosteMenu}
                            open={Boolean(selectedPosteMenu)}
                            onClose={selectedPosteMenu}
                        >
                            <MenuList>
                                <MenuItem
                                    onClick={() => {
                                        dispatch(removeProducts(selectedPosteId));
                                        props.onMenuItemClick();
                                        closeSelectedDirectionMenu();
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

export default PosteTableHeader
