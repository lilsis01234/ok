const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../../database/database');
const Collaborateur = require('../../CollabModel/Collab');
const Departement = require('../../Structure/TestDepartement');
const RoleHierarchique = require('../../RoleModel/RoleHierarchique');

class DemandeFormation extends Model{}

DemandeFormation.init({
    theme:{
        type : DataTypes.STRING(50), 
    },
    description:{
        type : DataTypes.STRING(500), 
        allowNull : false, 
    },
    formateurExt:{
        type:DataTypes.STRING(250),
        allowNull:true,
    },
    auteur:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : Collaborateur,
        key : 'id'
    }
    },
    approbation:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
    },
    destinataireDemande:{
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
        model : RoleHierarchique,
        key : 'id'
    }
    },
    confidentialite:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
    }
    },
    {
        sequelize,
        modelName : 'DemandeFormation'
    })
    DemandeFormation.belongsTo(Collaborateur, {
        foreignKey : 'auteur',
        as: 'Auteur',
        onDelete : 'CASCADE'
    })
    DemandeFormation.belongsTo(RoleHierarchique, {
        foreignKey: 'destinataireDemande',
    });

    module.exports = DemandeFormation;
