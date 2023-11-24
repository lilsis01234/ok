import Collaborateur from "./collaborateur/Collaborateur"
import CollaborateurListItem from "./collaborateur/CollaborateurItem/CollaborateurListItem"
import ArchiveCollaborateurForm from "./collaborateur/archiverCollaborateur/ArchiverCollaborateurForm"
import ListArchiveCollaborateurItem from "./collaborateur/archiverCollaborateur/ListArchiveCollaborateurItem"
import ListeArchiveCollaborateur from "./collaborateur/archiverCollaborateur/ListeArchiveCollaborateur"


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
        }, {
            path : 'manage/collaborator/archive/:collaborateurId',
            element : <ArchiveCollaborateurForm/>
        }, {
            path : 'manage/archive/collaborateur',
            element : <ListeArchiveCollaborateur/>
        }, {
            path : 'manage/archive/collaborateur/:collaborateurId',
            element : <ListArchiveCollaborateurItem/>
        }
    ]
}

export default GererCollaborateurConfig