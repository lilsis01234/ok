const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database');
const Compte = require('../CompteModel/Compte');

class Actualite extends Model{};

Actualite.init({
    titre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date_publication: {
        type: DataTypes.DATE,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(100)
    },
    extrait : {
        type : DataTypes.TEXT
    },
    etat: {
        type: DataTypes.ENUM('publie', 'brouillon'),
        allowNull: false,
    },
    visibilite: {
        type: DataTypes.ENUM('privee', 'public'),
        allowNull: false,
    },
    commentaire: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    compte_id: {
        type: DataTypes.INTEGER,
        references : {
            model : Compte,
            key : 'id'
        }
    }

}, {
    sequelize,
    modelName: 'Actualite'
})

Actualite.belongsTo(Compte, {
    foreignKey : 'compte_id',
    onUpdate : 'CASCADE' 
})

module.exports = Actualite;

