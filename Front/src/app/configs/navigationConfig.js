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
    title: 'TABLEAU DE BORD',
    type: 'group',
    icon: 'heroicons-outline:home',
    children : [
      {
        id: 'dashboard.dashboard',
        title: 'Acceuil',
        type: 'item',
        icon: 'heroicons-outline:home',
        url : '/acceuil'
      },
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
    title: 'Collaborateurs',
    type: 'group',
    icon: 'heroicons-outline:user-group',
    translate: 'COLLABORATEURS', children : [
      {
         id : 'collaborateurs.liste',
         title : 'Listes des collaborateurs',
         type: 'item',
         icon: 'heroicons-outline:user-group',
         url : 'collaborateurs/all',
      }, , {
        id : 'collaborator.manage',
        title : 'Gérer Collaborateurs',
        type : 'collapse',
        icon : 'heroicons-outline:user-group', 
        children : [
          {
            id : 'collaborator.manage-collab',
            title : 'Listes des collaborateurs',
            type : 'item',
            url : 'manage/collaborator'
          }, {
            id : 'collaborator.manage-collab-archives',
            title : 'Archives',
            type : 'item',
            url : 'manage/archive/collaborateur'
          }
        ] 
      },{
        id : 'collaborateur.comptes',
        title : 'Comptes collaborateurs',
        type : 'collapse',
        icon : 'heroicons-outline:user-circle',
        children: [
          {
            id : 'collaborateur.manage-count',
            title : 'Liste des comptes',
            type : 'item',
            url : 'manage/account'
          }
        ]
      },
    ]
  }, 
  {
    id : 'entreprise',
    title : 'Entreprise',
    type : 'group',
    children : [
       {
          id: 'entreprise.direction',
          title: 'Direction',
          type: 'item',
          icon: 'heroicons-outline:briefcase',
          url : 'dashboards/collaborateur'
        }, {
          id: 'entreprise.departement',
          title: 'Département',
          type: 'item',
          icon: 'heroicons-outline:briefcase',
          url : 'dashboards/collaborateur'
        }, {
          id : 'entreprise.projet',
          title : 'Projet',
          type : 'item',
          icon : 'heroicons-outline:user-group',
          url : 'dashboards/collaborateur'
        }, {
          id : 'entreprise.manage',
          title : 'Gérer Structure de l\'Entreprise',
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
              title : 'Poste',
              type : 'item',
              url : 'business/manage/Fonction'
            }, {
              id : 'entreprise.direction-manage-project',
              title : 'Projet',
              type : 'item',
              url : 'business/manage/project'
            }, {
              id : 'entreprise.direction-manage-teams',
              title : 'Equipe',
              type : 'item',
              url : 'business/manage/team'
            }
          ]
        }
    ]
  }
  ,


  {
    id: 'actuality',
    title: "Actualités",
    type: 'group',
    icon: 'heroicons-outline:home',
    children: [
      {
        id: 'actuality.list',
        title: "Toutes les actualités",
        type: 'item',
        icon: 'heroicons-outline:newspaper',
        url: 'apps/actuality/list',
      },
      {
        id: 'actuality.add',
        title: "Ajout d'actualité",
        type: 'item',
        icon: 'heroicons-outline:document-add',
        url: '/apps/addActuality',
      },
      {
        id: 'comment',
        title: "Commentaires",
        type: 'item',
        icon: 'heroicons-outline:chat-alt',
        url: '/apps/edit-comments',
      },
      {
        id: 'categorie',
        title: 'Catégories',
        type: 'item',
        icon: 'heroicons-outline:clipboard-list',
        url: '/apps/categorie',
      },
      {
        id: 'type',
        title: 'Types',
        type: 'item',
        icon: 'material-outline:article',
        url: '/apps/type',
      },
      {
        id: 'tag',
        title: 'Etiquettes',
        type: 'item',
        icon: 'material-outline:article',
        url: '/apps/tag',
      },
      {
        id: 'frontend',
        title: 'Front office',
        icon: 'heroicons-outline:check-circle',
        type: 'collapse',
        children: [
          {
            id: 'actuality.flux',
            title: "Flux d'actualités",
            type: 'item',
            icon: 'heroicons-outline:menu-alt-2',
            url: '/apps/timeline',
          },
          {
            id: 'actuality-content',
            title: 'Actualité',
            type: 'item',
            icon: 'heroicons-outline:clipboard-list',
            url: '/apps/front-actuality',
          }
        ],
      }
    ],
  },


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
        icon: 'heroicons-outline:academic-cap',
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
      },
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
  }, 

  //Pour les paramètres généraux
  {
    id : 'settings',
    title : 'Paramètres',
    type : 'group',
    children : [
      {
        id : 'settings.role&Permission',
        title : 'Rôle et permission',
        type : 'collapse',
        icon : 'heroicons-outline:user-circle',
        children : [
          {
            id : 'collaborateur.manage-role',
            title : 'Rôles',
            type : 'item',
            url : 'manage/role'
          }, 
          {
            id : 'collaborateur.manage-permission',
            title : 'Permissions',
            type : 'item',
            url : 'manage/permission'
          }
        ]
      }
    ]
  }



];

export default navigationConfig;
