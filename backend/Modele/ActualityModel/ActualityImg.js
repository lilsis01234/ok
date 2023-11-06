const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database');

class ActualityImg extends Model{};

ActualityImg.init({
    nom: {
        type: DataTypes.STRING(100),
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'ActualityImg',
    timestamps : false
})


module.exports = ActualityImg;
