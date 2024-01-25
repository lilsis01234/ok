import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';

const rows = [
  {
    id: 'auteur',
    align: 'left',
    disablePadding: false,
    label: 'Auteur',
    sort: true,
  },
  {
    id: 'commentaire',
    align: 'left',
    disablePadding: false,
    label: 'commentaire',
    sort: true,
  },
  {
    id: 'actuality',
    align: 'left',
    disablePadding: false,
    label: 'actualité',
    sort: true,
  },
  {
    id: 'date',
    align: 'right',
    disablePadding: false,
    label: 'date',
    sort: true,
  },
  {
    id: 'approuver',
    align: 'right',
    disablePadding: false,
    label: 'approuver',
    sort: true,
  },
  {
    id: 'supprimer',
    align: 'right',
    disablePadding: false,
    label: 'supprimer',
    sort: true,
  }
];

function CommentTableHead() {
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

export default CommentTableHead;
