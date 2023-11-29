import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import React from 'react'
import PermissionListeHeader from './PermissionListeHeader'
import PermissionListeTable from './PermissionListeTable'

function GererPermission() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    return (
        <FusePageCarded
            header = {<PermissionListeHeader/>}
            content = {<PermissionListeTable/>}
            scroll={isMobile ? 'normal' : 'content'}
        />
    )
}

export default GererPermission
