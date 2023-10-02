const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database');
const Direction = require('./Direction');

class TestDepartement extends Model{}

TestDepartement.init({
    nomDepartement : {
        type : DataTypes.STRING,
        allowNull : false,
    }, 
    direction : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Direction,
            key : 'id'
        }
    }
}, {
    sequelize,
    modelName : 'TestDepartement'
})


TestDepartement.belongsTo(Direction, {
    foreignKey : 'direction',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
})

module.exports = TestDepartement