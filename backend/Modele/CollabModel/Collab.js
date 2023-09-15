const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database');
<<<<<<< HEAD
const TestDepartement = require('../Structure/TestDepartement');
const TestPoste = require('../Structure/TestPoste');
const Equipe = require('../Structure/Equipe')
=======
const TestDepartement = require('../posteModel/TestDepartement');
const TestPoste = require('../posteModel/TestPoste');
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9

class Collab extends Model{};

Collab.init({
    matricule: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    nom: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING(40),
    },
    sexe: {
        type: DataTypes.STRING(10),
    },
    dateNaissance: {
        type: DataTypes.DATE()
    },
    lieuNaissance : {
        type : DataTypes.STRING(20)
    },
    lot: {
        type: DataTypes.STRING(15)
    },
    quartier: {
        type: DataTypes.STRING(20)
    },
    ville: { 
        type: DataTypes.STRING(20) 
    },
    tel: { 
        type: DataTypes.STRING(14) 
    },
<<<<<<< HEAD
    telurgence : {
        type : DataTypes.STRING(14)
    },
    CIN : {
        type : DataTypes.STRING(12),
        unique : true
    },
    dateDelivrance : {
        type : DataTypes.DATE
    },
    lieuDelivrance : {
        type : DataTypes.STRING(20),
    },
    statutmatrimoniale : {
        type : DataTypes.STRING(20)
    },
    nbEnfant : {
        type: DataTypes.INTEGER
    },

=======
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
    dateEmbauche: { 
        type: DataTypes.DATE 
    },
    site: { 
        type: DataTypes.STRING(20) 
    },
    image: { 
        type: DataTypes.STRING 
    },
    entreprise : {
        type : DataTypes.STRING(25),
        allowNull: false, 
    },
<<<<<<< HEAD
    categorie : {
       type : DataTypes.STRING(20), 
    },
    contrat : {
        type: DataTypes.STRING(20)
    },
=======
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
    poste : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model: TestPoste,
            key : 'id'
        }
    }, 
    poste2 : {
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
            model: TestPoste,
            key : 'id'
        }
<<<<<<< HEAD
    }, 
=======
    },  
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
    departement : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : {
                model : TestDepartement,
                key : 'id'
            }
        }
    },
    departement2 : {
        type: DataTypes.INTEGER,
        allowNull : true,
        references : {
            model : TestDepartement,
            key : 'id'
        }
<<<<<<< HEAD
    }, 
    equipe : {
        type: DataTypes.INTEGER,
        references : {
            model : Equipe,
            key : 'id'
        }
    },
    equipe2 : {
        type: DataTypes.INTEGER,
        references : {
            model : Equipe,
            key : 'id'
        }
    }
=======
    }

>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
}, {
    sequelize,
    modelName: 'Collab'
})

<<<<<<< HEAD

=======
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
Collab.belongsTo(TestPoste, {
    foreignKey : 'poste',
    onUpdate : 'CASCADE',
    as : 'poste1'
})

Collab.belongsTo(TestPoste, {
    foreignKey : 'poste2',
    onUpdate : 'CASCADE',
    as : 'postes'
})

<<<<<<< HEAD
Collab.belongsTo(TestDepartement, {foreignKey:"departement", targetKey:'id', onUpdate:'CASCADE', as: 'departement1'})
Collab.belongsTo(TestDepartement, {foreignKey:"departement2", targetKey:'id', onUpdate:'CASCADE', as:'departements'})

Collab.belongsTo(Equipe, {foreignKey:"equipe", targetKey:'id',onUpdate:'CASCADE', as:'equipe1'})
Collab.belongsTo(Equipe, {foreignKey:"equipe2", targetKey:'id', onUpdate:'CASCADE', as:'equipes'})
=======
Collab.belongsTo(TestDepartement, {
    foreignKey : 'departement',
    onUpdate : 'CASCADE',
    as : 'departement1'
}
)

Collab.belongsTo(TestDepartement, {
    foreignKey: 'departement2',
    onUpdate : 'CASCADE',
    as : 'departements'
})


>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9


module.exports = Collab;

