const Collaborateur = require('../CollabModel/Collab');
const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');
const Type = require('./Types');

class DemandeConge extends Model{}

DemandeConge.init(
    {
        motif:{
            type : DataTypes.STRING(250), 
        },
        description:{
            type : DataTypes.STRING(500), 
            allowNull : false, 
        },
        dayStart:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        dayEnd:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        collaborateur:{
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
            model : Collaborateur,
            key : 'id'
        }
        },
        type:{
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
            model : Type,
            key : 'id'
        }
        },
        approbation:{
            type: DataTypes.BOOLEAN,
            allowNull:true,
        }},{
        sequelize,
        modelName : 'Conge'
})

DemandeConge.belongsTo(Collaborateur, {
    foreignKey : 'collaborateur',
    onDelete : 'CASCADE'
})

DemandeConge.belongsTo(Type, {
    foreignKey : 'type',
})


module.exports = DemandeConge;
