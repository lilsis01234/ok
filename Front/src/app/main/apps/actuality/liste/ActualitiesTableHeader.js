import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { CheckBox } from '@mui/icons-material';
import { Box, IconButton, Menu, TableCell, TableHead, TableRow, Tooltip, TableSortLabel, lighten} from '@mui/material';
import React, { useState } from 'react'


const rows = [
    {
      id: 'titre',
      align: 'left',
      disablePadding: false,
      label: 'Titre',
      sort: true,
    },
    {
      id: 'auteur',
      align: 'left',
      disablePadding: false,
      label: 'Auteur',
      sort: true,
    },
    {
      id: 'categorie',
      align: 'right',
      disablePadding: false,
      label: 'Categorie',
      sort: true,
    },
    {
      id: 'type',
      align: 'right',
      disablePadding: false,
      label: 'Type',
      sort: true,
    },
    {
      id: 'reaction',
      align: 'right',
      disablePadding: false,
      label: "Reaction",
      sort: true,
    },
    {
      id: 'comment',
      align: 'right',  
      disablePadding: false,
      label: 'Commentaire',
      sort: true,
    },
    {
      id: 'date',
      align: 'right',
      disablePadding: false,
      label: 'Date',
      sort: true,
    },
    {
      id: 'publie',
      align: 'right',
      disablePadding: false,
      label: 'Publié',
      sort: true,
    },
    {
      id: 'visibilite',
      align: 'right',
      disablePadding: false,
      label: 'Visibilité',
      sort: true,
    }
  ];
  



function CollaborateurTableHeader(props) {
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