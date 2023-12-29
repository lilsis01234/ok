import { fetchRoles, getRoles } from 'src/app/auth/authRoles';
import SignInPage from './SignInPage';
import settingsConfig from 'app/configs/settingsConfig';
// import authRoles from '../../auth/authRoles';

const roles = getRoles();


const SignInConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: 'sign-in',
      element: <SignInPage />,
      // auth: settingsConfig.defaultAuth
    },
  ],
};

export default SignInConfig;
