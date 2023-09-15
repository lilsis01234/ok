const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');
<<<<<<< HEAD
const TestDepartement = require('../Structure/TestDepartement');
const TestPoste = require('../Structure/TestPoste');
=======
const TestDepartement = require('../posteModel/TestDepartement');
const TestPoste = require('../posteModel/TestPoste');
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9


class ArchiveCollaborateur extends Model{};

ArchiveCollaborateur.init({
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
    numCnaps : {
        type: DataTypes.STRING(15),
        unique : true
    },
    Banque : {
        type : DataTypes.STRING(30)
    },
    RIB : {
        type : DataTypes.STRING(23)
    },
    entreprise : {
        type : DataTypes.STRING(25),
        allowNull: false, 
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
            model : TestPoste,
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
    },  
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
    },
    statut : {
        type: DataTypes.STRING(),
        allowNull : false
<<<<<<< HEAD
    }, 
    dateDebauche : {
        type : DataTypes.STRING(),
        allowNull : false
=======
>>>>>>> 787c66a6d493c2714c4029e99f09575138720ce9
    }
}, {
    sequelize,
    modelName : 'ArchiveCollab'
})



ArchiveCollaborateur.belongsTo(TestPoste, {
    foreignKey : 'poste',
    onUpdate : 'CASCADE',
    as : 'poste1'
})

ArchiveCollaborateur.belongsTo(TestPoste, {
    foreignKey : 'poste2',
    onUpdate : 'CASCADE',
    as : 'postes'
})

ArchiveCollaborateur.belongsTo(TestDepartement, {
    foreignKey : 'departement',
    onUpdate : 'CASCADE',
    as : 'departement1'
}
)

ArchiveCollaborateur.belongsTo(TestDepartement, {
    foreignKey: 'departement2',
    onUpdate : 'CASCADE',
    as : 'departements'
})


module.exports = ArchiveCollaborateur;