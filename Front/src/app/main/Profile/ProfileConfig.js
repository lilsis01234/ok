import React from 'react'
import Profile from './Profile'

const ProfileConfig = {
    settings : {
        layout : {}
    },
    routes : [
        {
            path : 'account/myprofile',
            element : <Profile/>,
            auth: {
                role: ['SuperAdmin', 'Admin', 'User'],
              },
        }
    ]
}

export default ProfileConfig
