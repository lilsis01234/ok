const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/database')

class Discussion extends Model{}

Discussion.init({
    nomDiscussion : {
        type : DataTypes.STRING,
        allowNull : false
    },
}, {
    sequelize,
    modelName : 'Discussion'
})

module.exports = Discussion