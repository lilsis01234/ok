const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');


const ParticipantsSeance = sequelize.define('Formation_ParticipantsSeance', {
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
    collaborateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
}, {
  timestamps : false  
})

module.exports = ParticipantsSeance;