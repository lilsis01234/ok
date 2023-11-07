const GroupCompte = require("./GroupCompte");
const Groupe = require("./Groupe");
const Compte = require("../CompteModel/Compte");

Compte.belongsToMany(Groupe, {through : GroupCompte, foreignKey: "compte_id", otherKey:'group_id', as:'groupe'})
Groupe.belongsToMany(Compte, {through : GroupCompte, foreignKey:"group_id", otherKey:'compte_id'})

module.exports = {
    Compte,
    Groupe,
    GroupCompte
}