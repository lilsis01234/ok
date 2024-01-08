// sidebarContextSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  context: 'frontOffice', // Vous pouvez définir le contexte initial ici
};

const sidebarContextSlice = createSlice({
  name: 'sidebarContext',
  initialState,
  reducers: {
    setSidebarContext: (state, action) => {
      state.context = action.payload;
    },
  },
});

export const { setSidebarContext } = sidebarContextSlice.actions;
export const selectSidebarContext = (state) => {
    // console.log('Full state in selectSidebarContext:', state.fuse);
    return state.fuse.sidebarContext.context
};

export default sidebarContextSlice.reducer;
