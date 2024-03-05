const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../../database/database');
const Collaborateur = require('../../CollabModel/Collab');
const Module = require('../Modules/Module');
const Formation = require('../Formation');
const DemandeFormation = require('../Demandes/demandeFormation');


class DiscussionFormation extends Model{}

DiscussionFormation.init({
    sujet:{
        type:DataTypes.STRING(500),
        allowNull: false
    },
    contenu:{
        type:DataTypes.STRING(1000),
        allowNull: false
    },
    fichier:{
        type:DataTypes.STRING(5000),
        allowNull:true
    },
    formation:{
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
        model : Formation,
        key : 'id'
    }},
    collaborateur:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : Collaborateur,
        key : 'id'
    }
    },
    module:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : Module,
        key : 'id'
    }
    }},{
    sequelize,
    modelName:'Formation_DiscussionFormation'
}
)

DiscussionFormation.belongsTo(Formation, {
    foreignKey : 'formation',
    onDelete : 'CASCADE'
})
DiscussionFormation.belongsTo(DemandeFormation, {
    foreignKey : 'demande',
    onDelete : 'CASCADE'
})
DiscussionFormation.belongsTo(Collaborateur, {
    foreignKey : 'collaborateur'
})
DiscussionFormation.belongsTo(Module,{
    foreignKey:'module'
})

module.exports = DiscussionFormation;