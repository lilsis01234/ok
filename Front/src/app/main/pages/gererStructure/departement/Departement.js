import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import React from 'react'
import DepartementHeader from './DepartementHeader'
import DepartementTable from './DepartementTable'

function Departement() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  return (
    <FusePageCarded 
        header = {<DepartementHeader/>}
        content = {<DepartementTable/>}
        scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default Departement
