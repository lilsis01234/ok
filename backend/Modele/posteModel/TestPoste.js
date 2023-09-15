const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');

const TestPoste = sequelize.define('TestPoste', {
    titrePoste : {
        type: DataTypes.STRING,
        allowNull : false,
        unique : true
     }
})

module.exports = TestPoste;