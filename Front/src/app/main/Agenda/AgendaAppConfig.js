import AgendaApp from "./AgendaApp"


const AgendaAppConfig =  {
    settings: {
        layout: {
          config: {},
        },
    },
    routes : [
        {
            path : '/agenda',
            element : <AgendaApp/>,
            auth: {
                role: ['SuperAdmin', 'Admin', 'User'],
            },
        }
    ] 

}

export default AgendaAppConfig
