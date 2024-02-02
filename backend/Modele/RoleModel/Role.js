const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');

class Role extends Model{}

Role.init({
    titreRole : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    }
}, {
    sequelize,
    modelName : 'Profile_Role',
});



module.exports = Role;