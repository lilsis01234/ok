import React from 'react'
import AccountSetting from './AccountSetting'
import UpdatePassword from './UpdatePassword'
import UpdateProfile from './UpdateProfile'


const AccountSettingsConfig = {
    settings : {
        layout : {}
    }, 
    routes : [
        {
            path : 'settings/account',
            element : <AccountSetting/>,
            auth: {
                role: ['SuperAdmin', 'Admin', 'User'],
              },
        }, {
            path : 'setting/account/password',
            element : <UpdatePassword/>,
            auth: {
                role: ['SuperAdmin', 'Admin', 'User'],
              },
        }, {
            path : 'settings/account/profile',
            element : <UpdateProfile/>,
            auth: {
                role: ['SuperAdmin', 'Admin', 'User'],
              },
        }
    ]
}

export default AccountSettingsConfig
