// import axios from 'axios';
//Si on utilise des cookies 
import Cookies from 'js-cookie';

//Création d'une fonction utilitaire pour ajouter le JWT à l'en-tête de chaque demande
//Si on utilise LocalStorage
// export function setAuthToken(token){
//     if(token){
//         axios.defaults.headers.common['Authorization'] = token;
//     } else {
//         delete axios.defaults.headers.common['Authorization'];
//     }
// }

//Si on utilise des cookies securisés
export function setAuthToken(token){
    Cookies.set('jwt', token, {secure : true, sameSite: 'strict'})
}


//Si on utilise LocalStorage
// export function clearAuthToken(){
//     localStorage.removeItem('jwt');
//     setAuthToken(null);
// }

//Si on utilise des cookies securisées
export function clearAuthToken(){
    Cookies.remove('jwt');
}