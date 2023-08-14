const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database');
const Collaborateur = require('./Collaborateur');
const Poste = require('./Poste');

class ArchiveCollab extends Model{};

ArchiveCollab.init({
    matricule : {
        type: DataTypes.STRING(10),
        allowNull : false,
        unque : true,
    }, 
    nom : {
        type : DataTypes.STRING(30),
        allowNull : false
    },
    prenom : {
        type : DataTypes.STRING(40),
    },
    sexe: {
        type : DataTypes.STRING(10),
    },
    dateNaissance : {
        type : DataTypes.DATE()
    },
    lieuNaissance : {
        type: DataTypes.STRING()
    },
    lot : {
        type : DataTypes.STRING(15)
    }, 
    quartier : {
        type : DataTypes.STRING(20)
    }, 
    ville : {
        type : DataTypes.STRING(20)
    },
    tel : {
        type : DataTypes.STRING(14)
    },
    dateEmbauche: {
        type : DataTypes.DATE()
    },
    site: {
        type: DataTypes.STRING(20)
    },
    poste : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Poste,
            key : 'id'
        }
    }, 
    statut : {
        type: DataTypes.STRING(),
        allowNull : false
    }
}, {
    sequelize,
    modelName : 'ArchiveCollaborateur'
})

Collaborateur.belongsTo(Poste, {
    foreignKey : 'poste',
    onUpdate : 'CASCADE'
})

module.exports = ArchiveCollab;