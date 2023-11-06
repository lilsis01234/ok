import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import React from 'react'
import PosteHeader from './PosteHeader'
import PosteTable from './PosteTable'

function Poste() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg')) 
  return (
    <FusePageCarded 
        header = {<PosteHeader/>}
        content = {<PosteTable/>}
        scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default Poste
