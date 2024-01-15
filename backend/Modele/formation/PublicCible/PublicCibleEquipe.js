const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');
const Equipe2 = require('../../Structure/Equipe')
const Formation = require('../Formation')

const FormationEq= sequelize.define('FormationEq', {
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
    equipe: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
}, {
  timestamps : false  
})

FormationEq.belongsTo(Formation, { foreignKey: 'formation' });
FormationEq.belongsTo(Equipe2, { foreignKey: 'equipe' });

module.exports = FormationEq;