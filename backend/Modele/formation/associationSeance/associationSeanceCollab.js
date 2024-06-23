const Collab = require('../../CollabModel/Collab');
const ParticipantsSeance = require('../Seances/ParticipantsSeance');
const SeanceFormation = require('../Seances/SeanceFormation');

Collab.belongsToMany(SeanceFormation, {
    through: ParticipantsSeance,
    foreignKey: 'collaborateur', 
    otherKey: 'seance', 
});

SeanceFormation.belongsToMany(Collab, {
    through: ParticipantsSeance,
    foreignKey: 'seance', 
    otherKey: 'collaborateur', 
    as: 'collaborateur', // Alias for the association
});

module.exports = {
    SeanceFormation,
    Collab,
    ParticipantsSeance,
};