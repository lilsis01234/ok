const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');


const ActuType = sequelize.define('ActuType', {

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