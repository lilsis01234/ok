const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database'); 

class Departement extends Model{}

Departement.init({
    nomDepartement : {
        type : DataTypes.STRING(20), 
        unique : true, 
        allowNull : false, 
    }
}, {
    sequelize, 
    modelName : 'Departement'
})


module.exports = Departement;

