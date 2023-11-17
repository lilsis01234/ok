import axios from "axios";

let roleHierarchique = {}

export const getRoleHierarchique = () => roleHierarchique;

export const fetchRoleHierarchique = async () => {
    try {
        const response = await axios.get('http://localhost:4001/api/roleHierarchique/all');
        const roleFromBackend = response.data;
        if (roleFromBackend) {
            const indexedRole = roleFromBackend.map((role) => ({
                id: role.roleHierarchique,
                role: role.roleHierarchique
            }));

            roleHierarchique = { 
                ...roleHierarchique,
                indexedRole
            };
            // console.log(roleHierarchique);
        } else {
            console.error('Aucun rôle hierarchique récupéré depuis le backend.');
        }
        console.log(roleHierarchique);
    } catch (error) {
        console.error('Erreur lors de la récupération des rôles hierarchiques', error);
    }
}


