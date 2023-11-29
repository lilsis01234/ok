import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import { useThemeMediaQuery } from '@fuse/hooks'
import React from 'react'
import RoleHierarchiqueListHeader from './RoleHierarchiqueListHeader'
import RoleHierarchiqueListTable from './RoleHierarchiqueListTable'

function GererRoleHierarchique() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  return (
    <FusePageCarded
      header = {<RoleHierarchiqueListHeader/>}
      content = {<RoleHierarchiqueListTable/>}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default GererRoleHierarchique
