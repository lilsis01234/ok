const { Model, DataTypes } = require("sequelize");
const sequelize = require('../../database/database');

class PieceJointeMessage extends Model {}

PieceJointeMessage.init({
    typefichiers: {
        type: DataTypes.STRING(80),
        allowNull: false,
    },
    fichiers: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'PieceJointeMessage'
})

module.exports = PieceJointeMessage