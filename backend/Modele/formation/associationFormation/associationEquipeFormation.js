const Formation3 = require('../Formation')
const Equipe3 = require('../../Structure/Equipe')
const FormationEq = require('../PublicCible/PublicCibleEquipe')

Formation3.belongsToMany(Equipe3, {through : FormationEq, foreignKey: "formation", otherKey:'equipe'})
Equipe3.belongsToMany(Formation3, {through : FormationEq, foreignKey:"equipe", otherKey:'formation'})

module.exports={
    Formation3,
    Equipe3,
    FormationEq
}