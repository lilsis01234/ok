const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');
const Equipe2 = require('../../Structure/Equipe')
const DemandeFormation = require('./demandeFormation')

const DemandeFormationEq= sequelize.define('DemandeEq', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true, 
        allowNull : false,
    },
    formation: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    equipe: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
}, {
  timestamps : false  
})

DemandeFormationEq.belongsTo(DemandeFormation, { foreignKey: 'formation' });
DemandeFormationEq.belongsTo(Equipe2, { foreignKey: 'equipe' });

module.exports = DemandeFormationEq;