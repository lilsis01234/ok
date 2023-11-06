const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');


const EquipeSeance = sequelize.define('EquipeSeance', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true, 
        allowNull : false,
    },
    online:{
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    },
    seance:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    equipe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
}, {
  timestamps : false  
})

module.exports = EquipeSeance;