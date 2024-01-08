/**
 * Authorization Roles
 */
// const authRoles = {
//   admin: ['admin'],
//   staff: ['admin', 'staff'],
//   user: ['admin', 'staff', 'user'],
//   onlyGuest: [],
// };

import axios from "axios";

// export default authRoles;

let roles = {
  onlyGuest : []
};

export const getRoles = () => roles;

export const fetchRoles = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/role/all_role');
    const roleFromBackend = response.data;
    const indexedRole = roleFromBackend.map((role) => ({
      id: role.titreRole,
      role: role.titreRole
    }));
    roles = {
      ...roles,
      indexedRole
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des rôles');
  }
}
    