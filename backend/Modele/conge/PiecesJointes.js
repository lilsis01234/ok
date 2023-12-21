const sequelize = require('../../database/database');
const {DataTypes, Model} = require('sequelize');

const DemandeConge = require('./CongeModel');

class PieceJointe extends Model{}

PieceJointe.init({
    originalname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    congé:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : DemandeConge,
        key : 'id'
    }
}},{
    sequelize,
    modelName : 'DemandeConge'
});

PieceJointe.belongsTo(DemandeConge, {
    foreignKey : 'congé',
    onDelete : 'CASCADE'
}); 

DemandeConge.hasMany(PieceJointe);

module.exports = PieceJointe;
