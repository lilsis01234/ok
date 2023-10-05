const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database');
const Module = require('./Module'); 
const Collaborateur = require('../CollabModel/Collaborateur');
const ParticipantSeance = require('./ParticipantsSeance');
const Departement = require('../Structure/TestDepartement');

class Seance extends Model {}

Seance.init(
    {
    date: {
      type: DataTypes.DATE,
    },
    heureStart: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    heureEnd: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    module: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Module,
        key: 'id',
      },
    },
    nombreDePlaces: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombreDePlacesReservees: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    approbation:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
  },
  },
  {
    sequelize,
    modelName: 'Seance', 
  }
);

Seance.belongsTo(Module, {
  foreignKey: 'module',
});

Seance.belongsToMany(Collaborateur, { through: ParticipantSeance, foreignKey: 'seance' });
Collaborateur.belongsToMany(Seance, { through: ParticipantSeance, foreignKey: 'collaborateur' });
Departement.belongsToMany(Seance,{ through: ParticipantSeance, foreignKey: 'equipe' })

module.exports = Seance;