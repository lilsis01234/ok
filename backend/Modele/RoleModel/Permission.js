const {DataTypes, Model } = require('sequelize')
const sequelize = require('../../database/database')
const RoleHierarchique = require('./RoleHierarchique')

class Permission extends Model{}

Permission.init({
    permission : {
        type: DataTypes.STRING,
        allowNull : false
    },
}, {
    sequelize,
    modelName : 'Permission'
})

module.exports = RoleHierarchique;