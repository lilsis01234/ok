import React from 'react'
import AccountSetting from './AccountSetting'
import UpdatePassword from './UpdatePassword'


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
        }
    ]
}

export default AccountSettingsConfig
