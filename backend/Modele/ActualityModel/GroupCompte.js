const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');


const GroupCompte = sequelize.define('GroupCompte', {
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    compte_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
  timestamps : false  
})

module.exports = GroupCompte;