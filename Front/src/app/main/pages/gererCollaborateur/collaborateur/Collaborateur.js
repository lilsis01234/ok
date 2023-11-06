import FusePageCarded from '@fuse/core/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import React from 'react'
import CollaborateurHeader from './CollaborateurHeader'
import CollaborateurTable from './CollaborateurTable'

function Collaborateur() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  return (
    <FusePageCarded
        header = {<CollaborateurHeader/>}
        content = {<CollaborateurTable/>}
        scroll={isMobile ? 'normal' : 'content'}
   />
  )
}

export default Collaborateur