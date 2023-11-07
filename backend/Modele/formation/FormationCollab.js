const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');


const FormationCollab = sequelize.define('FormationCollab', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true, 
        allowNull : false,
    },
    formation: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    collaborateur: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    approbation:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
}, {
  timestamps : false  
})

module.exports = FormationCollab;