const ActuType = require("./ActuType");
const Type = require("./Type");
const Actualite = require("./Actualité");

Actualite.belongsToMany(Type, {through : ActuType, foreignKey: "act_id", otherKey:'type_id', as:'Type'})
Type.belongsToMany(Actualite, {through : ActuType, foreignKey:"type_id", otherKey:'act_id'})

module.exports = {
    Actualite,
    Type,
    ActuType
}