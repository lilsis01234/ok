const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');

class Type extends Model{}

Type.init({
    type:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    },{
        sequelize,
        modelName : 'Conge_Type'
    })

module.exports = Type;
