const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');
const Formation = require('./Formation')

class Module extends Model{}

Module.init({  
    titreModule : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    description :  {
        type : DataTypes.STRING,
        allowNull : false,
    },
    formation : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : Formation,
        key : 'id'
    }
    }}
    ,
    {
        sequelize,
        modelName : 'Module'
    }
)

Module.belongsTo(Formation, {
    foreignKey : 'formation',
    onDelete : 'CASCADE'
})


module.exports = Module;
