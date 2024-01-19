import CollaborateurProfile from "./CollaborateurProfile/CollaborateurProfile";

const { default: Collaborateur } = require("./Collaborateur");

const CollaborateurAppConfig = {
    settings : {
        layout : {}
    },
    routes : [
        {
            path : 'collaborateurs/all',
            element : <Collaborateur/>,
            auth: {
                role: ['SuperAdmin', 'Admin', 'User'],
              },
        }, {
            path : 'collaborateurs/all/:collaborateurId',
            element : <CollaborateurProfile/>,
            auth: {
                role: ['SuperAdmin', 'Admin', 'User'],
              },
        }
    ]
}

export default CollaborateurAppConfig;