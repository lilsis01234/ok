import EntrepriseStructure from "./EntrepriseStructure";
import DepartementItem from "./departement/DepartementItem";
import EquipeItem from "./equipe/EquipeItem";
import ProjectItem from "./projet/ProjectItem";

const EntrepriseStrucutureConfig = {
    settings : {
        layout : {}
    }, 
    routes : [
        {
            path : 'entreprise/structure',
            element : <EntrepriseStructure/>
        }, {
            path : 'entreprise/structure/:departementId',
            element : <DepartementItem/>
        }, {
            path : 'entreprise/structure/:departementId/:projectId',
            element : <ProjectItem/>
        }, {
            path : 'entreprise/structure/:departementId/:projectId/:equipeId',
            element : <EquipeItem/>
        }
    ]
}

export default EntrepriseStrucutureConfig;