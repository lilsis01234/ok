import { Navigate } from 'react-router-dom';
import DirectionApp from './DirectionApp';
import DirectionPage from './DirectionPage/DirectionPage';


const DirectionAppConfig =  {
    settings : {
        layout : {}
    },
    routes : [
        {
            path : '/business/direction/all', 
            element : <DirectionApp/>,
        }, 
        {
            path : '/business/direction/:id',
            element : <DirectionPage/>
        }
    ]
}

export default DirectionAppConfig;