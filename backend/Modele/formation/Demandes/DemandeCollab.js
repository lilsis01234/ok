const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');
const Collab2 = require('../../CollabModel/Collab');
const DemandeFormation2 = require('./demandeFormation');

const DemandeFormationCollab = sequelize.define('Formation_DemandeCollab', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true, 
        allowNull : false,
    },
    demande: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    collaborateur: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
}, {
  timestamps : false  
})

DemandeFormationCollab.belongsTo(DemandeFormation2, { foreignKey: 'demande' });
DemandeFormationCollab.belongsTo(Collab2, { foreignKey: 'collaborateur' });


module.exports = DemandeFormationCollab;