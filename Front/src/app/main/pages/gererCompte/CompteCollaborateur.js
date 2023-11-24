import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import React from 'react'
import CompteCollaborateurHeader from './CompteCollaborateurHeader'
import CompteCollaborateurTable from './CompteCollaborateurTable'

function CompteCollaborateur() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  return (
    <FusePageCarded
        header = {<CompteCollaborateurHeader/>}
        content = {<CompteCollaborateurTable/>}
        scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default CompteCollaborateur
