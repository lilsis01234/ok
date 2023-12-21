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
                },
                {
                    path: 'dashboards/demandeFormation',
                    element: <DemandeFormations />,
                },
                {
                    path: 'admin/formation/:id',
                    element: <VoirPlusFormation />,
                },
                {
                    path:'formateur/addFormation',
                    element: <AjoutFormation/>
                },
                {
                    path:'/addSeance/:id',
                    element:<CalendarForm/>
                },
                {
                    path:'/addModule/:id',
                    element:<AjoutModule/>
                },
                {
                    path:'formation/addModule',
                    element: <AjoutModule/>
                },
                {
                    path:'/discussion/formation/:id',
                    element:<Discussions/>
                },
                {
                    path:'/addDiscussion/:id',
                    element:<AddDiscussion/>
                },
                {
                    path:'/voirPlus/demande/:id',
                    element:<VoirPlusDemande/>
                },
                {
                    path:'/mesFormations',
                    element:<MesFormations/>
                },
            ],
};

export default FormationConfig;