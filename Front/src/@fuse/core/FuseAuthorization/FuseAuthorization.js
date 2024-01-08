import FuseUtils from '@fuse/utils';
import AppContext from 'app/AppContext';  //Pour partager les données entre différents composants sans passer dans des props
import { Component } from 'react';
import { matchRoutes, useNavigate } from 'react-router-dom';
import withRouter from '@fuse/core/withRouter'; //Composant HOC
import history from '@history';
import {
  getSessionRedirectUrl,
  setSessionRedirectUrl,
  resetSessionRedirectUrl,
} from '@fuse/core/FuseAuthorization/sessionRedirectUrl';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';

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

  // }


  static getDerivedStateFromProps(props, state) {
    const { location, userRole, userRoleHierarchique, userPermission } = props
    const { pathname, history} = location;

    const isUserLoggedIn = userRole ? true : false;


    const matchedRoutes = matchRoutes(state.routes, pathname);
    const matched = matchedRoutes ? matchedRoutes[0] : false

    console.log(matchedRoutes)
    console.log(matched)

    const userHasPermission =  matched && FuseUtils.hasPermission(
      matched?.route?.auth,
      userRole,
      userRoleHierarchique,
      userPermission
    )

    console.log(userHasPermission)
    const ignoredPaths = ['/', '/callback', '/sign-in', '/sign-out', '/logout', '/404', '/authentification/motdepasseOublie'];
    const resetPasswordRegex = /^\/authentification\/resetPassword\/\w+$/;

    // if (matched && !userHasPermission && !ignoredPaths.includes(pathname)) {
    //   setSessionRedirectUrl(pathname);
    // }$

    // if (pathname === '/sign-in' && isUserLoggedIn){
    //   window.location.href = '/acceuil';
    //   // history.push('/acceuil')
    //   return { accessGranted: false };
    // } 


    if (ignoredPaths.includes(pathname)) {
      return { accessGranted: true };
    } 

    if (resetPasswordRegex.test(pathname) ) {
      return { accessGranted: true };
    }




    if (matched && !userHasPermission && !ignoredPaths.includes(pathname)) {
      setSessionRedirectUrl(pathname);
      // this.setState({ accessGranted: false });
      return { accessGranted: false };
    } 
    else {
      // this.setState({ accessGranted: true });
      // return { accessGranted: true };
     
      return {
        accessGranted: matched ? userHasPermission : true,
      };
    }

  

     

    // return {
    //   accessGranted: matched ? userHasPermission : true,
    // };

  }

  redirectRoute() {
    const { userRole } = this.props;
    const redirectUrl = getSessionRedirectUrl() || this.props.loginRedirectUrl;

    /*
        User is guest
        Redirect to Login Page
        */
    // if (!userRole || userRole.length === 0 || !userRoleHierarchique || userRoleHierarchique.length === 0) {
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
