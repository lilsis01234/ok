const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database');
const Collab = require('../CollabModel/Collab')
const Role = require('../RoleModel/Role');

class Compte extends Model{}

Compte.init({
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    collaborateur : {
        type : DataTypes.INTEGER, 
        allowNull : false,
        references : {
            model : Collab,
            key : 'id'
        }
    }, 
    lastResetRequest : {
       type : DataTypes.DATE, 
    }
},
{
    sequelize,
    modelName : 'Compte'
})

Compte.belongsTo(Collab, {
    foreignKey : 'collaborateur',
    onUpdate : 'CASCADE',
    onDelete : 'CASCADE'
})

Role.hasMany(Compte);
Compte.belongsTo(Role , {})

module.exports = Compte;