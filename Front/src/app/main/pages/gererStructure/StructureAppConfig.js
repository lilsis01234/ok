import  {lazy} from 'react';
import DirectionListItem from './direction/DirectionItem/DirectionListItem';
import Departement from './departement/Departement';
import DepartementListItem from './departement/DepartementItem/DepartementListItem';
import Poste from './poste/Poste';


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
            path : 'business/manage/job',
            element : <Poste/>
        }
    ]
}

export default StructureAppConfig;