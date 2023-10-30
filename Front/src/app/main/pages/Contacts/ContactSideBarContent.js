import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon'
import NavLinkAdapter from '@fuse/core/NavLinkAdapter/NavLinkAdapter'
import { IconButton } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

function ContactSideBarContent() {
  return (
    <div className="flex flex-col flex-auto">
      <IconButton
        className="absolute top-0 right-0 my-16 mx-32 z-10"
        sx={{ color: 'white' }}
        component = {NavLinkAdapter}
        to="/collaborateurs/all"
        size="large"
      >                                                     
        <FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
      </IconButton>
      <Outlet/>
    </div>
  )
}

export default ContactSideBarContent
