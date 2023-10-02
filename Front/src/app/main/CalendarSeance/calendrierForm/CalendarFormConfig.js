import {lazy} from 'react'; 

const CalendarForm = lazy(() => import('./CalendarForm'))

const CalendarFormConfig = {
    routes: [
                {
                    path: 'dashboards/addSeance',
                    element: <CalendarForm />,
                },
            ],
};

export default CalendarFormConfig;