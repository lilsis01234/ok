const Compte = require('../CompteModel/Compte')
const Discussion = require('./Discussion')
const Membre = require('./Membre')

Compte.belongsToMany(Discussion, { through: Membre, foreignKey: "membre", otherKey: 'discussion', as: 'discussion' })
Discussion.belongsToMany(Compte, { through: Membre, foreignKey: 'discussion', otherKey: 'membre', as: 'membre' })

module.exports = {
    Compte,
    Discussion,
    Membre,
}