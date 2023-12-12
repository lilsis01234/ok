import { lazy } from "react";

const AgendaCongeAccepted = lazy(()=>import('./CalendarCongé'));

const CongeConfig = {
    routes: [
                {
                    path: 'agenda/congeAccepte',
                    element: <AgendaCongeAccepted/>,
                }
            ]
}    

export default CongeConfig