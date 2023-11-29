import RoleHierarchiqueItem from "./RoleHierarchiqueItem/RoleHierarchiqueItem";

const { default: GererRoleHierarchique } = require("./GererRoleHierarchique");

const GererRoleHierarchiqueConfig = {
    settings : {
        layout : {}
    }, 
    routes : [
        {
            path : 'manage/role',
            element : <GererRoleHierarchique/>
        }, {
            path : 'manage/role/:roleId',
            element : <RoleHierarchiqueItem/>
        }
    ]
}

export default GererRoleHierarchiqueConfig