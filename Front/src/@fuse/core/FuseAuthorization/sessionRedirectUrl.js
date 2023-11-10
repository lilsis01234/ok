const sessionStorageKey = 'fuseRedirectUrl';

//Récupérer l'URL de redirection 
export const getSessionRedirectUrl = () => {
  return window.sessionStorage.getItem(sessionStorageKey);
};

//Stocker une URL de redirection dans Sessions storage
export const setSessionRedirectUrl = (url) => {
  window.sessionStorage.setItem(sessionStorageKey, url);
};

//Supprimer L'url de redirection stocké dans session Storage
export const resetSessionRedirectUrl = (url) => {
  window.sessionStorage.removeItem(sessionStorageKey);
}; 
