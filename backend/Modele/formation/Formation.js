const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');
const Collaborateur = require('../../Modele/CollabModel/Collab');
const Departement = require('../Structure/TestDepartement');
const Role2 = require('../RoleModel/RoleHierarchique');

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
        model : Role2,
        key : 'id'
    }
    },
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
    Formation.belongsTo(Role2, {
        foreignKey: 'destinataireDemande', // Alias défini ici
    });

    module.exports = Formation;
// // // module.exports = Formation;