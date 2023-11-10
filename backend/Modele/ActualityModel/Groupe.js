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
    modelName: 'Groupe'

})

module.exports = Groupe;

