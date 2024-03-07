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
<<<<<<< HEAD
    modelName: 'Categorie',
    timestamps : false
=======
    modelName: 'Actualite_Categorie'
>>>>>>> 160894bc1dbfda2a818d51b06987e9739b1cc18e
})

module.exports = Categorie;

