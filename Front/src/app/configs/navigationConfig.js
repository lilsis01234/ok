import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import fr from './navigation-i18n/fr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
i18next.addResourceBundle('fr', 'navigation', fr);


const navigationConfig = [
  // {
  //   id: 'example-component',
  //   title: 'Example',
  //   translate: 'EXAMPLE',
  //   type: 'item',
  //   icon: 'heroicons-outline:star',
  //   url: 'example',
  // },
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'heroicons-outline:home',
    translate: 'DASHBOARDS',
    children : [
      {
        id: 'dashboard.collaborateur',
        title: 'Collaborateur',
        type: 'item',
        icon: 'heroicons-outline:user-group',
        translate: 'COLLABORATEURS',
        url : 'dashboards/collaborateur'
      }
    ]
  }, {
    id: 'collaborateur',
    title: 'Collaborateur',
    type: 'group',
    icon: 'heroicons-outline:user-group',
    translate: 'COLLABORATEURS',
    children : [
      {
         id : 'collaborateurs.liste',
         title : 'Collaborator Lists',
         type: 'item',
         icon: 'heroicons-outline:user-group',
         url : 'collaborateurs/all',
      }
    ]
  }, 
  {
    id : 'entreprise',
    title : 'Entreprise',
    type : 'group',
    translate : 'ENTREPRISE',
    children : [
        {
          id: 'entreprise.direction',
          title: 'Direction',
          type: 'item',
          url : '/business/direction/all',
          icon: 'heroicons-outline:briefcase',
          // translate: 'COLLABORATEURS',
        }, {
          id: 'entreprise.departement',
          title: 'Department',
          type: 'item',
          icon: 'heroicons-outline:briefcase',
          translate : 'DEPARTEMENT'
        }, {
          id : 'entreprise.projet',
          title : 'Team',
          type : 'item',
          icon : 'heroicons-outline:user-group',
          translate : 'EQUIPE'
        }, {
          id : 'entreprise.manage',
          title : 'Manage Business Structure',
          type : 'collapse',
          icon : 'heroicons-outline:briefcase',
          children : [
            {
              id : 'entreprise.direction-manage',
              title : 'Direction',
              type : 'item',
              url : 'business/manage/direction'
            }
          ]
        }
    ]
  }

  


];

export default navigationConfig;
