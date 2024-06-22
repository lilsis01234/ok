// const Seance = require('../Seances/Seance');
const Collaborateur = require('../../CollabModel/Collab');
const ParticipantsSeance = require('../Seances/ParticipantsSeance');
const SeanceFormation = require('../Seances/SeanceFormation')

Collaborateur.belongsToMany(SeanceFormation,{through:ParticipantsSeance,foreignKey:"collaborateur",otherKey:'seance',as:'seancecollab'})
SeanceFormation.belongsToMany(Collaborateur,{through:ParticipantsSeance,foreignKey:"seance",otherKey:'collaborateur',as:'collabseance'})

module.exports={
    SeanceFormation,
    Collaborateur,
    ParticipantsSeance,
}