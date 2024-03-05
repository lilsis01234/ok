const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');


const ActuType = sequelize.define('Actualite_ActuType', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    act_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

}, {
    timestamps : false  
})

module.exports = ActuType;