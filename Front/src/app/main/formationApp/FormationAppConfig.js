import DemandeFormationFormApp from "./DemandeFormation/DemandeFormationForm/DemandeFormationFormApp";
import DemandeFormationList from "./DemandeFormation/DemandeFormationList/DemandeFormationList";
import MesDemandeFormationList from "./DemandeFormation/DemandeFormationList/MesDemandeFormationList";

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
            path : 'formation/mesdemandes',
            element : <MesDemandeFormationList/>,
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