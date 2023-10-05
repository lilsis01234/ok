const Seance = require('./Seance');
const Collaborateur = require('../CollabModel/Collaborateur');
const ParticipantsSeance = require('./ParticipantsSeance');
const Departement = require('../Structure/TestDepartement');

Collaborateur.belongsToMany(Seance,{through:ParticipantsSeance,foreignKey:"collaborateur",otherKey:'seance'})
Seance.belongsToMany(Collaborateur,{through:ParticipantsSeance,foreignKey:"seance",otherKey:'collaborateur'})
Departement.belongsToMany(Seance,{through:ParticipantsSeance,foreignKey:"equipe",otherKey:'equipe'})

module.exports={
    Seance,
    Collaborateur,
    ParticipantsSeance,
    Departement
}