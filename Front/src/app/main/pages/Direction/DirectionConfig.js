const { default: Direction } = require("./Direction");

const DirectionConfig = {
    settings : {
        layout : {}
    }, 
    routes : [
        {
            path : 'entreprise/direction',
            element : <Direction/>
        }
    ]
}

export default DirectionConfig;