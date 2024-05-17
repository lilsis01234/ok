import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';

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
    id: 'nombre_reactions',
    align: 'right',
    disablePadding: false,
    label: "Reaction",
    sort: true,
  },
  {
    id: 'nombre_commentaires',
    align: 'right',  
    disablePadding: false,
    label: 'Commentaire',
    sort: true,
  },
  {
    id: 'date_publication',
    align: 'right',
    disablePadding: false,
    label: 'Date',
    sort: true,
  },
  {
    id: 'etat',
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



function ActualitiesTableHead(props) {


  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };



  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {/* <TableCell
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? lighten(theme.palette.background.default, 0.4)
                : lighten(theme.palette.background.default, 0.02),
          }}
          padding="none"
          className="w-40 md:w-64 text-center z-99"
        >
          <Checkbox />
        </TableCell> */}
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
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default ActualitiesTableHead;
