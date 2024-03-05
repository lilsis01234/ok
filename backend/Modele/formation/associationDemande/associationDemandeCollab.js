const DemandeFormation2 = require('../Demandes/demandeFormation')
const Collab2 = require('../../CollabModel/Collab')
const DemandeCollab = require('../Demandes/DemandeCollab')

DemandeFormation2.belongsToMany(Collab2, {through : DemandeCollab, foreignKey: "demande", otherKey:'collaborateur'})
Collab2.belongsToMany(DemandeFormation2, {through : DemandeCollab, foreignKey:"collaborateur", otherKey:'demande'})

module.exports = {
    DemandeFormation2,
    Collab2,
    DemandeCollab
}