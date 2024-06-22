import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import ExampleConfig from '../main/example/ExampleConfig';
import dashboardsConfigs from '../Dashboard/dashboardsConfig';


//ModuleProfile
import ContactConfig from '../main/pages/Contacts/ContactAppConfig';
import StructureAppConfig from '../main/pages/gererStructure/StructureAppConfig';
import DirectionConfig from '../main/pages/Direction/DirectionConfig';
import EntrepriseStrucutureConfig from '../main/pages/EntrepriseStructure/EntrepriseStructureConfig';


//Module Formation
import CalendarConfig from '../main/CalendarSeance/CalendarSeanceConfig';
import CalendarFormConfig from '../main/CalendarSeance/calendrierForm/CalendarFormConfig';
import FormationConfig from '../main/FormationAdmin/ListeFormations/FormationConfig';
import GererCollaborateurConfig from '../main/pages/gererCollaborateur/GererCollaborateurConfig';
import CongeConfig from '../main/CalendarCongé/CongéConfig';

import FormationAppConfig from '../main/formationApp/FormationAppConfig';

//Module d'actualité
import appsConfigs from '../main/apps/appsConfigs';

//pour la gestion de comptes
import GererCompteConfig from '../main/pages/gererCompte/gererCompteConfig';
import GererRoleHierarchiqueConfig from '../main/pages/GererRoleHierarchique/GererRoleHierarchiqueConfig';
import GererPermissionConfig from '../main/pages/GererPermission/GererPermissionConfig';
import CollaborateurAppConfig from '../main/pages/Collaborateur/CollaborateurAppConfig';
import ForgotPasswordPagesConfig from '../main/forgotPassword/ForgotPasswordPagesConfig';
import ResetPasswordPageConfig from '../main/resetPassword/ResetPasswordPageConfig';
import AccountSettingsConfig from '../main/accountSettings/AccountSettingConfig';
import ProfileConfig from '../main/Profile/ProfileConfig';
import ImportDataPageConfig from '../main/pages/ImportData/ImportDataPageConfig';
import AgendaAppConfig from '../main/Agenda/AgendaAppConfig';
import SeanceAppConfig from '../main/Formation/Seance/SeanceAppConfig';



const routeConfigs = [
  ExampleConfig, SignOutConfig, SignInConfig, SignUpConfig, 
  ... dashboardsConfigs,CalendarConfig,CalendarFormConfig,FormationConfig,CongeConfig,
  AgendaAppConfig,
  SeanceAppConfig,
  FormationAppConfig,

  //Module Profil
  // ContactConfig,
  CollaborateurAppConfig,
  StructureAppConfig,
  GererCollaborateurConfig,
  GererCompteConfig,
  DirectionConfig,
  EntrepriseStrucutureConfig,
  ForgotPasswordPagesConfig,
  ResetPasswordPageConfig,
  AccountSettingsConfig,
  ProfileConfig,
  ImportDataPageConfig,
  //Gestion des Permission et des roles,
  GererPermissionConfig,
  GererRoleHierarchiqueConfig,
//Module d'actualité
  ...appsConfigs

];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/sign-in" />,
    // auth : settingsConfig.defaultAuth
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
