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
        id: 'date de Débauche',
        align: 'left',
        disablePadding: false,
        label: 'Date de Débauche',
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
        label: 'Département',
        sort: true
    }, {
        id: 'projet',
        align: 'left',
        disablePadding: false,
        label: 'Projet',
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

function ListeArchiveCollaborateurTableHeader(props) {
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

export default ListeArchiveCollaborateurTableHeader
