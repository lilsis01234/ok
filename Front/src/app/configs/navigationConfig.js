import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import fr from './navigation-i18n/fr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
i18next.addResourceBundle('fr', 'navigation', fr);


let navigationConfig = []

const loadFrontOfficeNavigation = () => {
  navigationConfig = [
    {
      id: 'dashboard',
      title: 'TABLEAU DE BORD',
      type: 'group',
      icon: 'heroicons-outline:home',
      auth: {
        role: ['SuperAdmin', 'User', 'Admin'],
      },
      children: [
        {
          id: 'dashboard.dashboard',
          title: 'Acceuil',
          type: 'item',
          icon: 'heroicons-outline:home',
          auth: {
            role: ['SuperAdmin', 'User', 'Admin'],
          },
          url: '/acceuil',
        },
      ],
    },
    {
      id: 'actuality',
      title: 'Actualités',
      type: 'group',
      auth: {
        role: ['SuperAdmin', 'User', 'Admin'],
      },
      children: [
        {
          id: 'actuality.flux',
          title: "Flux d'actualités",
          type: 'item',
          icon: 'heroicons-outline:menu-alt-2',
          auth: {
            role: ['SuperAdmin', 'User', 'Admin'],
          },
          url: '/apps/timeline',
        },
      ]
    },
    {
      id: 'collaborateur',
      title: 'Collaborateurs',
      type: 'group',
      icon: 'heroicons-outline:user-group',
      auth: {
        role: ['SuperAdmin', 'User', 'Admin'],
      },
      children: [
        {
          id: 'collaborateurs.liste',
          title: 'Listes des collaborateurs',
          type: 'item',
          icon: 'heroicons-outline:user-group',
          auth: {
            role: ['SuperAdmin', 'User', 'Admin'],
          },
          url: 'collaborateurs/all',
        },
      ]
    }, 

    {
      id: 'entreprise',
      title: 'Entreprise',
      auth: {
        role: ['SuperAdmin', 'User', 'Admin'],
      },
      type: 'group',
      children: [
        {
          id: 'entreprise.direction',
          title: 'Direction',
          type: 'item',
          icon: 'heroicons-outline:briefcase',
          auth: {
            role: ['SuperAdmin', 'User', 'Admin'],
          },
          url: 'entreprise/direction'
        },
        {
          id: 'entreprise.structure',
          title: 'Structure de l\'entreprise',
          type: 'item',
          icon: 'heroicons-outline:briefcase',
          auth: {
            role: ['SuperAdmin', 'User', 'Admin'],
          },
          url: 'entreprise/structure'
        },
      ]
    },
    {
      id: 'formation',
      title: 'Formations',
      type: 'group',
      auth: {
        role: ['SuperAdmin', 'User', 'Admin'],
      },
      icon: 'heroicons-outline:academic-cap',
      translate: 'Formations',
      children : [
        {
          id: 'formation.mesformations',
          title: 'Agenda',
          auth: {
            role: ['SuperAdmin', 'User', 'Admin'],
          },
          type: 'item',
          icon: 'heroicons-outline:calendar',
          translate: 'Agenda',
          url : 'dashboards/calendarseance',
        },
        {
          id: 'formation.formations',
          title: 'Formations',
          auth: {
            role: ['SuperAdmin', 'User', 'Admin'],
          },
          type: 'item',
          icon: 'heroicons-outline:academic-cap',
          translate: 'Formations',
          url : 'dashboards/listeFormation'
        },
        {
          id: 'formation.demandeformations',
          title: 'Demandes de formations',
          auth: {
            role: ['SuperAdmin', 'User', 'Admin'],
          },
          type: 'item',
          icon: 'heroicons-outline:users',
          translate: 'Demandes',
          url : 'dashboards/demandeFormation'
        },
        {
          id: 'formation.ajoutFormation',
          title: 'Formation',
          auth: {
            role: ['SuperAdmin', 'Admin', 'Formateur'],
          },
          type: 'item',
          icon: 'heroicons-outline:plus',
          translate: 'Formation',
          url : 'formateur/addFormation',
        },
        {
          id: 'formation.ajoutDemandeFormation',
          title: 'Demande',
          type: 'item',
          auth: {
            role: ['SuperAdmin', 'User', 'Admin'],
          },
          icon: 'heroicons-outline:plus',
          translate: 'Demande',
          url : '/dashboards/addDemandeFormation',
        }
    ]}
  ]
}


const loadBackOfficeNavigation = () => {
  navigationConfig = [
    {
      id: 'actualite',
      title: 'Actualités',
      type: 'group',
      auth: {
        role: ['SuperAdmin', 'Admin'],
      },
      children: [
        {
          id: 'actuality.list',
          title: "Toutes les actualités",
          type: 'item',
          icon: 'heroicons-outline:newspaper',
          url: 'apps/actuality/list',
          auth: {
            role: ['SuperAdmin', 'Admin'],
          }
        },
        {
          id: 'actuality.add',
          title: "Ajout d'actualité",
          type: 'item',
          icon: 'heroicons-outline:document-add',
          url: '/apps/addActuality',
          auth: {
            role: ['SuperAdmin', 'Admin'],
          }
        },
        {
          id: 'comment',
          title: "Commentaires",
          type: 'item',
          icon: 'heroicons-outline:chat-alt',
          url: '/apps/edit-comments',
          auth: {
            role: ['SuperAdmin', 'Admin'],
          }
        },
        {
          id: 'categorie',
          title: 'Catégories',
          type: 'item',
          icon: 'heroicons-outline:clipboard-list',
          url: '/apps/categorie',
          auth: {
            role: ['SuperAdmin', 'Admin'],
          }
        },
        {
          id: 'type',
          title: 'Types',
          type: 'item',
          icon: 'material-outline:article',
          url: '/apps/type',
          auth: {
            role: ['SuperAdmin', 'Admin'],
          }
        },
        {
          id: 'tag',
          title: 'Etiquettes',
          type: 'item',
          icon: 'material-outline:article',
          url: '/apps/tag',
          auth: {
            role: ['SuperAdmin', 'Admin'],
          }
        }
      ]
    },
    {
      id: 'collaborateur',
      title: 'Collaborateurs',
      type: 'group',
      icon: 'heroicons-outline:user-group',
      auth: {
        role: ['SuperAdmin', 'Admin'],
      },
      children: [
        {
          id: 'collaborator.manage-collab',
          title: 'Listes des collaborateurs',
          icon: 'heroicons-outline:user-circle',
          type: 'item',
          url: 'manage/collaborator',
          auth: {
            role: ['SuperAdmin', 'Admin'],
          },
        }, {
          id: 'collaborator.manage-collab-archives',
          title: 'Archives',
          type: 'item',
          url: 'manage/archive/collaborateur',
          icon: 'heroicons-outline:user-circle',
          auth: {
            role: ['SuperAdmin', 'Admin'],
          },
        },
        {
          id: 'collaborateur.comptes',
          title: 'Comptes collaborateurs',
          type: 'collapse',
          icon: 'heroicons-outline:user-circle',
          auth: { 
            role: ['SuperAdmin', 'Admin'],
          },
          children: [
            {
              id: 'collaborateur.manage-count',
              title: 'Liste des comptes',
              type: 'item',
              url: 'manage/account',
              auth: {
                role: ['SuperAdmin', 'Admin'],
              },
            }
          ]
        },
      ]
    }, {
      id: 'entreprise',
      title: 'Entreprise',
      auth: {
        role: ['SuperAdmin', 'Admin'],
      },
      type: 'group',
      children: [
        {
          id: 'entreprise.direction-manage-direction',
          title: 'Direction',
          type: 'item',
          icon : 'heroicons-outline:briefcase',
          auth: {
            role: ['SuperAdmin', 'Admin'],
          },
          url: 'business/manage/direction'
        }, {
          id: 'entreprise.direction-manage-departement',
          title: 'Departement',
          icon : 'heroicons-outline:briefcase',
          type: 'item',
          auth: {
            role: ['SuperAdmin', 'Admin'],
          },
          url: 'business/manage/departement'
        }, {
          id: 'entreprise.direction-manage-poste',
          title: 'Poste',
          type: 'item',
          icon : 'heroicons-outline:briefcase',
          auth: {
            role: ['SuperAdmin', 'Admin'],
          },
          url: 'business/manage/Fonction'
        }, {
          id: 'entreprise.direction-manage-project',
          title: 'Projet',
          type: 'item',
          icon : 'heroicons-outline:briefcase',
          auth: {
            role: ['SuperAdmin', 'Admin'],
          },
          url: 'business/manage/project'
        }, {
          id: 'entreprise.direction-manage-teams',
          title: 'Equipe',
          type: 'item',
          icon : 'heroicons-outline:briefcase',
          auth: {
            role: ['SuperAdmin', 'Admin'],
          },
          url: 'business/manage/team'
        }, {
          id: 'entreprise.direction-manage-teams',
          title: 'Site',
          type: 'item',
          icon : 'heroicons-outline:briefcase',
          auth: {
            role: ['SuperAdmin', 'Admin'],
          },
          url: 'business/manage/site'
        }
      ]
    },{
      id : 'importExport',
      title : 'Importer ',
      type : 'group',
      auth: {
        role: ['SuperAdmin'],
      },
      children : [
        {
          id : 'import.collabData',
          title : 'Données collaborateurs',
          type : 'item',
          icon : 'heroicons-outline:folder-add',
          url : '/import-data/collaborateurs',
          auth: {
            role: ['SuperAdmin'],
          },
        }, {
          id : 'import.entreprise',
          title : 'Données Entreprises',
           
          type : 'item',
          icon : 'heroicons-outline:folder-add',
          url : '/import-data/entreprise',
          auth: {
            role: ['SuperAdmin'],
          },
        }
      ]
    },
    {
          id : 'settings',
          title : 'Paramètres',
          type : 'group',
          auth: {
            role: ['SuperAdmin', 'Admin'],
          },
          children : [
            {
              id : 'settings.role&Permission',
              title : 'Rôle et permission',
              type : 'collapse',
              icon : 'heroicons-outline:user-circle',
              auth: {
                role: ['SuperAdmin'],
              },
              children : [
                {
                  id : 'collaborateur.manage-role',
                  title : 'Rôles',
                  type : 'item',
                  url : 'manage/role',
                  auth: {
                    role: ['SuperAdmin'],
                  },
                }, 
                {
                  id : 'collaborateur.manage-permission',
                  title : 'Permissions',
                  type : 'item',
                  url : 'manage/permission',
                  auth: {
                    role: ['SuperAdmin'],
                  },
                }, 
              ]
            }, 
          ]
        },
        {
        id: 'formation',
        title: 'Formations',
        type: 'group',
        auth: {
          role: ['SuperAdmin', 'User', 'Admin'],
        },
        icon: 'heroicons-outline:academic-cap',
        translate: 'Formations',
        children : [
          {
            id: 'formation.mesformations',
            title: 'Agenda',
            type: 'item',
            auth: {
              role: ['SuperAdmin', 'User', 'Admin'],
            },
            icon: 'heroicons-outline:calendar',
            translate: 'Agenda',
            url : 'dashboards/calendarseance',
          },
          {
            id: 'formation.formations',
            title: 'Formations',
            type: 'item',
            auth: {
              role: ['SuperAdmin', 'User', 'Admin'],
            },
            icon: 'heroicons-outline:academic-cap',
            translate: 'Formations',
            url : 'dashboards/listeFormation'
          },
          {
            id: 'formation.demandeformations',
            title: 'Demandes de formations',
            auth: {
              role: ['SuperAdmin', 'User', 'Admin'],
            },
            type: 'item',
            icon: 'heroicons-outline:users',
            translate: 'Demandes',
            url : 'dashboards/demandeFormation'
          },
          {
            id: 'formation.ajoutDemandeFormation',
            title: 'Demande',
            auth: {
              role: ['SuperAdmin', 'User', 'Admin'],
            },
            type: 'item',
            icon: 'heroicons-outline:plus',
            translate: 'Demande',
            url : '/dashboards/addDemandeFormation',
          }
        ]}
      ]
}


export const setNavigationContext = (context) => {
  if (context === 'backOffice') {
    loadBackOfficeNavigation();
    // console.log('On est dans la BackOffice', navigationConfig);
    return navigationConfig;
  } else if (context === 'frontOffice') {
    loadFrontOfficeNavigation();
    // console.log('On est dans la FrontOffice', navigationConfig);
    return navigationConfig;
  }
};


setNavigationContext('frontOffice')

// const navigationConfig = [
//   {
//     id: 'dashboard',
//     title: 'TABLEAU DE BORD',
//     type: 'group',
//     icon: 'heroicons-outline:home',
//     auth : {
//       role : ['SuperAdmin', 'User', 'Admin'],
//       roleHierarchique : '',
//       permission : ''
//     },
//     children : [
//       {
//         id: 'dashboard.dashboard',
//         title: 'Acceuil',
//         type: 'item',
//         icon: 'heroicons-outline:home',
//         auth : {
//           role : ['SuperAdmin', 'User', 'Admin'],
//         },
//         url : '/acceuil',
//       },
//       {
//         id: 'dashboard.collaborateur',
//         title: 'Collaborateur',
//         type: 'item',
//         icon: 'heroicons-outline:user-group',
//         translate: 'COLLABORATEURS',
//         url : 'dashboards/collaborateur'
//       }      
//     ],
//   }, {
//     id: 'collaborateur',
//     title: 'Collaborateurs',
//     type: 'group',
//     icon: 'heroicons-outline:user-group',
//     translate: 'COLLABORATEURS', 
//     children : [
//       {
//          id : 'collaborateurs.liste',
//          title : 'Listes des collaborateurs',
//          type: 'item',
//          icon: 'heroicons-outline:user-group',
//          url : 'collaborateurs/all',
//       }, , {
//         id : 'collaborator.manage',
//         title : 'Gérer Collaborateurs',
//         type : 'collapse',
//         icon : 'heroicons-outline:user-group', 
//         children : [
//           {
//             id : 'collaborator.manage-collab',
//             title : 'Listes des collaborateurs',
//             type : 'item',
//             url : 'manage/collaborator'
//           }, {
//             id : 'collaborator.manage-collab-archives',
//             title : 'Archives',
//             type : 'item',
//             url : 'manage/archive/collaborateur'
//           }
//         ] 
//       },{
//         id : 'collaborateur.comptes',
//         title : 'Comptes collaborateurs',
//         type : 'collapse',
//         icon : 'heroicons-outline:user-circle',
//         children: [
//           {
//             id : 'collaborateur.manage-count',
//             title : 'Liste des comptes',
//             type : 'item',
//             url : 'manage/account'
//           }
//         ]
//       },
//     ]
//   }, 
//   {
//     id : 'entreprise',
//     title : 'Entreprise',
//     type : 'group',
//     children : [
//         {
//           id : 'entreprise.direction',
//           title : 'Direction',
//           type : 'item',
//           icon : 'heroicons-outline:briefcase',
//           url : 'entreprise/direction'
//         }, 
//         {
//           id : 'entreprise.structure',
//           title : 'Structure de l\'entreprise',
//           type : 'item',
//           icon : 'heroicons-outline:briefcase',
//           url : 'entreprise/structure'
//         },
//         {
//           id : 'entreprise.manage',
//           title : 'Gérer Structure de l\'Entreprise',
//           type : 'collapse',
//           icon : 'heroicons-outline:briefcase',
//           children : [
//             {
//               id : 'entreprise.direction-manage-direction',
//               title : 'Direction',
//               type : 'item',
//               url : 'business/manage/direction'
//             },  {
//               id : 'entreprise.direction-manage-departement',
//               title : 'Departement',
//               type : 'item',
//               url : 'business/manage/departement'
//             },  {
//               id : 'entreprise.direction-manage-poste',
//               title : 'Poste',
//               type : 'item',
//               url : 'business/manage/Fonction'
//             }, {
//               id : 'entreprise.direction-manage-project',
//               title : 'Projet',
//               type : 'item',
//               url : 'business/manage/project'
//             }, {
//               id : 'entreprise.direction-manage-teams',
//               title : 'Equipe',
//               type : 'item',
//               url : 'business/manage/team'
//             }
//           ]
//         }
//     ]
//   }
//   ,


//   {
//     id: 'actuality',
//     title: "Actualités",
//     type: 'group',
//     icon: 'heroicons-outline:home',
//     children: [
//       {
//         id: 'actuality.list',
//         title: "Toutes les actualités",
//         type: 'item',
//         icon: 'heroicons-outline:newspaper',
//         url: 'apps/actuality/list',
//       },
//       {
//         id: 'actuality.add',
//         title: "Ajout d'actualité",
//         type: 'item',
//         icon: 'heroicons-outline:document-add',
//         url: '/apps/addActuality',
//       },
//       {
//         id: 'comment',
//         title: "Commentaires",
//         type: 'item',
//         icon: 'heroicons-outline:chat-alt',
//         url: '/apps/edit-comments',
//       },
//       {
//         id: 'categorie',
//         title: 'Catégories',
//         type: 'item',
//         icon: 'heroicons-outline:clipboard-list',
//         url: '/apps/categorie',
//       },
//       {
//         id: 'type',
//         title: 'Types',
//         type: 'item',
//         icon: 'material-outline:article',
//         url: '/apps/type',
//       },
//       {
//         id: 'tag',
//         title: 'Etiquettes',
//         type: 'item',
//         icon: 'material-outline:article',
//         url: '/apps/tag',
//       },
//       {
//         id: 'frontend',
//         title: 'Front office',
//         icon: 'heroicons-outline:check-circle',
//         type: 'collapse',
//         children: [
//           {
//             id: 'actuality.flux',
//             title: "Flux d'actualités",
//             type: 'item',
//             icon: 'heroicons-outline:menu-alt-2',
//             url: '/apps/timeline',
//           },
//           {
//             id: 'actuality-content',
//             title: 'Actualité',
//             type: 'item',
//             icon: 'heroicons-outline:clipboard-list',
//             url: '/apps/front-actuality',
//           }
//         ],
//       }
//     ],
//   },


//   {
//     id: 'formation',
//     title: 'Formations',
//     type: 'group',
//     icon: 'heroicons-outline:academic-cap',
//     translate: 'Formations',
//     children : [
//       {
//         id: 'formation.mesformations',
//         title: 'Agenda',
//         type: 'item',
//         icon: 'heroicons-outline:calendar',
//         translate: 'Agenda',
//         url : 'dashboards/calendarseance',
//       },
//       {
//         id: 'formation.formations',
//         title: 'Formations',
//         type: 'item',
//         icon: 'heroicons-outline:academic-cap',
//         translate: 'Formations',
//         url : 'dashboards/listeFormation'
//       },
//       {
//         id: 'formation.demandeformations',
//         title: 'Demandes de formations',
//         type: 'item',
//         icon: 'heroicons-outline:users',
//         translate: 'Demandes',
//         url : 'dashboards/demandeFormation'
//       },
//       {
//         id: 'formation.ajoutFormation',
//         title: 'Formation',
//         type: 'item',
//         icon: 'heroicons-outline:plus',
//         translate: 'Formation',
//         url : 'formateur/addFormation',
//       },
//       {
//         id: 'formation.ajoutDemandeFormation',
//         title: 'Demande',
//         type: 'item',
//         icon: 'heroicons-outline:plus',
//         translate: 'Demande',
//         url : '/dashboards/addDemandeFormation',
//       }
//     ]},
//   // },{
//   //   id:'module',
//   //   type:'group',
//   //   title:'Modules',
//   //   translate:'Modules',
//   //   children:[
//   //     {
//   //       id:'module.add',
//   //       type:'item',
//   //       title:'Ajouter',
//   //       translate:'Ajouter',
//   //       icon:'heroicons-outline:plus',
//   //       url:'formation/addModule'
//   //     }
//   //   ]
//   // },{
//   //   id: 'seances',
//   //   title: 'Seances',
//   //   type: 'group',
//   //   icon: 'heroicons-outline:calendar',
//   //   translate: 'Seances',
//   //   children:[
//   //     {
//   //       id: 'module.ajoutSeance',
//   //       title: 'Ajouter',
//   //       type: 'item',
//   //       icon: 'heroicons-outline:plus',
//   //       translate: 'Ajouter',
//   //       url : 'dashboards/addSeance',
//   //     },
//   //   ],
//   // },{
//     {id:'conge',
//     title: 'Congés',
//     type: 'group',
//     icon: 'heroicons-outline:calendar',
//     translate: 'Congés',
//     children:[
//       {
//         id:'conge.calendrier',
//         type: 'item',
//         title:'Calendrier',
//         icon:'heroicons-outline:calendar',
//         translate:'Calendrier'
//       },
//       {
//         id:'conge.demandes',
//         type: 'item',
//         title:'Demandes',
//         icon:'heroicons-outline:users',
//         translate:'Demandes'
//       },{
//         id:'conge.ajout',
//         type: 'item',
//         title:'Demande',
//         icon:'heroicons-outline:plus',
//         translate:'Demande'
//       },
//     ]
//   }, 

//   //Pour les paramètres généraux
//   {
//     id : 'settings',
//     title : 'Paramètres',
//     type : 'group',
//     children : [
//       {
//         id : 'settings.role&Permission',
//         title : 'Rôle et permission',
//         type : 'collapse',
//         icon : 'heroicons-outline:user-circle',
//         children : [
//           {
//             id : 'collaborateur.manage-role',
//             title : 'Rôles',
//             type : 'item',
//             url : 'manage/role'
//           }, 
//           {
//             id : 'collaborateur.manage-permission',
//             title : 'Permissions',
//             type : 'item',
//             url : 'manage/permission'
//           }
//         ]
//       }
//     ]
//   }



// ];

export default navigationConfig;
