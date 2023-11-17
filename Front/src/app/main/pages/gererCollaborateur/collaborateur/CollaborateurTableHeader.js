import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { CheckBox } from '@mui/icons-material';
import { Box, IconButton, Menu, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'


const rows = [
  {
    id: 'matricule',
    align: 'left',
    disablePadding: false,
    label: 'Matricule',
    sort: true
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Name',
    sort: true
  },
  {
    id: 'dateNaissance',
    align: 'left',
    disablePadding: false,
    label: 'Birth Day',
    sort: true
  }, {
    id: 'fonction',
    align: 'left',
    disablePadding: false,
    label: 'Fonction',
    sort: true
  }, {
    id: 'departement',
    align: 'left',
    disablePadding: false,
    label: 'Departement',
    sort: true
  }, {
    id: 'departement',
    align: 'left',
    disablePadding: false,
    label: 'Departement',
    sort: true
  }, {
    id: 'departement',
    align: 'left',
    disablePadding: false,
    label: 'Departement',
    sort: true
  }, {
    id: 'site',
    align: 'left',
    disablePadding: false,
    label: 'Site',
    sort: true
  }, {
    id: 'entreprise',
    align: 'left',
    disablePadding: false,
    label: 'Entreprise',
    sort: true
  },
]




function CollaborateurTableHeader() {
  const { selectColladId } = props;
  const numSelected = selectColladId.length;

  const [selectedCollabMenu, setSelectedCollabMenu] = useState(null);

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };


  function openSelectedCollabMenu(event) {
    setSelectedCollabMenu(event.currentTarget);
  }

  function closeSelectedCollabMenu() {
    setSelectedCollabMenu(null);
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
          />
          {numSelected > 0 && (
            <Box className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
              sx={{
                background: (theme) => theme.palette.background.default,
              }}>
              <IconButton
                aria-owns={selectedDirectionIds ? 'selectedDepaertementMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedDepartementMenu}
                size="large"
              >
                <FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon>
              </IconButton>
              <Menu
                id="selectedProductsMenu"
                anchorEl={selectedCollabMenu}
                open={Boolean(openSelectedCollabMenu)}
                onClose={closeSelectedCollabMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      dispatch(removeProducts(selectedDirectionIds));
                      props.onMenuItemClick();
                      closeSelectedDepartementMenu();
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

export default CollaborateurTableHeader