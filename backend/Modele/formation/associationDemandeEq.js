const DemandeFormation = require('./demandeFormation')
const Equipe2 = require('../Structure/Equipe')
const DemandeEq = require('./DemandeEq')

DemandeFormation.belongsToMany(Equipe2, {through : DemandeEq, foreignKey: "demande", otherKey:'equipe'})
Equipe2.belongsToMany(DemandeFormation, {through : DemandeEq, foreignKey:"equipe", otherKey:'demande'})

module.exports={
    DemandeFormation,
    Equipe2,
    DemandeEq
}