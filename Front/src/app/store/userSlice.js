/* eslint import/no-extraneous-dependencies: off */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import _ from '@lodash';
import { setInitialSettings } from 'app/store/fuse/settingsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import settingsConfig from 'app/configs/settingsConfig';
import jwtService from '../auth/services/jwtService';




//Création d'un action asynchrone SetUser pour mettre à jour les informations de l'utilisateurs 
export const setUser = createAsyncThunk('user/setUser', async (user, { dispatch, getState }) => {
  /*
    You can redirect the logged-in user to a specific route depending on his role
    */

  if (user.loginRedirectUrl) {
    settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example '/apps/academy'
  }
  // console.log(user)
  localStorage.setItem('user', JSON.stringify(user))
  return user;
});



export const updateUserSettings = createAsyncThunk(
  'user/updateSettings',
  async (settings, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = _.merge({}, user, { data: { settings } });

    dispatch(updateUserData(newUser));

    return newUser;
  }
);

export const updateUserShortcuts = createAsyncThunk(
  'user/updateShortucts',
  async (shortcuts, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts,
      },
    };

    dispatch(updateUserData(newUser));

    return newUser;
  }
);

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState();

  if (!user.role || user.role.length === 0) {
    // is guest
    return null;
  }

  history.push({
    pathname: '/',
  });

  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }

  jwtService
    .updateUserData(user)
    .then(() => {
      dispatch(showMessage({ message: 'User data saved with api' }));
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.message }));
    });
};



const storedUser = localStorage.getItem('user');    
const userConnected = JSON.parse(storedUser)
console.log(userConnected)

let initialState
if (userConnected) {
  initialState = {
    role : userConnected.RoleHierarchique?.roleHierarchique,
    data : {
      displayName : userConnected.Collab?.nom + ' ' + userConnected.Collab?.prenom,
      email : userConnected.email,
      photo : userConnected.Collab,
      CompteId : userConnected.id,
    }
  }
} else {
  initialState = {
    role : [],
    data : {}
  }
}


// const initialState = {
//   role: [], // guest
//   data: {
//     displayName: 'John Doe',
//     photoURL: 'assets/images/avatars/brian-hughes.jpg',
//     shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts', 'apps.tasks'],
//   },
// };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {
    [updateUserSettings.fulfilled]: (state, action) => action.payload,
    [updateUserShortcuts.fulfilled]: (state, action) => action.payload,
    [setUser.fulfilled]: (state, action) => action.payload,
  },
});

export const { userLoggedOut } = userSlice.actions;

export const selectUser = ({ user }) => user;

export const selectUserShortcuts = ({ user }) => user.data.shortcuts;

export default userSlice.reducer;
