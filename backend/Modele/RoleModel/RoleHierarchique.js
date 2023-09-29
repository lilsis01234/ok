const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');
const Role = require('./Role');


class RoleHierarchique extends Model{}

RoleHierarchique.init({
    roleHierarchique : {
        type : DataTypes.STRING,
        allowNull : false
    }, 
}, {
    sequelize,
    modelName : 'RoleHierarchique'
})


RoleHierarchique.belongsTo(Role, {})
Role.hasMany(RoleHierarchique, {})

module.exports = RoleHierarchique;