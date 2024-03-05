const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database');
const Compte  = require('../CompteModel/Compte');
const Actualite = require('./Actualité');

class Reaction extends Model{};

Reaction.init({
    type: {
        type: DataTypes.ENUM('jaime', 'jadore', 'drole'),
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
    // id_compt: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references : {
    //         model : Compte,
    //         key : 'id'
    //     }
    // }

}, {
    sequelize,
    modelName: 'Actualite_Reaction'
})

Reaction.belongsTo(Compte, {
    foreignKey : 'compte_id'
})

Reaction.belongsTo(Actualite, {
    foreignKey : 'act_id'
})

module.exports = Reaction;

