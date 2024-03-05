import {lazy} from 'react'; 

const Formations = lazy(() => import('./Formations'))
const DemandeFormations = lazy(()=>import('../demandeDeFormation/demandeFormation'))
const VoirPlusFormation = lazy(()=>import('../VoirPlus/VoirPlusFormation'))
const AjoutFormation = lazy(()=>import('../../FormationUser/Formateur/AjoutFormation/AjoutFormations'))
const AjoutModule = lazy(()=>import('../../FormationUser/Formateur/AjoutModule/AjoutModule'))
const CalendarForm = lazy(() => import('../../CalendarSeance/calendrierForm/CalendarForm'))
const Discussions = lazy(()=>import('../discussionFormation/discussionFormation'))
const AddDiscussion= lazy(()=>import('../discussionFormation/ajoutDiscussion'))
const VoirPlusDemande = lazy(()=>import('../demandeDeFormation/VoirPlusDemandeFormation'))
const MesFormations = lazy(()=>import('../MesFormations/MesFormations'))
const MesDemandes = lazy(()=>import('../MesDemandes/MesDemandes'))

const FormationConfig = {
    routes: [
                {
                    path: 'dashboards/listeFormation',
                    element: <Formations />,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                },
                {
                    path: 'dashboards/demandeFormation',
                    element: <DemandeFormations />,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                },
                {
                    path: 'admin/formation/:id',
                    element: <VoirPlusFormation />,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                },
                {
                    path:'formateur/addFormation',
                    element: <AjoutFormation/>,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                },
                {
                    path:'/addSeance/:id',
                    element:<CalendarForm/>,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                },
                {
                    path:'/addModule/:id',
                    element:<AjoutModule/>,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                },
                {
                    path:'formation/addModule',
                    element: <AjoutModule/>,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                },
                {
                    path:'/discussion/formation/:id',
                    element:<Discussions/>,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                },
                {
                    path:'/addDiscussion/:id',
                    element:<AddDiscussion/>,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                },
                {
                    path:'/voirPlus/demande/:id',
                    element:<VoirPlusDemande/>,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                },
                {
                    path:'/mesFormations',
                    element:<MesFormations/>,
                    auth: {
                        role: ['SuperAdmin', 'Admin', 'User'],
                    },
                },
            ],
};

export default FormationConfig;