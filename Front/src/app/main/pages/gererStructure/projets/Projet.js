import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import React from 'react'
import ProjetHeader from './ProjetHeader'
import ProjetTable from './ProjetTable'

function Projet() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  return (
        <FusePageCarded
            header = {<ProjetHeader/>}
            content = {<ProjetTable/>}
            scroll={isMobile ? 'normal' : 'content'}
        />
  )
}

export default Projet
