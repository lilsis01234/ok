import DemandeFormationFormApp from "./DemandeFormation/DemandeFormationForm/DemandeFormationFormApp";

const { default: AddFormationApp } = require("./Formation/AddFormationApp");

const FormationAppConfig = {
    settings : {
        layout : {}
    }, 
    routes : [
        {
            path : 'formation/demande/:idDemande',
            element : <DemandeFormationFormApp/>,
            auth : {
                role : ['SuperAdmin', 'Admin', 'User']
            }, 
        },
        {
            path : 'formation/add',
            element : <AddFormationApp/>,
            auth : {
                role : ['SuperAdmin', 'Admin']
            }, 
        }
    ]
}

export default FormationAppConfig;