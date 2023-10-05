const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');
const DiscussionFormation = require('./DiscussionFormation');
const Collaborateur = require('../CollabModel/Collaborateur');

class CommentaireFormation extends Model{}

CommentaireFormation.init({
    contenu:{
        type:DataTypes.STRING(500),
        allowNull: false
    },
    discussion:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : DiscussionFormation,
        key : 'id'
    }
    },
    fichier:{
        type:DataTypes.STRING(5000),
        allowNull:true
    },
    collaborateur:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : Collaborateur,
        key : 'id'
    }
    },
},{
    sequelize,
    modelName:'CommentaireFormation'
})

CommentaireFormation.belongsTo(DiscussionFormation, {
    foreignKey : 'discussion',
    onDelete : 'CASCADE'
})
CommentaireFormation.belongsTo(Collaborateur, {
    foreignKey : 'collaborateur'
})

module.exports= CommentaireFormation;