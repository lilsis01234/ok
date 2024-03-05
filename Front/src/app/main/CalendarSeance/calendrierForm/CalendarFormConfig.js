import {lazy} from 'react'; 

const VoirPlusDiscussion = lazy(() => import('../../FormationAdmin/discussionFormation/voirPlusDiscussion'))
const CalendarForm = lazy(() => import('./CalendarForm'))
const AjoutDemandeFormation = lazy(()=>import('../../FormationUser/AjoutDemandeFormation/AjoutDemandeFormation'))
const AjoutCommentaire = lazy(()=>import('../../FormationAdmin/commentaireFormation/commentaireFormation'))
const AppelVideo = lazy(()=>import('../../FormationAdmin/visioConference/VisioConference'))
const CalendarFormConfig = {
    routes: [
                // {
                //     path: 'dashboards/addSeance',
                //     element: <CalendarForm />,
                // },
                {
                    path:'/dashboards/addSeance/:id',
                    element:<CalendarForm/>,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                },
                {
                    path:'/dashboards/addDemandeFormation',
                    element:<AjoutDemandeFormation/>,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                },
                {
                    path:'/repondre/:id',
                    element:<AjoutCommentaire/>,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                },
                {
                    path:'/voirPlus/:id',
                    element:<VoirPlusDiscussion/>,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                },
                {
                    path:'/appelVideo/:id',
                    element:<AppelVideo/>,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                }
            ],
};

export default CalendarFormConfig;