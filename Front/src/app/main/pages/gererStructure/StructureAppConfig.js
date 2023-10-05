import  {lazy} from 'react';

const Direction = lazy(() => import('./direction/Direction'))

const StructureAppConfig  = {
    settings : {
        layout : {}
    },
    routes : [
        {
            path : 'business/manage/direction',
            element : <Direction/>
        }
    ]
}

export default StructureAppConfig;