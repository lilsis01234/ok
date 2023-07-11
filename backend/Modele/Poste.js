const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database');


class Poste extends Model{}

Poste.init({
    titrePoste :  {
        type : DataTypes.STRING,
        allowNull : false
    }
}, { 
    sequelize,
    modelName : 'Poste'
})

module.exports = Poste;

