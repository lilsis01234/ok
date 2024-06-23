const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');
const Collab = require('../../CollabModel/Collab');
const SeanceFormation = require('./SeanceFormation');

const ParticipantsSeance = sequelize.define('Formation_ParticipantsSeance', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    seance: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    collaborateur: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

ParticipantsSeance.belongsTo(Collab, { foreignKey: 'collaborateur' });
ParticipantsSeance.belongsTo(SeanceFormation, { foreignKey: 'seance' });

module.exports = ParticipantsSeance;
