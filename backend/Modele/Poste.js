const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database');
const Departement = require('./Departement');


class Poste extends Model{}

Poste.init({
    titrePoste :  {
        type : DataTypes.STRING,
        allowNull : false,
    },
    departement : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Departement,
            key : 'id'
        }
    }

}, { 
    sequelize,
    modelName : 'Poste'
})

Poste.belongsTo(Departement, {
    foreignKey : 'departement',
    onDelete : 'CASCADE'
})



module.exports = Poste;