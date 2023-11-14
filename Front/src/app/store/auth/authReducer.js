const initialState = {
    allRole : [],
    allPermission : [],
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_ROLES':
        return {
            ...state,
            allRoles : action.payload,
        }
    case 'SET_ALL_PERMISSION':
        return {
            ...state,
            allPermission : action.payload,
        }
    
    case 'SET_USER_PERMISSION' :
        return {
            ...state,
            allUserPermission : action.payload
        }
    
    default:
        return state;
  }
}

export default authReducer;