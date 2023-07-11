const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database'); 
const User = require('./User');


class Compte extends Model{}

Compte.init({
    email :{
        type : DataTypes.STRING,
        allowNull : false
    },

    password : {
        type : DataTypes.STRING,
        allowNull : false
    }, 
    userId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : User,
            key : 'id'
        }
    }
}, {
    sequelize,
    modelName : 'Compte'
}); 

//Utilisation de la clé etrangère 
Compte.belongsTo(User, {
    foreignKey : 'userId'
});

module.exports = Compte;