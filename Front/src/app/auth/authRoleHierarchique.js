import axios from "axios";

let roleHierarchique = {}

export const getRoleHierarchique = () => roleHierarchique;

export const fetchRoleHierarchique = async () =>  {
    try {
        const response = await axios.get('http://192.168.16.244:4000/api/roleHierarchique/all');
        const roleFromBackend = response.data;
        const indexedRole = roleFromBackend.map((role) => ({
            id: role.roleHierarchique,
            role: role.roleHierarchique
        }));

        roleHierarchique = {
            ...roleHierarchique,
            indexedRole
        };
        console.log(roleHierarchique);
    } catch (error) {
        console.error('Erreur lors de la récupération des rôles hierarchiques');
    }
}


