import React from 'react'
import CollaborateurData from './CollaborateurData/CollaborateurData'
import EntrepriseData from './EntrepriseData/EntrepriseData'

const ImportDataPageConfig =  {
    settings : {
        layout : {}
    }, 
    routes : [
        {
            path : 'import-data/collaborateurs',
            element : <CollaborateurData/>,
            auth: {
                role: ['SuperAdmin'],
              },
        }, {
            path : 'import-data/entreprise',
            element : <EntrepriseData/>,
            auth: {
                role: ['SuperAdmin'],
              },
        }
    ]
}

export default ImportDataPageConfig
