const Formation2 = require('../Formation')
const Collab3 = require('../../CollabModel/Collab')
const FormationCollab = require('../PublicCible/PublicCiblePersonne')

Formation2.belongsToMany(Collab3, {through : FormationCollab, foreignKey: "formation", otherKey:'collaborateur'})
Collab3.belongsToMany(Formation2, {through : FormationCollab, foreignKey:"collaborateur", otherKey:'formation'})

module.exports = {
    Formation2,
    Collab3,
    FormationCollab
}