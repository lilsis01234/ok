const Seance2 = require('../Seances/Seance');
const Equipe = require('../../CollabModel/Collab');
const EquipeSeance = require('../Seances/EquipeSeance');

Equipe.belongsToMany(Seance2,{through:EquipeSeance,foreignKey:"equipe",otherKey:'seance'})
Seance2.belongsToMany(Equipe,{through:EquipeSeance,foreignKey:"seance",otherKey:'equipe'})

module.exports={
    Seance2,
    Equipe,
    EquipeSeance,
}