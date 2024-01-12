const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database'); 
const Collaborateur = require('../../Modele/CollabModel/Collab');
const ParticipantSeance = require('./ParticipantsSeance');
const Departement = require('../Structure/TestDepartement');
const Formation = require('../formation/Formation');
const DemandeFormation = require('./demandeFormation');

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
    formation:{
      type:DataTypes.INTEGER,
      allowNull:true,
      references:{
        model:Formation,
        key:'id',
      },
    },
    demande:{
      type:DataTypes.INTEGER,
      allowNull:true,
      references:{
        model:DemandeFormation,
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

Seance.belongsTo(Formation, {
  foreignKey: 'formation',
});
Seance.belongsTo(DemandeFormation, {
  foreignKey: 'demande',
});

Seance.belongsToMany(Collaborateur, { through: ParticipantSeance, foreignKey: 'seance' });
Collaborateur.belongsToMany(Seance, { through: ParticipantSeance, foreignKey: 'collaborateur' });
Departement.belongsToMany(Seance,{ through: ParticipantSeance, foreignKey: 'equipe' })

module.exports = Seance;