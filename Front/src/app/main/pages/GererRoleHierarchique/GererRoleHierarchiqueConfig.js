import RoleHierarchiqueItem from "./RoleHierarchiqueItem/RoleHierarchiqueItem";

const { default: GererRoleHierarchique } = require("./GererRoleHierarchique");

const GererRoleHierarchiqueConfig = {
    settings : {
        layout : {}
    }, 
    routes : [
        {
            path : 'manage/role',
            element : <GererRoleHierarchique/>,
            auth: {
                role: ['SuperAdmin']
              },
        }, {
            path : 'manage/role/:roleId',
            element : <RoleHierarchiqueItem/>,
            auth: {
                role: ['SuperAdmin']
              },
        }
    ]
}

export default GererRoleHierarchiqueConfig