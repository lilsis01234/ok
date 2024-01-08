import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import React from 'react'
import SiteHeader from './SiteHeader'
import SiteTable from './SiteTable'


function Site() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

    return (
        <FusePageCarded
            header = {<SiteHeader/>}
            content = {<SiteTable/>}
            scroll={isMobile ? 'normal' : 'content'}
        />
    )
}

export default Site
