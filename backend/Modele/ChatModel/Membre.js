const { DataTypes } = require('sequelize')
const sequelize = require('../../database/database')

const Membre = sequelize.define('Membre', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    pseudo: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    discussion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    membre: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = Membre;