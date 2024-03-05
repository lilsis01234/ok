const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');


const ActuTag = sequelize.define('Actualite_ActuTag', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    tag_id: {
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

module.exports = ActuTag;