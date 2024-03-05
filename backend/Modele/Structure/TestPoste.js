const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');

const TestPoste = sequelize.define('Profil_Poste', {
    titrePoste : {
        type: DataTypes.STRING,
        allowNull : false,
        unique : true
     }
})

module.exports = TestPoste;