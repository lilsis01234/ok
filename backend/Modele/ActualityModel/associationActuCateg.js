const ActuCateg = require("./ActuCateg");
const Categorie = require("./Categorie");
const Actualite = require("./Actualité");

Actualite.belongsToMany(Categorie, {through : ActuCateg, foreignKey: "act_id", otherKey:'categ_id', as:'categorie'})
Categorie.belongsToMany(Actualite, {through : ActuCateg, foreignKey:"categ_id", otherKey:'act_id'})

module.exports = {
    Actualite,
    Categorie,
    ActuCateg
}