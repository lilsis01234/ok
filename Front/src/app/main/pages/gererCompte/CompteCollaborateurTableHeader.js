import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip, lighten} from '@mui/material'
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
        label: 'Nom et prénoms',
        sort: true
    },
    {
        id: 'poste',
        align: 'left',
        disablePadding: false,
        label: 'Poste',
        sort: true
    }, {
        id: 'Département',
        align: 'left',
        disablePadding: false,
        label: 'Département',
        sort: true
    }, {
        id: 'email',
        align: 'left',
        disablePadding: false,
        label: 'Adresse e-mail',
        sort: true
    }, {
        id: 'Role Hierrachique',
        align: 'left',
        disablePadding: false,
        label: 'Rôle Hierarchique',
        sort: true
    }, {
        id: 'Role ',
        align: 'left',
        disablePadding: false,
        label: 'Rôle',
        sort: true
    },
]

function CompteCollaborateurTableHeader() {
    return (
        <TableHead>
            <TableRow>
                {rows.map((row) => (
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
                ))}
            </TableRow>
        </TableHead>
    )
}

export default CompteCollaborateurTableHeader
