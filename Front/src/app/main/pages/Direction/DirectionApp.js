import FusePageSimple from '@fuse/core/FusePageSimple/FusePageSimple'
import React, {useRef} from 'react'
import DirectionList from './DirectionList'
import { styled } from '@mui/material'

const Root = styled(FusePageSimple)(({theme}) => ({
    '& .FusePageSimple-header' : {
        backgroundColor : theme.palette.background.paper,
    },
}))




const DirectionApp = () => {
  const pageLayout = useRef(null);
  return (
    <Root
        content =  {<DirectionList/>}
        ref={pageLayout}
    />
  )
}

export default DirectionApp
