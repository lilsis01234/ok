const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database');

class Tag extends Model{};

Tag.init({
    nom: {
        type: DataTypes.STRING(55),
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Actualite_Tag',
    timestamps : false
})

module.exports = Tag;

