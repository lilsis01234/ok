const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database');
const CompteCollab = require('./CompteCollab');



class Role extends Model{}

Role.init({
    titreRole : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    }
}, {
    sequelize,
    modelName : 'Role',
});



module.exports = Role;