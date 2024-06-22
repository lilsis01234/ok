import SeanceApp from "./SeanceApp";

const SeanceAppConfig = {
    settings : {
        layout : {
            config : {},
        },
    },
    routes : [
        {
            path : '/seance/info/:id',
            element : <SeanceApp/>,
            auth: {
                role: ['SuperAdmin', 'Admin', 'User'],
            },
        }
    ]

}

export default SeanceAppConfig;