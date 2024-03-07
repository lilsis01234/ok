// const Seance = require('../Seances/Seance');
const Collaborateur = require('../../CollabModel/Collab');
const ParticipantsSeance = require('../Seances/ParticipantsSeance');
const SceanceFormation = require('../Seances/SceanceFormation')

Collaborateur.belongsToMany(SceanceFormation,{through:ParticipantsSeance,foreignKey:"collaborateur",otherKey:'seance',as:'seancecollab'})
SceanceFormation.belongsToMany(Collaborateur,{through:ParticipantsSeance,foreignKey:"seance",otherKey:'collaborateur',as:'collabseance'})

module.exports={
    SceanceFormation,
    Collaborateur,
    ParticipantsSeance,
}