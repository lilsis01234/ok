const navigationBO = [
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
]


export default navigationBO;