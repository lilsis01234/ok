const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database');

class Categorie extends Model{};

Categorie.init({
    nom: {
        type: DataTypes.STRING(50),
        allowNull: false
    }

}, {
    sequelize,
    timestamps : false,
    modelName: 'Actualite_Categorie'
})

module.exports = Categorie;

