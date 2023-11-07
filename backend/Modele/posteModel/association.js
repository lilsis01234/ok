const PosteDepartement = require("./PosteDepartement");
const TestDepartement = require("./TestDepartement");
const TestPoste = require("./TestPoste");




TestPoste.belongsToMany(TestDepartement, {through : PosteDepartement, foreignKey: "poste", otherKey:'departement', as:'departement'})
TestDepartement.belongsToMany(TestPoste, {through : PosteDepartement, foreignKey:"departement", otherKey:'poste'})

module.exports = {
    TestPoste,
    TestDepartement,
    PosteDepartement
}