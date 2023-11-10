const Formation = require('./Formation')
const Equipe2 = require('../Structure/Equipe')
const FormationEq = require('./FormationDep')

Formation.belongsToMany(Equipe2, {through : FormationEq, foreignKey: "formation", otherKey:'equipe'})
Equipe2.belongsToMany(Formation, {through : FormationEq, foreignKey:"equipe", otherKey:'formation'})

module.exports={
    Formation,
    Equipe2,
    FormationEq
}