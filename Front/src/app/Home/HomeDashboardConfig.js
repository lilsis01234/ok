import {lazy} from 'react'; 

const Dashboard = lazy(() => import('./Dashboard'))

const HomeDashboardConfig = {
    settings: {
        layout: {
          config: {},
        },
    },
    routes : [
        {
            path : '/acceuil',
            element : <Dashboard/>
        }
    ]
}

export default HomeDashboardConfig;