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
    },
    {
      path: 'apps/addActuality',
      element: <AddActualityApp />,
    },
    {
      path: `/apps/actuality/:actualityId/*`,
      element: <EditActualityApp />
    },
    {
      path: `/apps/timeline`,
      element: <ActualityListApp />
    },
    {
      path: `/actuality/:actualityId`,
      element: <ActualitySingleApp />
    },
    {
      path: `/apps/timeline/categorie/:categorieId`,
      element: <ActualitiesByCategorie />
    },
    {
      path: `/apps/timeline/tag/:tagId`,
      element: <ActualitiesByTag />
    },
    {
      path: `/apps/timeline/type/:typeId`,
      element: <ActualitiesByType />
    },
    {
      path: `/apps/commentaires`,
      element: <Comment />
    },
    {
      path: `/apps/categorie`,
      element: <Categorie />
    },
    {
      path: `/apps/type`,
      element: <Type />
    },
    {
      path: `/apps/tag`,
      element: <Tag />
    }
  ],
};

export default actualityAppConfig;