const {DataTypes} = require('sequelize');
const sequelize = require('../../database/database');

const RolePermission = sequelize.define('RolePermission', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true, 
        autoIncrement : true,
        allowNull : false,
    }, 
    role : {
        type : DataTypes.INTEGER,
        allowNull : false,
    }, 
    permission : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
})

module.exports = RolePermission;