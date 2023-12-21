const navigationFO = [
    {
        id: 'dashboard',
        title: 'TABLEAU DE BORD',
        type: 'group',
        icon: 'heroicons-outline:home',
        auth : {
          role : ['SuperAdmin', 'User', 'Admin'],
        },
        children : [
          {
            id: 'dashboard.dashboard',
            title: 'Acceuil',
            type: 'item',
            icon: 'heroicons-outline:home',
            auth : {
              role : ['SuperAdmin', 'User', 'Admin'],
            },
            url : '/acceuil',
          },
          {
            id: 'dashboard.collaborateur',
            title: 'Collaborateur',
            type: 'item',
            icon: 'heroicons-outline:user-group',
            translate: 'COLLABORATEURS',
            auth : {
              role : ['SuperAdmin', 'User', 'Admin'],
            },
            url : 'dashboards/collaborateur'
          }      
        ],
      },
      {
        id: 'actuality',
        title: "Actualités",
        type: 'group',
        icon: 'heroicons-outline:home',
        auth : {
          role : ['SuperAdmin', 'User', 'Admin'],
        },
        children: [
          {
            id: 'actuality.list',
            title: "Toutes les actualités",
            type: 'item',
            icon: 'heroicons-outline:newspaper',
            url: 'apps/actuality/list',
            auth : {
              role : ['SuperAdmin', 'User', 'Admin'],
            },
          },
          {
            id: 'actuality.add',
            title: "Ajout d'actualité",
            type: 'item',
            icon: 'heroicons-outline:document-add',
            url: '/apps/addActuality',
            auth : {
              role : ['SuperAdmin', 'User', 'Admin'],
            },
          },
          {
            id: 'comment',
            title: "Commentaires",
            type: 'item',
            icon: 'heroicons-outline:chat-alt',
            url: '/apps/edit-comments',
            auth : {
              role : ['SuperAdmin', 'User', 'Admin'],
            },
          },
          {
            id: 'categorie',
            title: 'Catégories',
            type: 'item',
            icon: 'heroicons-outline:clipboard-list',
            url: '/apps/categorie',
            auth : {
              role : ['SuperAdmin', 'User', 'Admin'],
            },
          },
          {
            id: 'type',
            title: 'Types',
            type: 'item',
            icon: 'material-outline:article',
            url: '/apps/type',
            auth : {
              role : ['SuperAdmin', 'User', 'Admin'],
            },
          },
          {
            id: 'tag',
            title: 'Etiquettes',
            type: 'item',
            icon: 'material-outline:article',
            url: '/apps/tag',
            auth : {
              role : ['SuperAdmin', 'User', 'Admin'],
            },
          },
          {
            id: 'frontend',
            title: 'Front office',
            icon: 'heroicons-outline:check-circle',
            type: 'collapse',
            auth : {
              role : ['SuperAdmin', 'User', 'Admin'],
            },
            children: [
              {
                id: 'actuality.flux',
                title: "Flux d'actualités",
                type: 'item',
                icon: 'heroicons-outline:menu-alt-2',
                url: '/apps/timeline',
                auth : {
                  role : ['SuperAdmin', 'User', 'Admin'],
                },
              },
              {
                id: 'actuality-content',
                title: 'Actualité',
                type: 'item',
                icon: 'heroicons-outline:clipboard-list',
                url: '/apps/front-actuality',
                auth : {
                  role : ['SuperAdmin', 'User', 'Admin'],
                },
              }
            ],
          }
        ],
      },

]

export default navigationFO;