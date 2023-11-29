import PermissionListItem from "./Permission/PermissionListItem";

const { default: GererPermission } = require("./GererPermission");

const GererPermissionConfig = {
    settings : {
        layout : {}
    }, 
    routes : [
        {
            path : 'manage/permission',
            element : <GererPermission/>
        }, {
            path : 'manage/permission/:permissionId',
            element : <PermissionListItem/>
        }
    ]
}

export default GererPermissionConfig;