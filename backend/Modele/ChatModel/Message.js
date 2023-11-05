const { DataTypes } = require('sequelize')
const sequelize = require('../../database/database');
const Discussion = require('./Discussion');
const Compte = require('../CompteModel/Compte');
const PieceJointeMessage = require('./PieceJointeMessage');


const Message = sequelize.define('Message', {
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    dateEnvoie: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    envoyeur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Compte,
            key: 'id',
        }
    },
    discussion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Discussion,
            key: 'id',
        }
    },
    pieceJointe: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: PieceJointeMessage,
            key: 'id'
        }
    }
})

Message.belongsTo(Compte, {
    foreignKey: 'envoyeur',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
})



Message.belongsTo(Discussion, {
    foreignKey: 'discussion',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
})

Message.belongsTo(PieceJointeMessage, {
    foreignKey: 'pieceJointe',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
})



module.exports = Message;