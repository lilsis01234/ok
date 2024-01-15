const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');
const Collab2 = require('../../CollabModel/Collab');
const Formation = require('../Formation');

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
}, {
  timestamps : false  
})

FormationCollab.belongsTo(Formation, { foreignKey: 'formation' });
FormationCollab.belongsTo(Collab2, { foreignKey: 'collaborateur' });


module.exports = FormationCollab;