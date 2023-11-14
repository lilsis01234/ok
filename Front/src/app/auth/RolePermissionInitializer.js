import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAuthPermission } from './authPermission';
import { setAllPermissions, setAllRoleHierarchique, setAllRoles, setUserPermission } from 'app/store/auth/authActions';
import { fetchRoles } from './authRoles';
import { fetchRoleHierarchique } from './authRoleHierarchique';
import { fetchUserPermission } from './userPermission';

const RolePermissionInitializer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRolePermission = async () => {
            try {
                //enregistrement des roles dans l'Etat Globale
               const roleData = await fetchRoles();
               dispatch(setAllRoles(roleData))

               //enregistrement des roles hierarchiques dans l'Etat Globale
               const roleHierarchiqueData = await fetchRoleHierarchique();
               dispatch(setAllRoleHierarchique(roleHierarchiqueData))

               //enregitrement des permissions dans l'Etat Globale
               const permission = await fetchAuthPermission(); 
               dispatch(setAllPermissions(permission))

               //enregistrement des permissions de l'utilisateur connecté dans l'Etat Globale
               const userPermission = await fetchUserPermission();
               dispatch(setUserPermission(userPermission))



            } catch (error) {
                console.error('Erreur lors de la récupération des permissions et des roles', error)
            }
        }

        fetchRolePermission()

        }, [dispatch])

    return (
        <div>

        </div>
    )
}

export default RolePermissionInitializer
