const {DataTypes, Model} = require('sequelize')
const sequelize = require('../../database/database')
const Collab = require('./Collab')


class InfoSocialCollab extends Model{}

InfoSocialCollab.init({
    numCnaps : {
        type: DataTypes.STRING(15),
        unique : true
    },
    Banque : {
        type : DataTypes.STRING(30)
    },
    RIB : {
        type : DataTypes.STRING(23)
    },
    collaborateur : {
        type : DataTypes.INTEGER,
        allowNull: false,
        references : {
            model : Collab,
            key  : 'id'
        }
    }
}, {
    sequelize,
    modelName: 'InfoSocialCollab'
})
InfoSocialCollab.belongsTo(Collab, {
    foreignKey : 'collaborateur',
    onUpdate : 'CASCADE',
    onDelete : 'CASCADE'
})

module.exports = InfoSocialCollab
