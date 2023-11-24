const { default: CompteCollaborateur } = require("./CompteCollaborateur");

const GererCompteConfig = {
    settings : {
        layout : {}
    }, 
    routes : [
        {
            path : 'manage/account',
            element : <CompteCollaborateur/>
        }
    ]
}

export default GererCompteConfig;