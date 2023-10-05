import axios from 'axios';
import { createContext, useState, useContext, useEffect} from 'react';


const AuthContext = createContext();

export const recordUsageTime = () => {
    const lastUsageTime = new Date().toISOString()
    localStorage.setItem('lastUsageTime', lastUsageTime)
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const storedAccessToken = localStorage.getItem('token')
        if (storedAccessToken){
            setIsAuthenticated(true)
        }
    }, [])


    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:4000/api/auth/connect', {email, password})
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('refresh-token', response.data.refresh_token)
            recordUsageTime()
            setIsAuthenticated(true)
            setUser(response.data.compte)
        } catch (error) {
            console.error('Error loggin in:', error)
            throw error;
        }
    }

    const refreshAccessToken = async () => {
        try {
            const lastUsageTime = localStorage.getItem('lastUsageTime')
            if (lastUsageTime){
                const lastUsageTime = new Date(lastUsageTime)
                const elapsedTime = new Date().getTime() - lastUsageTime.getTime();
                const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000
                if (elapsedTime >= twelveHoursInMilliseconds){
                    const refresToken = localStorage.getItem('refreshToken');
                    const response = await axios.post('http://localhost:4000/api/auth/refresh-token', {refresToken});
                    if (response.status === 200){
                        const {accessToken} = response.data.token
                        localStorage.setItem('token', accessToken)
                        localStorage.settem('refresf-token',  response.data.refresh_token)
                    }
                    else {
                        logout()
                    }
                }
            }
           
        } catch (error){
            console.log(error)
        }
    }


    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, user, login, logout, refreshAccessToken}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext);
}
