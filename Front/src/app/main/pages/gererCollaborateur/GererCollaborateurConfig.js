import Collaborateur from "./collaborateur/Collaborateur"
import CollaborateurListItem from "./collaborateur/CollaborateurItem/CollaborateurListItem"

const GererCollaborateurConfig = {
    settings : {
        layout : {}
    }, 
    routes : [
        {
            path : 'manage/collaborator',
            element : <Collaborateur/>
        }, {
            path : 'manage/collaborator/:collaborateurId',
            element : <CollaborateurListItem/>
        }
    ]
}

export default GererCollaborateurConfig