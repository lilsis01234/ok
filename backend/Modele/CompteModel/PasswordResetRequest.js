const {DataTypes, Model,} = require('sequelize');
const sequelize = require('../../database/database');
const Compte = require('./Compte');


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
            model : Compte,
            key : 'id',
        },
        onUpdate : 'CASCADE',
        onDelete: 'CASCADE',
    },
    expiresAt : {
        type : DataTypes.DATE,
        allowNull : false,
    }
    
    
}, {
    sequelize,
    modelName : 'PasswordResetRequest'
})


PasswordResetRequest.belongsTo(Compte, {foreignKey : 'userId'})

module.exports = PasswordResetRequest;