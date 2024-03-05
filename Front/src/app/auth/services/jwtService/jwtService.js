import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import jwtServiceConfig from './jwtServiceConfig';
import { useNavigate } from 'react-router-dom';


/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {

  

  init() {
   this.setInterceptors();
    this.handleAuthentication();
  }


  

  //Methode pour vérifier si l'utilisateur est connecté
  setInterceptors = () => {
    axios.defaults.withCredentials = true;
     axios.interceptors.response.use(
       (response) => {
      return response;
      },
      (err) => {
         return new Promise((resolve, reject) => {
          if (err.response && err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
           // if you ever get an unauthorized response, logout the user
             this.emit('onAutoLogout', 'Invalid access_token');
           this.setSession(null);
         }
          throw err;
        });
       }
    );
   };

  //Pour vérifier le token de l'utilisateur
  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      localStorage.clear();
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  // createUser = (data) => {
  //   return new Promise((resolve, reject) => {
  //     axios.post(jwtServiceConfig.signUp, data).then((response) => {
  //       if (response.data.user) {
  //         this.setSession(response.data.access_token);
  //         resolve(response.data.user);
  //         this.emit('onLogin', response.data.user);
  //       } else {
  //         reject(response.data.error);
  //       }
  //     });
  //   });
  // };

  //Pour se connecter 
  signInWithEmailAndPassword = async (email, password) => {
    const formData = {
      email : email,
      password : password
    }
    return axios
        .post(jwtServiceConfig.login, formData)
        .then((response) => {
          if (response.data) {
            this.setSession(response.data.token);
            localStorage.setItem('jwt_refresh_token', response.data.refresh_token);
            this.emit('onLogin', response.data.compte);
            return response.data.compte
          } else {
            console.error(response.data.error)
          }
        })
        .catch((error) => {
          this.logout();
          console.error(error)
          return (new Error('Echec de connexion avec le token.'));
        });

  };

  signInWithToken = async () => {
      const data = {
        acess_token : this.getAccessToken(),
        refresh_token : this.getRefreshToken()
      }
      return axios
        .post(jwtServiceConfig.accessToken, data)
        .then((response) => {
          // console.log(response.data)
          if (response.data.compte) {
            this.setSession(response.data.token);
            localStorage.setItem('jwt_refresh_token', response.data.refresh_token);
            // console.log('Connexion à partir du token réussie')
          } else {
            this.logout();
            return (new Error('Failed to login with token.'));
          }
        })
        .catch((error) => {
          this.logout();
          console.error(error)
          return (new Error('Echec de connexion avec le token.'));
        });
  
  };

  updateUserData = (user) => {
    return axios.put(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    localStorage.removeItem('jwt_refresh_token');
    this.emit('onLogout', 'Logged out')
    localStorage.clear();
    window.location.reload();
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      this.logout()
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };

  getRefreshToken = () => {
    return window.localStorage.getItem('jwt_refresh_token');
  };


}

const instance = new JwtService();

export default instance;
