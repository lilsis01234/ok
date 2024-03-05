import {lazy} from 'react'; 

const CalendarTraining = lazy(() => import('./calendrierAff/CalendarDisplay'))

const CalendarConfig = {
    routes: [
                {
                    path: 'dashboards/calendarseance',
                    element: <CalendarTraining />,
                    auth: {
                        role: ['SuperAdmin', 'User', 'Admin','Coatch', 'Formateur'],
                    },
                },
            ],
};

export default CalendarConfig;