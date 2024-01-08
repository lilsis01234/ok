import PermissionListItem from "./Permission/PermissionListItem";

const { default: GererPermission } = require("./GererPermission");

const GererPermissionConfig = {
    settings : {
        layout : {}
    }, 
    routes : [
        {
            path : 'manage/permission',
            element : <GererPermission/>,
            auth: {
                role: ['SuperAdmin'],
              },
        }, {
            path : 'manage/permission/:permissionId',
            element : <PermissionListItem/>,
            auth: {
                role: ['SuperAdmin'],
              },
        }
    ]
}

export default GererPermissionConfig;