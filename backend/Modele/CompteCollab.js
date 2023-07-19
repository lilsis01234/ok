const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database');
const Collaborateur = require('./Collaborateur');
const Role = require('./Role');

class CompteCollab extends Model{}

CompteCollab.init({
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
            model : Collaborateur,
            key : 'id'
        }
    }
}, {
    sequelize,
    modelName : 'CompteCollab'
})

CompteCollab.belongsTo(Collaborateur, {
    foreignKey : 'collaborateur',
})

Role.hasMany(CompteCollab);
CompteCollab.belongsTo(Role, {});


module.exports = CompteCollab;

