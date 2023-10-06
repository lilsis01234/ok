import {lazy} from 'react'; 

const CalendarForm = lazy(() => import('./CalendarForm'))

const CalendarFormConfig = {
    routes: [
                {
                    path: 'dashboards/addSeance',
                    element: <CalendarForm />,
                },
                {
                    path:'/dashboards/addSeance/:id',
                    element:<CalendarForm/>
                }
            ],
};

export default CalendarFormConfig;