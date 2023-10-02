import axios from "axios";

let roleHierarchique = {}

export const getRoleHierarchique = () => roleHierarchique;

export const fetchRoleHierarchique = () =>  {
    return axios.get('http://192.168.16.244:4000/api/roleHierarchique/all')
        .then(response => {
            const roleFromBackend = response.data;
            const indexedRole = roleFromBackend.map((role) => ({
                id : role.roleHierarchique,
                role : role.roleHierarchique
            }))

            roleHierarchique = {
                ...roleHierarchique,
                indexedRole
            }
            console.log(roleHierarchique)
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des rôles hierarchiques')
        })
}


