import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import React from 'react'
import DirectionHeader from './DirectionHeader'
import DirectionTable from './DirectionTable'

function Direction() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  return (
   <FusePageCarded
        header = {<DirectionHeader/>}
        content = {<DirectionTable/>}
        scroll={isMobile ? 'normal' : 'content'}
   />
  )
}

export default Direction
