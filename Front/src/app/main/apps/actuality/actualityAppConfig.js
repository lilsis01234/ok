import { lazy } from 'react';

const AddActualityApp = lazy(() => import('./add/AddActualityApp'));
const Actualities = lazy(() => import('./list/Actualities'));
const EditActualityApp = lazy(() => import('./edit/EditActualityApp'));
const ActualityListApp = lazy(() => import('./flux/ActualityListApp'));
const ActualitySingleApp = lazy(() => import('./flux/ActualitySingleApp'));
const ActualitiesByCategorie = lazy(() => import('./flux/ActualitiesByCategorie'));
const ActualitiesByTag = lazy(() => import('./flux/ActualitiesByTag'));
const ActualitiesByType = lazy(() => import('./flux/ActualitiesByType'));
const Comment = lazy(() => import('./commentaire/Comment'));
const Categorie = lazy(() => import('./categorie/Categorie'));
const Type = lazy(() => import('./type/Type'));
const Tag = lazy(() => import('./tag/Tag'));

const actualityAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/actuality/list',
      element: <Actualities />,
      auth : {
                role : ['SuperAdmin', 'User', 'Admin'],
              } 
    },
    {
      path: 'apps/addActuality',
      element: <AddActualityApp />,
      auth : {
                role : ['SuperAdmin', 'User', 'Admin'],
              }
    },
    {
      path: `/apps/actuality/:actualityId/*`,
      element: <EditActualityApp /> ,
      auth : {
                role : ['SuperAdmin', 'User', 'Admin'],
              }
    },
    {
      path: `/apps/timeline`,
      element: <ActualityListApp /> ,
      auth : {
                role : ['SuperAdmin', 'User', 'Admin'],
              }
    },
    {
      path: `/actuality/:actualityId`,
      element: <ActualitySingleApp  />,
      auth : {
                role : ['SuperAdmin', 'User', 'Admin'],
              }
    },
    {
      path: `/apps/timeline/categorie/:categorieId`,
      element: <ActualitiesByCategorie />,
      auth : {
                role : ['SuperAdmin', 'User', 'Admin'],
              }
    },
    {
      path: `/apps/timeline/tag/:tagId`,
      element: <ActualitiesByTag /> ,
      auth : {
                role : ['SuperAdmin', 'User', 'Admin'],
              }, 
    },
    {
      path: `/apps/timeline/type/:typeId`,
      element: <ActualitiesByType /> ,
      auth : {
                role : ['SuperAdmin', 'User', 'Admin'],
              }
    },
    {
      path: `/apps/commentaires`,
      element: <Comment /> ,
      auth : {
                role : ['SuperAdmin', 'User', 'Admin'],
              }
    },
    {
      path: `/apps/categorie`,
      element: <Categorie />,
      auth : {
                role : ['SuperAdmin', 'User', 'Admin'],
              }, 
    },
    {
      path: `/apps/type`,
      element: <Type />,
      auth : {
                role : ['SuperAdmin', 'User', 'Admin'],
              }
    },
    {
      path: `/apps/tag`,
      element: <Tag /> ,
      auth : {
                role : ['SuperAdmin', 'User', 'Admin'],
              }
    }
  ],
};

export default actualityAppConfig;