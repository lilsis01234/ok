import axios from "axios";

let userPermission = {}

export const getUserPermission = () => userPermission;


export const fetchUserPermission = async () => {

    
    try {
        const user = localStorage.getItem('user');
        const userConnected = JSON.parse(user)
        const id = userConnected.id

        const response = await axios.get(`http://localhost:4000/api/permission/user/${id}`)
        const permissionFromBackend = response.data;

        if(Array.isArray(permissionFromBackend)){
            const indexedPermission = permissionFromBackend.map((permission) => ({
                id : permission.permission,
                permission : permission.permissions
            }))

            userPermission = {
                ...userPermission,
                indexedPermission
            }
        }

    
    } catch (error) {
        console.error('Erreur lors de la récupération des permissions', error)
    }
}
