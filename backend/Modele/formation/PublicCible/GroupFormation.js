const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/database');
const Formation = require('../Formation');
const Collab = require('../../CollabModel/Collab');

const GroupFormation = sequelize.define('Formation_groupeFormation', {
    id: {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
    },
    formation : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Formation,
            key : 'id'
        }
    },
    collaborateur : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Collab,
            key : 'id',
        }
    }
})


GroupFormation.belongsTo(Formation, {foreignKey:"formation", targetKey:'id', onUpdate:'CASCADE', onDelete: 'CASCADE'})
Formation.hasMany(GroupFormation)

GroupFormation.belongsTo(Collab, {foreignKey:"collaborateur", targetKey:'id', onUpdate:'CASCADE', onDelete: 'CASCADE'})
Collab.hasMany(GroupFormation)

module.exports = GroupFormation;