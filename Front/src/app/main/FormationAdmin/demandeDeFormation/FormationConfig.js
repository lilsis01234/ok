import {lazy} from 'react'; 

const Formations = lazy(() => import('./Formations'))
const DemandeFormations = lazy(()=>import('./demandeFormation'))
const VoirPlusFormation = lazy(()=>import('../VoirPlus/VoirPlusFormation'))
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
            ],
};

export default FormationConfig;