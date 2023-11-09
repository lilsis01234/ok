import FuseUtils from '@fuse/utils';
import AppContext from 'app/AppContext';  //Pour partager les données entre différents composants sans passer dans des props
import { Component } from 'react';
import { matchRoutes } from 'react-router-dom';
import withRouter from '@fuse/core/withRouter'; //Composant HOC
import history from '@history';
import {
  getSessionRedirectUrl,
  setSessionRedirectUrl,
  resetSessionRedirectUrl,
} from '@fuse/core/FuseAuthorization/sessionRedirectUrl';

class FuseAuthorization extends Component {
  constructor(props, context) {
    super(props);
    const { routes } = context; //pour accéder aux données spécifiques partagés entre les composants 
    //Initialisation de l'état local du composant FuseAuthorization
    this.state = {
      accessGranted: true,  //accessGranted pour suivre l'accès des utilisateurs
      routes,
    };
  }

  componentDidMount() {  //Methode de cycke de React appelé après qu'un composant a été rendu et monté dans le DOM
    if (!this.state.accessGranted) {
      this.redirectRoute(); 
    }
  }

  shouldComponentUpdate(nextProps, nextState) {   //Methode de cycle de vie de React appelé la mise à jour du composant
    return nextState.accessGranted !== this.state.accessGranted;
  }

  componentDidUpdate() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  //Appeler chaque fois que prop change
  //Vérifie si l'utilisateur a la permission d'accéder à la route actuelle en utilisant les routes défines dans les routes et les roles utilisateurs 
  static getDerivedStateFromProps(props, state) { //state : état actuelle du composant
    const { location, userRole } = props; //extrait les location et les roles 
    const { pathname } = location;

    const matchedRoutes = matchRoutes(state.routes, pathname);  //faire correspondre le route de pathname avec celle de la state

    const matched = matchedRoutes ? matchedRoutes[0] : false;

    const userHasPermission = FuseUtils.hasPermission(matched.route.auth, userRole); //verifie l'authorisation de l'utilisateurs

    const ignoredPaths = ['/', '/callback', '/sign-in', '/sign-out', '/logout', '/404']; 

    if (matched && !userHasPermission && !ignoredPaths.includes(pathname)) {
      setSessionRedirectUrl(pathname);
    }

    return {
      accessGranted: matched ? userHasPermission : true,
    };
  }

  redirectRoute() {
    const { userRole } = this.props;
    const redirectUrl = getSessionRedirectUrl() || this.props.loginRedirectUrl;

    /*
        User is guest
        Redirect to Login Page
        */
    if (!userRole || userRole.length === 0) {
      setTimeout(() => history.push('/sign-in'), 0);
    } else {
      /*
        User is member
        User must be on unAuthorized page or just logged in
        Redirect to dashboard or loginRedirectUrl
        */
      setTimeout(() => history.push(redirectUrl), 0);

      resetSessionRedirectUrl();
    }
  }

  render() {
    // console.info('Fuse Authorization rendered', this.state.accessGranted);
    return this.state.accessGranted ? this.props.children : null;
  }
}

FuseAuthorization.contextType = AppContext;

export default withRouter(FuseAuthorization);
