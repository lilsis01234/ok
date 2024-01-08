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
                    element:<CalendarForm/>
                },
                {
                    path:'/dashboards/addDemandeFormation',
                    element:<AjoutDemandeFormation/>
                },
                {
                    path:'/repondre/:id',
                    element:<AjoutCommentaire/>
                },
                {
                    path:'/voirPlus/:id',
                    element:<VoirPlusDiscussion/>
                },
                {
                    path:'/appelVideo/:id',
                    element:<AppelVideo/>
                }
            ],
};

export default CalendarFormConfig;