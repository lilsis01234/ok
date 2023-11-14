import axios from "axios";

let userPermission = {}

export const getUserPermission = () => userPermission;


export const fetchUserPermission = async () => {

    
    try {
        const user = localStorage.getItem('user');
        const userConnected = JSON.parse(user)
        const id = userConnected.id

        const response = await axios.get(`http://192.168.16.46:4001/api/permission/user/${id}`)
        const permissionFromBackend = response.data;

        if(permissionFromBackend){
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
