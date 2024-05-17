const { DataTypes } = require("sequelize");
const sequelize = require("../../../database/database");
const Collab = require("../../CollabModel/Collab");

const Demande = sequelize.define('Formation_demande', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
    },
    titre : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    details : {
        type : DataTypes.TEXT,
        allowNull : false,
    }, 
    auteur : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Collab,
            key : 'id',
        }
    },
    approbation : {
        type : DataTypes.BOOLEAN,
        allowNull : true,
    },
    typeFormation : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    critereTypeFormation  : {
        type : DataTypes.JSON,
        allowNull : true,
    }
})


Demande.belongsTo(Collab, {foreignKey:"auteur", targetKey:'id', onUpdate:'CASCADE', onDelete:'CASCADE'});

module.exports = Demande;

