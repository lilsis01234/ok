const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database');

class Groupe extends Model{};

Groupe.init({
    nom: {
        type: DataTypes.STRING(50),
        allowNull: false
    }

}, {

    sequelize,
    modelName: 'Actualite_Groupe'

})

module.exports = Groupe;

