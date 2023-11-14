const ActuTag = require("./ActuTag");
const Tag = require("./Tag");
const Actualite = require("./Actualité");

Actualite.belongsToMany(Tag, {through : ActuTag, foreignKey: "act_id", otherKey:'tag_id', as:'Tag'})
Tag.belongsToMany(Actualite, {through : ActuTag, foreignKey:"tag_id", otherKey:'act_id'})

module.exports = {
    Actualite,
    Tag,
    ActuTag
}