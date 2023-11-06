const Compte = require('../CompteModel/Compte')
const Discussion = require('./Discussion')
const Membre = require('./Membre')

Compte.belongsTo(Discussion, { through: Membre, foreignKey: "membre", otherKey: 'discussion', as: 'discussion' })
Discussion.belongsTo(Compte, { through: Membre, foreignKey: 'discussion', otherKey: 'membre', as: 'membre' })

module.exports = {
    Compte,
    Discussion,
    Membre,
}