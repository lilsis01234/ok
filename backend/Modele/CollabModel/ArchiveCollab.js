const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');
const TestDepartement = require('../Structure/TestDepartement');
const TestPoste = require('../Structure/TestPoste');
const Projet = require('../Structure/Projet');
const Equipe = require('../Structure/Equipe');


class ArchiveCollaborateur extends Model{};

ArchiveCollaborateur.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
        type: DataTypes.STRING(60)
    },
    ville: { 
        type: DataTypes.STRING(20) 
    },
    adresse2 : {
        type : DataTypes.STRING(60)
    },
    tel: { 
        type: DataTypes.STRING(14) 
    },
    telurgence : {
        type : DataTypes.STRING(15)
    },
    CIN : {
        type : DataTypes.STRING(15),
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
    entreprise : {
        type : DataTypes.STRING(25),
        allowNull: false, 
    },
    dateEmbauche: { 
        type: DataTypes.DATE 
    },
    site: { 
        type: DataTypes.STRING(20) 
    },
    entreprise : {
        type : DataTypes.STRING(25),
        allowNull: false, 
    },
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
    }, projet : {
        type: DataTypes.INTEGER,
        references : {
            model : Projet,
            key : 'id'
        }
    },
    projet2 : {
        type: DataTypes.INTEGER,
        references : {
            model : Projet,
            key : 'id'
        }
    }, 
    equipe : {
        type : DataTypes.INTEGER,
        references : {
            model : Equipe,
            key : 'id'
        }
    },
    equipe2 : {
        type : DataTypes.INTEGER,
        references : {
            model : Equipe,
            key : 'id'
        }
    },
    statut : {
        type: DataTypes.STRING(),
        allowNull : false
    }, 
    dateDebauche : {
        type : DataTypes.STRING(),
        allowNull : false
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

ArchiveCollaborateur.belongsTo(Projet, {foreignKey:"projet", targetKey:'id',onUpdate:'CASCADE', as:'projet1'})
ArchiveCollaborateur.belongsTo(Projet, {foreignKey:"projet2", targetKey:'id', onUpdate:'CASCADE', as:'projets'})

ArchiveCollaborateur.belongsTo(Equipe, {foreignKey:"equipe", targetKey:'id', onUpdate:'CASCADE', as:'equipe1'})
ArchiveCollaborateur.belongsTo(Equipe, {foreignKey:"equipe2", targetKey:'id', onUpdate:'CASCADE', as:'equipes'})


module.exports = ArchiveCollaborateur;