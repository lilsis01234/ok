const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database');

class Site extends Model{}

Site.init({
    nomSite : {
        type : DataTypes.STRING(100),
        allowNull : false,
        unique : true
    }, 
}, {
    sequelize,
    modelName : 'Profil_Site'
})

module.exports = Site;