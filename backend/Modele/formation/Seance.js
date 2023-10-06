const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database');
const Module = require('./Module'); 
const Collaborateur = require('../../Modele/CollabModel/Collab');
const ParticipantSeance = require('./ParticipantsSeance');
const Departement = require('../Structure/TestDepartement');
const Formation = require('../formation/Formation')

class Seance extends Model {}

Seance.init(
    {
    date: {
      type: DataTypes.DATE,
    },
    heureStart: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    heureEnd: {
      type: DataTypes.STRING(100),
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
    formation:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:Formation,
        key:'id',
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
  title:{
    type: DataTypes.STRING,
    allowNull: false,
  }
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