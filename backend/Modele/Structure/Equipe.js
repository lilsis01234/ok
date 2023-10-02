const sequelize = require('../../database/database')
const {DataTypes, Model} = require('sequelize')
const Projet = require('./Projet')

class Equipe extends Model{}

Equipe.init({
    nomEquipe : {
        type : DataTypes.STRING(60),
        allowNull : false,
    },
    projet : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Projet,
            key : 'id'
        }
    }
}, {
    sequelize,
    modelName : 'Equipe'
})

Equipe.belongsTo(Projet, {foreignKey:'projet', targetKey:'id', onUpdate:'CASCADE', onDelete:'CASCADE'})

module.exports = Equipe;