import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const getRoleFromToken = () => {
    const token = Cookies.get('access_token');
    if (!token) {
        return null;
    }

    try {
        const decodedToken = jwtDecode(token);

        const userRole = decodedToken.role;

        return userRole;
    } catch (error){
        console.error('Erreur lors du décodage du jeton:', error);
        return error;
    }
}