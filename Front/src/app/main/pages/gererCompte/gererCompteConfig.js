import CompteCollaborateurItem from "./CompteItem/CompteCollaborateurItem";

const { default: CompteCollaborateur } = require("./CompteCollaborateur");

const GererCompteConfig = {
    settings : {
        layout : {}
    }, 
    routes : [
        {
            path : 'manage/account',
            element : <CompteCollaborateur/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, {
            path : 'manage/account/:accoundId',
            element : <CompteCollaborateurItem/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }
    ]
}

export default GererCompteConfig;