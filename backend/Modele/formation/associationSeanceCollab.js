const Seance = require('./Seance');
const Collaborateur = require('../CollabModel/Collab');
const ParticipantsSeance = require('./ParticipantsSeance');

Collaborateur.belongsToMany(Seance,{through:ParticipantsSeance,foreignKey:"collaborateur",otherKey:'seance'})
Seance.belongsToMany(Collaborateur,{through:ParticipantsSeance,foreignKey:"seance",otherKey:'collaborateur'})

module.exports={
    Seance,
    Collaborateur,
    ParticipantsSeance,
}