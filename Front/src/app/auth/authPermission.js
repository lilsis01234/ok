import axios from "axios";


let permission = {}

export const getAuthPermission = () => permission;

export const fetchAuthPermission = async () => {
    try {
        const response = axios.get('http://localhost:4001/api/permission/all')
        const permissionFormBackEnd = response.data;
        if (permissionFormBackEnd) {
            const indexedPermission = permissionFormBackEnd.map((permission) => ({
                id: permission.permission,
                permission: permission.permission,
            }))

            permission = {
                ...permission,
                indexedPermission
            }

        }
    } catch (error) {
        console.error('Erreur lors de la récupération des permissions', error)
    }
}