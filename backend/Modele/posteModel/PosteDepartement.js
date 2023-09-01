const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');


const PosteDepartement = sequelize.define('PosteDepartement', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true, 
        allowNull : false,
    },
    poste: {
        type: DataTypes.INTEGER,
        allowNull: false, // Selon votre structure
    },
    departement: {
        type: DataTypes.INTEGER,
        allowNull: false, // Selon votre structure
    },
}, {
  timestamps : false  
})

module.exports = PosteDepartement;