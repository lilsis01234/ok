const {DataTypes, Model} = require('sequelize');
const sequelize = require('./database');

//Création d'un Model et de la table User
class User extends Model{}

User.init({
    firstName : {
        type : DataTypes.STRING,
    },
    lastName : {
        type : DataTypes.STRING
    }
}, {
    sequelize,
    modelName : 'User'
});

console.log(User == sequelize.models.User);

module.exports = User;