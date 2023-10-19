import  {lazy} from 'react';
import DirectionListItem from './direction/DirectionItem/DirectionListItem';


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
        }
    ]
}

export default StructureAppConfig;