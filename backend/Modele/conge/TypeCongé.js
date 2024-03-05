const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');

class Type extends Model{}

Type.init(
    {
        type:{
            type : DataTypes.STRING(250), 
        }
    },
    {
        sequelize,
        modelName : 'Conge_TypeCongé'
    }
    )
module.exports = Type;
