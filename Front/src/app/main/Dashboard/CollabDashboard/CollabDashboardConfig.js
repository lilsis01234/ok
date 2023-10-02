import {lazy} from 'react'; 

const CollabDashboard = lazy(() => import('./CollabDashboard'))

const CollabDashboardConfig = {
    settings: {
        layout: {
          config: {},
        },
    },
    routes : [
        {
            path : 'dashboards/collaborateur',
            element : <CollabDashboard/>
        }
    ]
}

export default CollabDashboardConfig;