import CompteCollaborateurItem from "./CompteItem/CompteCollaborateurItem";

const { default: CompteCollaborateur } = require("./CompteCollaborateur");

const GererCompteConfig = {
    settings : {
        layout : {}
    }, 
    routes : [
        {
            path : 'manage/account',
            element : <CompteCollaborateur/>
        }, {
            path : 'manage/account/:accoundId',
            element : <CompteCollaborateurItem/>
        }
    ]
}

export default GererCompteConfig;