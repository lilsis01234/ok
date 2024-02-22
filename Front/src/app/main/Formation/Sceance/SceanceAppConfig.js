import SceanceApp from "./SceanceApp";

const SceanceAppConfig = {
    settings : {
        layout : {
            config : {},
        },
    },
    routes : [
        {
            path : '/sceance/info/:id',
            element : <SceanceApp/>,
            auth: {
                role: ['SuperAdmin', 'Admin', 'User'],
            },
        }
    ]

}

export default SceanceAppConfig;