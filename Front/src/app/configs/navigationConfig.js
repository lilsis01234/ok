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
    ],
  }, {
    id: 'collaborateur',
    title: 'Collaborateur',
    type: 'group',
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
          id : 'entreprise.projet',
          title : 'Team',
          type : 'item',
          icon : 'heroicons-outline:user-group',
          translate : 'EQUIPE'
        },
    ]
  }
  ,
  {
    id: 'formation',
    title: 'Formations',
    type: 'group',
    icon: 'heroicons-outline:academic-cap',
    translate: 'Formations',
    children : [
      {
        id: 'formation.mesformations',
        title: 'Agenda',
        type: 'item',
        icon: 'heroicons-outline:calendar',
        translate: 'Agenda',
        url : 'dashboards/calendarseance',
      },
      {
        id: 'formation.demandeformations',
        title: 'Formations',
        type: 'item',
        icon: 'heroicons-outline:users',
        translate: 'Formations',
        url : 'dashboards/listeFormation'
      },
      {
        id: 'formation.demandeformations',
        title: 'Demandes de formations',
        type: 'item',
        icon: 'heroicons-outline:users',
        translate: 'Demandes',
        url : 'dashboards/demandeFormation'
      }
    ]
  },{
    id: 'seances',
    title: 'Seances',
    type: 'group',
    icon: 'heroicons-outline:calendar',
    translate: 'Seances',
    url : 'dashboards/modules',
    children:[
      {
        id: 'module.ajoutSeance',
        title: 'Ajouter',
        type: 'item',
        icon: 'heroicons-outline:plus',
        translate: 'Ajouter',
        url : 'dashboards/addSeance',
      },
    ],
  },
];

export default navigationConfig;
