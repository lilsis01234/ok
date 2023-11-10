const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');


const ActuTag = sequelize.define('ActuTag', {

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