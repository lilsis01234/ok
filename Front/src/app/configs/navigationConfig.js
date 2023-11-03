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
    translate: 'COLLABORATEURS', children : [
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
              id : 'entreprise.direction-manage-direction',
              title : 'Direction',
              type : 'item',
              url : 'business/manage/direction'
            },  {
              id : 'entreprise.direction-manage-departement',
              title : 'Departement',
              type : 'item',
              url : 'business/manage/departement'
            },  {
              id : 'entreprise.direction-manage-poste',
              title : 'Fonction',
              type : 'item',
              url : 'business/manage/Fonction'
            }, {
              id : 'entreprise.direction-manage-project',
              title : 'Project',
              type : 'item',
              url : 'business/manage/project'
            }, {
              id : 'entreprise.direction-manage-teams',
              title : 'Team',
              type : 'item',
              url : 'business/manage/team'
            }
          ]
        } 
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
        id: 'formation.formations',
        title: 'Formations',
        type: 'item',
        icon: 'heroicons-outline:users',
        translate: 'Formations',
        url : 'dashboards/listeFormation'
      },
      // {
      //   id: 'formation.demandeformations',
      //   title: 'Demandes de formations',
      //   type: 'item',
      //   icon: 'heroicons-outline:users',
      //   translate: 'Demandes',
      //   url : 'dashboards/demandeFormation'
      // },
      {
        id: 'formation.ajoutFormation',
        title: 'Formation',
        type: 'item',
        icon: 'heroicons-outline:plus',
        translate: 'Formation',
        url : 'formateur/addFormation',
      },
      {
        id: 'formation.ajoutDemandeFormation',
        title: 'Demande',
        type: 'item',
        icon: 'heroicons-outline:plus',
        translate: 'Demande',
        url : '/dashboards/addDemandeFormation',
      }
    ]},
  // },{
  //   id:'module',
  //   type:'group',
  //   title:'Modules',
  //   translate:'Modules',
  //   children:[
  //     {
  //       id:'module.add',
  //       type:'item',
  //       title:'Ajouter',
  //       translate:'Ajouter',
  //       icon:'heroicons-outline:plus',
  //       url:'formation/addModule'
  //     }
  //   ]
  // },{
  //   id: 'seances',
  //   title: 'Seances',
  //   type: 'group',
  //   icon: 'heroicons-outline:calendar',
  //   translate: 'Seances',
  //   children:[
  //     {
  //       id: 'module.ajoutSeance',
  //       title: 'Ajouter',
  //       type: 'item',
  //       icon: 'heroicons-outline:plus',
  //       translate: 'Ajouter',
  //       url : 'dashboards/addSeance',
  //     },
  //   ],
  // },{
    {id:'conge',
    title: 'Congés',
    type: 'group',
    icon: 'heroicons-outline:calendar',
    translate: 'Congés',
    children:[
      {
        id:'conge.calendrier',
        type: 'item',
        title:'Calendrier',
        icon:'heroicons-outline:calendar',
        translate:'Calendrier'
      },
      {
        id:'conge.demandes',
        type: 'item',
        title:'Demandes',
        icon:'heroicons-outline:users',
        translate:'Demandes'
      },{
        id:'conge.ajout',
        type: 'item',
        title:'Demande',
        icon:'heroicons-outline:plus',
        translate:'Demande'
      },
    ]
  }
];

export default navigationConfig;
