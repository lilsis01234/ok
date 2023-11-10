export const setUserDetails = (userDetails) => ({
    type : 'SET_USER_DETAILS',
    payload : userDetails
}) 

export const setAllRoles = (roles) => ({
    type : 'SET_ALL_ROLES',
    payload : roles,
})

export const setAllRoleHierarchique = (roleHierarchique) => ({
    type : 'SET_ALL_ROLESHIERARCHIQUE',
    payload : roleHierarchique
})

export const setAllPermissions = (permissions) => ({
    type : 'SET_ALL_PERMISSIONS',
    payload : permissions,
})

export const setUserPermission = (userPermission) => ({
    type : 'SET_USER_PERMISSION',
    payload : userPermission
})