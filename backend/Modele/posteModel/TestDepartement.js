const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');

const TestDepartement = sequelize.define('TestDepartement', {
    nomDepartement : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    }
})

module.exports = TestDepartement