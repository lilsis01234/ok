import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import React from 'react'
import EquipeHeader from './EquipeHeader'
import EquipeTable from './EquipeTable'

function Equipe() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  return (
    <FusePageCarded
        header = {<EquipeHeader/>}
        content = {<EquipeTable/>}
        scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default Equipe
