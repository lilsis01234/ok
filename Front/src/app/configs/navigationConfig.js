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
    type: 'item',
    icon: 'heroicons-outline:home',
    translate: 'DASHBOARDS'
  }, {
    id: 'collaborateur',
    title: 'Collaborateur',
    type: 'item',
    icon: 'heroicons-outline:user-group',
    translate: 'COLLABORATEURS',
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
          icon: 'heroicons-outline:briefcase',
          // translate: 'COLLABORATEURS',
        }, {
          id: 'entreprise.departement',
          title: 'Department',
          type: 'item',
          icon: 'heroicons-outline:briefcase',
          translate : 'DEPARTEMENT'
        }, {
          id : 'entreprise.equipe',
          title : 'Team',
          type : 'item',
          icon : 'heroicons-outline:user-group',
          translate : 'EQUIPE'
        }, {
          
        }
    ]
  }

  


];

export default navigationConfig;
