const Seance = require('../Seances/Seance');
const Collaborateur = require('../../CollabModel/Collab');
const ParticipantsSeance = require('../Seances/ParticipantsSeance');

Collaborateur.belongsToMany(Seance,{through:ParticipantsSeance,foreignKey:"collaborateur",otherKey:'seance',as:'seancecollab'})
Seance.belongsToMany(Collaborateur,{through:ParticipantsSeance,foreignKey:"seance",otherKey:'collaborateur',as:'collabseance'})

module.exports={
    Seance,
    Collaborateur,
    ParticipantsSeance,
}