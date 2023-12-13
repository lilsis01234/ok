import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import navigationConfig from 'app/configs/navigationConfig';
import FuseUtils from '@fuse/utils';
import i18next from 'i18next';
import _ from '@lodash';
import navigationBO from 'app/configs/navigationBO';
import navigationFO from 'app/configs/navigationFO';
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';
import { isArray } from 'lodash';
import { action } from 'mobx';

// const sidebarContext = 'frontOffice';
const navigationAdapter = createEntityAdapter();
const emptyInitialState = navigationAdapter.getInitialState();
// const initialState = navigationAdapter.upsertMany(emptyInitialState, navigationConfig);
const initialState = {
  sidebarContext : 'frontOffice',
  BONavigation: navigationAdapter.upsertMany(emptyInitialState, navigationBO),
  FONavigation: navigationAdapter.upsertMany(emptyInitialState, navigationFO)
}

export const appendNavigationItem = (item, parentId) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());
  return dispatch(setNavigation(FuseUtils.appendNavItem(navigation, item, parentId)));
};

export const prependNavigationItem = (item, parentId) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());
  return dispatch(setNavigation(FuseUtils.prependNavItem(navigation, item, parentId)));
};

export const updateNavigationItem = (id, item) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());
  return dispatch(setNavigation(FuseUtils.updateNavItem(navigation, id, item)));
};

export const removeNavigationItem = (id) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());
  return dispatch(setNavigation(FuseUtils.removeNavItem(navigation, id)));
};

export const {
  selectAll: selectNavigationAll,
  selectIds: selectNavigationIds,
  selectById: selectNavigationItemById,
} = navigationAdapter.getSelectors((state) => state.fuse.navigation);

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigation: navigationAdapter.setAll,
    resetNavigation: (state, action) => initialState,
    setFrontOfficeNavigation: (state, action) => {
      state.FONavigation = action.payload;
    },
    setBackOfficeNavigation: (state, action) => {
      state.BONavigation = action.payload;
    },
    setSidebarContext : (state, action) => {
      state.sidebarContext = action.payload;
    },
  },
});

// export const { setNavigation, resetNavigation, setSidebarContext } = navigationSlice.actions;
export const { setNavigation, resetNavigation, setSidebarContext, setFrontOfficeNavigation, setBackOfficeNavigation} = navigationSlice.actions;

// const getUserRole = (state) => state.user.role;

export const selectFrontOfficeNavigation = (state) => state.fuse.navigation.FONavigation;
export const selectBackOfficeNavigation = (state) => state.fuse.navigation.BONavigation;
export const selectSidebarContext = (state) => state.fuse.navigation.sidebarContext;

export const selectNavigation = createSelector(
  [selectFrontOfficeNavigation, selectBackOfficeNavigation,  ({ i18n }) => i18n.language],
  (BONavigation, FONavigation, language) => {
    const user = useSelector(selectUser);
    const userRole = user.role;
    const userRoleHierarchique = user.userRoleHierarchique;
    const userPermission = useSelector(state => state.allUserPermision);



    const currentNavigation = sidebarContext === 'frontOffice' ? FONavigation: BONavigation;
    console.log(sidebarContext)

    function setTranslationValues(data) {
      console.log('setTranslationValues Inupt: ', data)

      if (!Array.isArray(data) || data.length === 0) {
        // console.error('setTranslationValues: Data is not a non-empty array');
        return data;
      }

      // Utilisez la fonction isArray pour vérifier si data est un tableau
      if (Array.isArray(data) ) {
        // Traitement pour un table
        return data.map((item) => {

          if (!item) {
            console.error('setTranslationValues: Encountered a null or undefined item');
            return item;
          }

          console.log(item)
          if (item.translate && item.title) {
            item.title = i18next.t(`navigation:${item.translate}`);
          }
    
          if (item.children) {
            item.children = setTranslationValues(item.children);
          }
    
          return item;
        });
      } else if (typeof data === 'object') {
        // Traitement pour un objet

        const updatedData = { ...data };

        // Exemple de traitement pour un objet avec des propriétés "ids" et "entities"
        if (updatedData.entities) {
          updatedData.entities = Object.values(updatedData.entities).map((item) => {
            console.log('Item de Input Data', item)
            if (item.translate && item.title) {
              item.title = i18next.t(`navigation:${item.translate}`);
            }

            if (item && item.children) {
              item.children = setTranslationValues(item.children);
            }

            return item;
          });
        }

        // Autres traitements pour les objets si nécessaire

        console.log('setTranslationValues Output:', updatedData);
        return updatedData;
      } 
    }

    console.log('Current Navigation:', currentNavigation);

    const valeurFilter = setTranslationValues(
      _.merge(
        [],
        filterRecursively(currentNavigation, (item) => {
          console.log('Processing item:', item);
          console.log('Item auth:', item && item.auth);
          return FuseUtils.hasPermission(item && item.auth, userRole, userRoleHierarchique, userPermission);
        })
      )
    );
    return valeurFilter
  }
);


function filterRecursively(arr, predicate) {
  console.log('Original Array:', arr);

  // Si arr est un objet avec des propriétés "ids" et "entities"
  if (arr && arr.entities) {
    const filteredArr = Object.values(arr.entities).filter(predicate);
    console.log('Filtered Array:', filteredArr);

    const mappedArr = filteredArr.map((item) => {
      item = { ...item };
      if (item.children) {
        item.children = filterRecursively(item.children, predicate);
      }
      return item;
    });

    // return mappedArr.length > 0 ? mappedArr : arr;
    return {
      ...arr,
      entities: Object.fromEntries(mappedArr.map(item => [item.id, item])),
    };

  }

  // Si arr est déjà un tableau
  if (Array.isArray(arr)) {
    const filteredArr = arr.filter(predicate);
    console.log('Filtered Array:', filteredArr);

    const mappedArr = filteredArr.map((item) => {
      item = { ...item };
      if (item.children) {
        item.children = filterRecursively(item.children, predicate);
      }
      return item;
    });

    return mappedArr.length > 0 ? mappedArr : arr;

  }

  // Si arr n'est ni un objet ni un tableau, retourne tel quel
  return arr;
}

export const selectFlatNavigation = createSelector([selectNavigation], (navigation) =>
  FuseUtils.getFlatNavigation(navigation)
);


export default navigationSlice.reducer;
