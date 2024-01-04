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
            element : <AccountSetting/>
        }, {
            path : 'setting/account/password',
            element : <UpdatePassword/>
        }, {
            path : 'settings/account/profile',
            element : <UpdateProfile/>
        }
    ]
}

export default AccountSettingsConfig
