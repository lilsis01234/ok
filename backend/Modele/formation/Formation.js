const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');
const Collaborateur = require('../CollabModel/Collaborateur');
const Departement = require('../Structure/PosteDepartement');
const Rolehierarchique = require('../RoleModel/RoleHierarchique');

class Formation extends Model{}

Formation.init({
    theme:{
        type : DataTypes.STRING(50), 
    },
    description:{
        type : DataTypes.STRING(500), 
        allowNull : false, 
    },
    duree:{
        type : DataTypes.STRING(8), 
        allowNull : false,
    },
    formateur:{
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
        model : Collaborateur,
        key : 'id'
    }
    },
    auteur:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : Collaborateur,
        key : 'id'
    }
    },
    destinataireDemande:{
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
        model : Rolehierarchique,
        key : 'id'
    }
    },
    //A changer par equipe après le model équipe de intranet 244
    departementAFormer:{
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
        model : Departement,
        key : 'id'
    }
    },
    personneAFormer:{
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
        model : Collaborateur,
        key : 'id'
    }
    },
    approbation1:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
    },{
        sequelize,
        modelName : 'Formation'
    })
    Formation.belongsTo(Collaborateur, {
        foreignKey : 'formateur',
        as: 'Formateur',
        onDelete : 'CASCADE'
    })
    Formation.belongsTo(Collaborateur, {
        foreignKey : 'auteur',
        as: 'Auteur',
        onDelete : 'CASCADE'
    })
    Formation.belongsTo(Collaborateur, {
        foreignKey: 'personneAFormer',
        as: 'Collaborateur', 
      });     
    Formation.belongsTo(Departement, {
        foreignKey: 'departementAFormer',
        as: 'Departement', 
    });
    Formation.belongsTo(Rolehierarchique, {
        foreignKey: 'destinataireDemande', 
    });

    module.exports = Formation;
// // // module.exports = Formation;