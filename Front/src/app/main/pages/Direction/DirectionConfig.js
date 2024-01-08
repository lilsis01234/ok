const { default: Direction } = require("./Direction");

const DirectionConfig = {
    settings : {
        layout : {}
    }, 
    routes : [
        {
            path : 'entreprise/direction',
            element : <Direction/>,
            auth: {
                role: ['SuperAdmin', 'Admin', 'User'],
              },
        }
    ]
}

export default DirectionConfig;