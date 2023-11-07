const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database');

class Type extends Model{};

Type.init({
    nom: {
        type: DataTypes.STRING(50),
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Type',
    timestamps : false
})

module.exports = Type;

