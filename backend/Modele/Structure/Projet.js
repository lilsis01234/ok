const sequelize = require('../../database/database')
const { DataTypes, Model } = require('sequelize');
const TestDepartement = require('./TestDepartement');

class Projet extends Model{}

Projet.init({
    nomProjet : {
        type: DataTypes.STRING(60),
        allowNull : false,
        unique : true
    }, 
    departement : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : TestDepartement,
            key : 'id'
        }
    }
}, 
    {
        sequelize,
        modelName : 'Projet'
    }
)

Projet.belongsTo(TestDepartement, {foreignKey:"departement", targetKey:'id', onUpdate:'CASCADE', onDelete:'CASCADE'})




module.exports = Projet;