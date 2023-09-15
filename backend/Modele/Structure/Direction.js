const { DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');


class Direction extends Model{}

Direction.init({
    nomDirection : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true 
    },
}, {
    sequelize,
    modelName : 'Direction'
})

module.exports = Direction;