const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const DemandePermission = require('./Permission'); // Importez le modèle DemandeConge si ce n'est pas déjà fait

const PieceJointe = sequelize.define('PieceJointe', {
    originalname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

PieceJointe.belongsTo(DemandePermission); 
DemandePermission.hasMany(PieceJointe);

module.exports = PieceJointe;
