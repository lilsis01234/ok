const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database');
const Actualite = require('./Actualité');
const Compte = require('../CompteModel/Compte');

class Commentaire extends Model{};

Commentaire.init({
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    approuver: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    date_comm: {
        type: DataTypes.DATE,
        allowNull: false
    },
    act_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model : Actualite,
            key : 'id'
        }
    },
    compt_id : {
        type : DataTypes.INTEGER,
        allowNull: false,
        references : {
            model : Compte,
            key : 'id'
        }
    }

}, {
    sequelize,
    modelName: 'Actualite_Commentaire'
});

Commentaire.belongsTo(Actualite, {
    foreignKey : 'act_id'
});

Commentaire.belongsTo(Compte, {
    foreignKey : 'compt_id'
});

Compte.hasMany(Commentaire, {
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
});

Actualite.hasMany(Commentaire, {
    onDelete : 'CASCADE'
})

module.exports = Commentaire;

