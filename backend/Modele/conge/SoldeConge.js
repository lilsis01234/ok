const Collaborateur = require('../CollabModel/Collab');
const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');

class SoldeConge extends Model{}

SoldeConge.init({
    soldeInitialMensuel:{
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    jourPris:{
        type:DataTypes.BIGINT,
        allowNull:true
    },
    jourRestant:{
        type:DataTypes.BIGINT,
        allowNull:true
    },
    collaborateur:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : Collaborateur,
        key : 'id'
    }
    }},{
        sequelize,
        modelName : 'Conge_SoldeConge'
    })

SoldeConge.belongsTo(Collaborateur, {
    foreignKey : 'collaborateur',
    onDelete : 'CASCADE'
})

module.exports = SoldeConge;
