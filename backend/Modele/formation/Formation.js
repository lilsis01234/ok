const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');
const Collaborateur = require('../../Modele/CollabModel/Collab');
const Departement = require('../Structure/TestDepartement');
const RoleHierarchique = require('../RoleModel/RoleHierarchique');

class Formation extends Model{}

Formation.init({
    theme:{
        type : DataTypes.STRING(50), 
    },
    description:{
        type : DataTypes.STRING(500), 
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
    formateurExterne:{
        type : DataTypes.STRING(500), 
        allowNull : true, 
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

    module.exports = Formation;
