import {lazy} from 'react'; 

const CalendarForm = lazy(() => import('./CalendarForm'))
const AjoutDemandeFormation = lazy(()=>import('../../FormationUser/AjoutDemandeFormation/AjoutDemandeFormation'))
const CalendarFormConfig = {
    routes: [
                // {
                //     path: 'dashboards/addSeance',
                //     element: <CalendarForm />,
                // },
                {
                    path:'/dashboards/addSeance/:id',
                    element:<CalendarForm/>
                },
                {
                    path:'/dashboards/addDemandeFormation',
                    element:<AjoutDemandeFormation/>
                }
            ],
};

export default CalendarFormConfig;