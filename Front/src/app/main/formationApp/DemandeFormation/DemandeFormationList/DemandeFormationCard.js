import { Button, Card, CardActions, CardContent, Chip, Divider, Typography, lighten } from '@mui/material'
import React from 'react'
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import moment from 'moment';
import 'moment/locale/fr';
import { Link } from 'react-router-dom';

function DemandeFormationCard({ demande }) {
  if (!demande) {
    return null;
  }

  const formattedDate = moment(demande.createdAt).format('DD MMMM YYYY');


  return (
    <Card className="flex flex-col h-384 shadow">
      <CardContent className="flex flex-col flex-auto p-24">
        <div className={clsx('w-full', "")}>
          <div className="flex items-center justify-between mb-16">
            <Chip
              className="font-semibold text-12"
              label={demande.typeFormation}
              size="small"
            />
            {demande.approbation === true && (
              <FuseSvgIcon className="text-green-600" size={20}> heroicons-solid:badge-check</FuseSvgIcon>
            )}
          </div>

          <Typography className="text-16 font-medium">{demande.titre}</Typography>
          <Typography className="text-13 mt-2 line-clamp-2" color="text.secondary">{demande.details}</Typography>

          <Divider className="w-48 my-24 border-1" light />

          <Typography className="flex items-center space-x-6 text-13" color="text.secondary">
            <FuseSvgIcon color="disabled" size={20}>
              heroicons-solid:clock
            </FuseSvgIcon>
            <span className="whitespace-nowrap leading-none">{`Crée le ${formattedDate} `}</span>
          </Typography>
        </div>
      </CardContent>
      <CardActions
        className="items-center justify-end py-16 px-24"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? lighten(theme.palette.background.default, 0.4)
              : lighten(theme.palette.background.default, 0.03),
        }}
      >
        {demande.approbation === true ? (
          <Button
            to=""
            component={Link}
            className="px-16 min-w-128"
            color="secondary"
            variant="contained"
            endIcon={
              <FuseSvgIcon className="" size={20}>
                heroicons-solid:arrow-sm-right
              </FuseSvgIcon>
            }
          >
            Voir la formation associée
          </Button>
        ) : (
          <Button
            component={Link}
            className="px-16 min-w-128"
            color="secondary"
            variant="text"
          >
            En Attente de validation
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default DemandeFormationCard
