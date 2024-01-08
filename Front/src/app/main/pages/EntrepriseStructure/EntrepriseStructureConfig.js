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
            element : <EntrepriseStructure/>,
            auth: {
                role: ['SuperAdmin', 'Admin', 'User'],
              },
        }, {
            path : 'entreprise/structure/:departementId',
            element : <DepartementItem/>,
            auth: {
                role: ['SuperAdmin', 'Admin', 'User'],
              },
        }, {
            path : 'entreprise/structure/:departementId/:projectId',
            element : <ProjectItem/>,
            auth: {
                role: ['SuperAdmin', 'Admin', 'User'],
              },
        }, {
            path : 'entreprise/structure/:departementId/:projectId/:equipeId',
            element : <EquipeItem/>,
            auth: {
                role: ['SuperAdmin', 'Admin', 'User'],
              },
        }
    ]
}

export default EntrepriseStrucutureConfig;