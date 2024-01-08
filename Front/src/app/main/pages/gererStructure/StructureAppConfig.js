import  {lazy} from 'react';
import DirectionListItem from './direction/DirectionItem/DirectionListItem';
import Departement from './departement/Departement';
import DepartementListItem from './departement/DepartementItem/DepartementListItem';
import Poste from './poste/Poste';
import PosteListeItem from './poste/PosteItem/PosteListeItem';
import Projet from './projets/Projet';
import ProjetItemList from './projets/projetItem/ProjetItemList';
import Equipe from './equipe/Equipe';
import EquipeItemList from './equipe/equipeItem/EquipeItemList';
import Site from './site/Site';
import SiteItemListe from './site/SiteItem/SiteItemListe';


const Direction = lazy(() => import('./direction/Direction'))

const StructureAppConfig  = {
    settings : {
        layout : {}
    },
    routes : [
        {
            path : 'business/manage/direction',
            element : <Direction/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, 
        {
            path : 'business/manage/direction/:directionId',
            element : <DirectionListItem/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, {
            path : 'business/manage/departement',
            element : <Departement/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, {
            path : 'business/manage/departement/:departementId',
            element : <DepartementListItem/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, {
            path : 'business/manage/Fonction',
            element : <Poste/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, {
            path : 'business/manage/Fonction/:posteId',
            element : <PosteListeItem/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, {
            path : 'business/manage/project',
            element : <Projet/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, {
            path : 'business/manage/project/:projectId',
            element : <ProjetItemList/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, {
            path : 'business/manage/team',
            element : <Equipe/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, {
            path : 'business/manage/team/:equipeId',
            element : <EquipeItemList/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, {
            path : 'business/manage/site',
            element : <Site/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }, {
            path : 'business/manage/site/:siteId',
            element : <SiteItemListe/>,
            auth: {
                role: ['SuperAdmin', 'Admin'],
              },
        }
    ]
}

export default StructureAppConfig;