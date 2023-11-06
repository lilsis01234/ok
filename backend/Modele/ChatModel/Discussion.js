const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/database')

class Discussion extends Model {}

Discussion.init({
    nomDiscussion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageDiscussion: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Discussion'
})

module.exports = Discussion