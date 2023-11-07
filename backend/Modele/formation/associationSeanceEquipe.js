const Seance2 = require('./Seance');
const Equipe = require('../CollabModel/Collab');
const EquipeSeance = require('./EquipeSeance');

Equipe.belongsToMany(Seance2,{through:EquipeSeance,foreignKey:"equipe",otherKey:'seance'})
Seance2.belongsToMany(Equipe,{through:EquipeSeance,foreignKey:"seance",otherKey:'equipe'})

module.exports={
    Seance2,
    Equipe,
    EquipeSeance,
}