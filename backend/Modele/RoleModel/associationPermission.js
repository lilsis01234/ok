const Permission = require("./Permission")
const Role = require("./Role")
const RoleHierarchique = require("./RoleHierarchique")
const RolePermission = require("./RolePermission")

Permission.belongsToMany(RoleHierarchique, {through : RolePermission, foreignKey :"permission", otherKey:"role", as:"role"})
RoleHierarchique.belongsToMany(Permission, {through : RolePermission, foreignKey : "role", otherKey:"permission", as:"permission"})

module.exports = {
    Permission,
    RoleHierarchique,
    RolePermission
}
