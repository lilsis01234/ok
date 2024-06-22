const { Model, DataTypes } = require("sequelize");
const sequelize = require('../../../database/database');
const Module = require('../Modules/Module');
const Formation = require('../Formation');

class SeanceFormation extends Model { }

SeanceFormation.init({
    date: {
        type: DataTypes.DATE,
    },
    heureStart: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    heureEnd: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    module: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Module,
            key: 'id',
        },
    },
    nombreDePlaces: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombredePlacesReservees: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Formation_Seance'
});

SeanceFormation.belongsTo(Module, { foreignKey: 'module' });
SeanceFormation.belongsTo(Formation, { foreignKey: 'formation' });

module.exports = SeanceFormation;
