const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');


const ActCateg = sequelize.define('ActCateg', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    categ_id: {
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

module.exports = ActCateg;