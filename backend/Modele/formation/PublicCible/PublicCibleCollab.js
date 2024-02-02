const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');
const Collab3 = require('../../CollabModel/Collab');
const Formation2 = require('../Formation');

const FormationCollab = sequelize.define('Formation_FormationCollab', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    formation: {
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

FormationCollab.belongsTo(Formation2, { foreignKey: 'formation' });
FormationCollab.belongsTo(Collab3, { foreignKey: 'collaborateur' });

module.exports = FormationCollab;
