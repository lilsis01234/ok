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
            element : <Collaborateur/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, {
            path : 'manage/collaborator/:collaborateurId',
            element : <CollaborateurListItem/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, {
            path : 'manage/collaborator/archive/:collaborateurId',
            element : <ArchiveCollaborateurForm/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, {
            path : 'manage/archive/collaborateur',
            element : <ListeArchiveCollaborateur/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, {
            path : 'manage/archive/collaborateur/:collaborateurId',
            element : <ListArchiveCollaborateurItem/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }
    ]
}

export default GererCollaborateurConfig