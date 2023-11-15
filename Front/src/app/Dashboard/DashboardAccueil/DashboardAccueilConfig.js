import {lazy} from 'react'; 

const DashboardAccueil = lazy(() => import('./DashboardAccueil'))

const DashboardAccueilConfig = {
    settings: {
        layout: {
          config: {},
        },
    },
    routes : [
        {
            path : 'dashboards/accueil',
            element : <DashboardAccueil/>
        },
    ]
}

export default DashboardAccueilConfig;