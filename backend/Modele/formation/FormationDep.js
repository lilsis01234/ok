const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');


const FormationEq= sequelize.define('FormationEq', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true, 
        allowNull : false,
    },
    formation: {
        type: DataTypes.INTEGER,
        allowNull: false, // Selon votre structure
    },
    equipe: {
        type: DataTypes.INTEGER,
        allowNull: false, // Selon votre structure
    },
}, {
  timestamps : false  
})

module.exports = FormationEq;