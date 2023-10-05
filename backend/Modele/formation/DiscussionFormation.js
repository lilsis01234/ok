const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');
const Collaborateur = require('../CollabModel/Collaborateur');
const Module = require('./Module');
const Formation = require('./Formation');


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
        allowNull : false,
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
    modelName:'DiscussionFormation'
}
)

DiscussionFormation.belongsTo(Formation, {
    foreignKey : 'formation',
    onDelete : 'CASCADE'
})
DiscussionFormation.belongsTo(Collaborateur, {
    foreignKey : 'collaborateur'
})

module.exports = DiscussionFormation;