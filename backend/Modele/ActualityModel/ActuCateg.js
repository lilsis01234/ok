const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');


const ActCateg = sequelize.define('ActCateg', {

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