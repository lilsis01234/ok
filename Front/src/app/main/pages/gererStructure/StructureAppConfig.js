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


const Direction = lazy(() => import('./direction/Direction'))

const StructureAppConfig  = {
    settings : {
        layout : {}
    },
    routes : [
        {
            path : 'business/manage/direction',
            element : <Direction/>
        }, 
        {
            path : 'business/manage/direction/:directionId',
            element : <DirectionListItem/>
        }, {
            path : 'business/manage/departement',
            element : <Departement/>
        }, {
            path : 'business/manage/departement/:departementId',
            element : <DepartementListItem/>
        }, {
            path : 'business/manage/Fonction',
            element : <Poste/>
        }, {
            path : 'business/manage/Fonction/:posteId',
            element : <PosteListeItem/>
        }, {
            path : 'business/manage/project',
            element : <Projet/>
        }, {
            path : 'business/manage/project/:projectId',
            element : <ProjetItemList/>
        }, {
            path : 'business/manage/team',
            element : <Equipe/>
        }, {
            path : 'business/manage/team/:equipeId',
            element : <EquipeItemList/>
        }
    ]
}

export default StructureAppConfig;