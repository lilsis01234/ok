const sequelize = require('../database/database');
const Collab = require('../Modele/CollabModel/Collab')
const Compte = require('../Modele/CompteModel/Compte')
const InfoSocialCollab = require('../Modele/CollabModel/InfoSocialCollab')
const ArchiveCollaborateur = require('../Modele/CollabModel/ArchiveCollab')
const PasswordResetRequest = require('../Modele/CompteModel/PasswordResetRequest');
const TestPoste = require('../Modele/Structure/TestPoste')
const TestDepartement = require('../Modele/Structure/TestDepartement')
const PosteDepartement = require('../Modele/Structure/PosteDepartement')
const Direction = require('../Modele/Structure/Direction')
const Projet = require('../Modele/Structure/Projet')
const Collaborateur = require('../Modele/CollabModel/Collaborateur')
const Eqquipe = require('../Modele/Structure/Equipe')
const association = require('../Modele/Structure/association')

const RoleCollab = require('../Modele/RoleModel/Role');
const RoleHierarchique = require('../Modele/RoleModel/RoleHierarchique');


const Formation = require('../Modele/formation/Formation');
const CommentaireFormation = require('../Modele/formation/CommentaireFormation');
const DiscussionFormation = require('../Modele/formation/DiscussionFormation');
const Module = require('../Modele/formation/Module');
const Seance = require('../Modele/formation/Seance');

const ParticipantsSeance = require('../Modele/formation/ParticipantsSeance');
const Actualite =  require('../Modele/ActualityModel/Actualité');
const Categorie =  require('../Modele/ActualityModel/Categorie');
const ActuCateg =  require('../Modele/ActualityModel/ActuCateg');
const associationActuCateg =  require('../Modele/ActualityModel/associationActuCateg');
const Commentaire =  require('../Modele/ActualityModel/Commentaire');
const GroupCompte =  require('../Modele/ActualityModel/GroupCompte');
const associationGroupCompte =  require('../Modele/ActualityModel/associationGroupCompte');
const Groupe =  require('../Modele/ActualityModel/Groupe');
const Reaction =  require('../Modele/ActualityModel/Reaction');
const ActualityImg =  require('../Modele/ActualityModel/ActualityImg');
const Type = require('../Modele/ActualityModel/Type');
const ActuType = require('../Modele/ActualityModel/ActuType');
const associationActuType = require('../Modele/ActualityModel/associationActuType');
const Tag = require('../Modele/ActualityModel/Tag');
const ActuTag = require('../Modele/ActualityModel/ActuTag');
const associationActuTag = require('../Modele/ActualityModel/associationActuTag');
const Permission = require('../Modele/RoleModel/Permission');
const associationPermission = require('../Modele/RoleModel/associationPermission');
const associationSeanceCollab = require('../Modele/formation/associationSeanceCollab');


const EquipeSeance = require('../Modele/formation/EquipeSeance');
const FormationCollab = require('../Modele/formation/FormationCollab');
const FormationDep = require('../Modele/formation/FormationDep');

const associationSeanceCollab = require('../Modele/formation/associationSeanceCollab');
const associationFormationEq = require('../Modele/formation/associationFormationDep');
const associationFormationCollab= require('../Modele/formation/associationFormationCollab');
const associationSeanceEquipe = require('../Modele/formation/associationSeanceEquipe');

//Synchronisation de la base de donnée 
async function syncDatabase() {
    try {
        await sequelize.sync({ force: false });
        const { TestPoste, TestDepartement, PosteDepartement } = association;
        TestPoste.belongsToMany(TestDepartement, { through: PosteDepartement });
        TestDepartement.belongsToMany(TestPoste, { through: PosteDepartement });

        const { RoleHierarchique, Permission, RolePermission } = associationPermission;

        Collaborateur.belongsToMany(Seance, { through: ParticipantsSeance });
        Departement.belongsToMany(Seance, { through: ParticipantsSeance })
        Seance.belongsToMany(Collaborateur, { through: ParticipantsSeance });

        const { Actualite, Categorie, ActuCateg} = associationActuCateg;
        Actualite.belongsToMany(Categorie, {through: ActuCateg});
        Categorie.belongsToMany(Actualite, {through: ActuCateg});

        const { Type, ActuType} = associationActuType;
        Actualite.belongsToMany(Type, {through: ActuType});
        Type.belongsToMany(Actualite, {through: ActuType});

        const { Tag, ActuTag} = associationActuTag;
        Actualite.belongsToMany(Tag, {through: ActuTag});
        Tag.belongsToMany(Actualite, {through: ActuTag});

        const { Compte, Groupe, GroupCompte} = associationGroupCompte;
        Compte.belongsToMany(Groupe, {through: GroupCompte});
        Groupe.belongsToMany(Compte, {through: GroupCompte});

        const{ Seance, Collaborateur ,ParticipantsSeance} = associationSeanceCollab;
        Collaborateur.belongsToMany(Seance,{through:ParticipantsSeance});
        Seance.belongsToMany(Collaborateur,{through:ParticipantsSeance});

        const{ Seance2, Equipe,EquipeSeance} = associationSeanceEquipe;
        Equipe.belongsToMany(Seance2,{through:EquipeSeance});
        Seance2.belongsToMany(Equipe,{through:EquipeSeance});

        const{Formation2,Collab2,FormationCollab} = associationFormationCollab;
        Formation2.belongsToMany(Collab2,{through:FormationCollab});
        Collab2.belongsToMany(Formation2,{through:FormationCollab});

        const{Formation,Equipe2,FormationEq} = associationFormationEq;
        Formation.belongsToMany(Equipe2,{through:FormationEq});
        Equipe2.belongsToMany(Formation,{through:FormationEq});

        console.log('La base de donnée est synchronisée avec succès')

    }  catch (error){
        console.error('Erreur lors de la synchronisation de la base de données :', error )
    } finally {
        sequelize.close();
    }
}


syncDatabase();