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
        }, {
            path : 'collaborateurs/all/:collaborateurId',
            element : <CollaborateurProfile/>
        }
    ]
}

export default CollaborateurAppConfig;