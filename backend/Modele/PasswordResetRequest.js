const {DataTypes, Model,} = require('sequelize');
const sequelize = require('../database/database');
const CompteCollab = require('./CompteCollab')

//Table utilisé pour stocker les demandes de réinitialisation de mot de passe
class PasswordResetRequest extends Model{};

PasswordResetRequest.init({
    token : {
        type : DataTypes.STRING,
        allowNull : false,
        unique: true,
    },
    userId : {
        type : DataTypes.INTEGER,
        allowNull: false,
        references: {
            model : CompteCollab,
            key : 'id',
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE',
    }
    
}, {
    sequelize,
    modelName : 'PasswordResetRequest'
})

module.exports = PasswordResetRequest;