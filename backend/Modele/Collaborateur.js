const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database');
const Poste = require('./Poste');


class Collaborateur extends Model{};

Collaborateur.init({
    matricule : {
        type : DataTypes.STRING(10),
        allowNull : false,
        unique : true,
    },
    nom : {
        type : DataTypes.STRING(30),
        allowNull : false,
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
    lot : {
        type : DataTypes.STRING(15)
    }, 
    quartier : {
        type : DataTypes.STRING(20)
    }, 
    ville : { type : DataTypes.STRING(20)},
    tel : {type : DataTypes.STRING(14)},
    dateEmbauche : {type: DataTypes.DATE},
    site : {type : DataTypes.STRING(20)},
    image : {type: DataTypes.STRING},
    poste : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Poste,
            key : 'id'
        }
    }
}, {
    sequelize,
    modelName : 'Collaborateur'
})
    
Collaborateur.belongsTo(Poste, {
    foreignKey : 'poste',
    onUpdate : 'CASCADE',
})

module.exports = Collaborateur;