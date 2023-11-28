import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import React from 'react'
import ListeArchiveCollaborateurHeader from './ListeArchiveCollaborateurHeader'
import ListeArchiveCollaborateurTable from './ListeArchiveCollaborateurTable'

function ListeArchiveCollaborateur() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  return (
   <FusePageCarded
        header = {<ListeArchiveCollaborateurHeader/>}
        content = {<ListeArchiveCollaborateurTable/>}
        scroll={isMobile ? 'normal' : 'content'}
   />
  )
}

export default ListeArchiveCollaborateur
