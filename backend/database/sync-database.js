const sequelize = require('../database/database');

//Modele et asociation Module PROFILE ICI
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
const Eqquipe = require('../Modele/Structure/Equipe')
const Site = require('../Modele/Structure/Site')
const RoleCollab = require('../Modele/RoleModel/Role');
const RoleHierarchique = require('../Modele/RoleModel/RoleHierarchique');
const Permission = require('../Modele/RoleModel/Permission');

const associationPermission = require('../Modele/RoleModel/associationPermission');
const association = require('../Modele/Structure/association')

//Modele et association Module FORMATION ICI
const Formation = require('../Modele/formation/Formation');
const DemandeFormation = require('../Modele/formation/Demandes/demandeFormation');
const CommentaireFormation = require('../Modele/formation/Discussions/CommentaireFormation');
const DiscussionFormation = require('../Modele/formation/Discussions/DiscussionFormation');
const Module = require('../Modele/formation/Modules/Module');
const Seance = require('../Modele/formation/Seances/SeanceFormation');
const ParticipantsSeance = require('../Modele/formation/Seances/ParticipantsSeance');

const EquipeSeance = require('../Modele/formation/Seances/EquipeSeance');

const associationSeanceCollab = require('../Modele/formation/associationSeance/associationSeanceCollab');
const associationSeanceEquipe = require('../Modele/formation/associationSeance/associationSeanceEquipe');

const associationDemandeEq = require('../Modele/formation/associationDemande/associationDemandeEq');
const associationDemandeCollab= require('../Modele/formation/associationDemande/associationDemandeCollab');

const associationFormationEquipe = require('../Modele/formation/associationFormation/associationEquipeFormation');
const associationFormationCollab = require('../Modele/formation/associationFormation/associationCollabFormation');

//Les nouveaux modeles 
const Demande = require('../Modele/formation/Demandes/Demande')
const SeanceFormation = require('../Modele/formation/Seances/SeanceFormation')
const GroupFormation = require('../Modele/formation/PublicCible/GroupFormation')
        

//Modele et association Module ACTUALITE ICI
const Actualite =  require('../Modele/ActualityModel/Actualité');
const Categorie =  require('../Modele/ActualityModel/Categorie');
const ActuCateg =  require('../Modele/ActualityModel/ActuCateg');
const Commentaire =  require('../Modele/ActualityModel/Commentaire');
const GroupCompte =  require('../Modele/ActualityModel/GroupCompte');
const Groupe =  require('../Modele/ActualityModel/Groupe');
const Reaction =  require('../Modele/ActualityModel/Reaction');
const ActualityImg =  require('../Modele/ActualityModel/ActualityImg');
const Type = require('../Modele/ActualityModel/Type');
const ActuType = require('../Modele/ActualityModel/ActuType');

const Tag = require('../Modele/ActualityModel/Tag');
const ActuTag = require('../Modele/ActualityModel/ActuTag');


const associationActuCateg =  require('../Modele/ActualityModel/associationActuCateg');
const associationGroupCompte =  require('../Modele/ActualityModel/associationGroupCompte');
const associationActuType = require('../Modele/ActualityModel/associationActuType');
const associationActuTag = require('../Modele/ActualityModel/associationActuTag');

//Modele et association Module CONGE ICI

const conge = require('../Modele/conge/CongeModel');
const DemandeConge = require('../Modele/conge/CongeModel');
const SoldeConge = require('../Modele/conge/SoldeConge');
const TypeConge = require('../Modele/conge/Types');
const PieceJointe = require('../Modele/conge/PiecesJointes');

//Modele et association Module CHAT ICI

//Synchronisation de la base de donnée 

async function syncDatabase() {
    try {
        //Modele et asociation Module PROFILE ICI
        await sequelize.sync({ force: false });
        const { TestPoste, TestDepartement, PosteDepartement } = association;
        TestPoste.belongsToMany(TestDepartement, { through: PosteDepartement });
        TestDepartement.belongsToMany(TestPoste, { through: PosteDepartement });

        const { RoleHierarchique, Permission, RolePermission } = associationPermission

        //Modele et asociation Module FORMATION ICI
        const{ SeanceFormation, Collab ,ParticipantsSeance} = associationSeanceCollab;
        Collab.belongsToMany(SeanceFormation,{through:ParticipantsSeance});
        SeanceFormation.belongsToMany(Collab,{through:ParticipantsSeance});

        const{ Seance2, Equipe,EquipeSeance} = associationSeanceEquipe;
        Equipe.belongsToMany(Seance2,{through:EquipeSeance});
        Seance2.belongsToMany(Equipe,{through:EquipeSeance});

        const{DemandeFormation2,Collab2,DemandeCollab} = associationDemandeCollab;
        DemandeFormation2.belongsToMany(Collab2,{through:DemandeCollab});
        Collab2.belongsToMany(DemandeFormation2,{through:DemandeCollab});

        const{DemandeFormation,Equipe2,DemandeEq} = associationDemandeEq;
        DemandeFormation.belongsToMany(Equipe2,{through:DemandeEq});
        Equipe2.belongsToMany(Formation,{through:DemandeEq});

        const{Formation3,Equipe3,FormationEq} = associationFormationEquipe;
        Formation3.belongsToMany(Equipe3,{through:FormationEq});
        Equipe3.belongsToMany(Formation3,{through:FormationEq});

        const{Formation2,Collab3,FormationCollab} = associationFormationCollab;
        Formation2.belongsToMany(Collab3,{through:FormationCollab});
        Collab3.belongsToMany(Formation2,{through:FormationCollab});


     

          //Modele et association Module ACTUALITE ICI
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



        console.log('La base de donnée est synchronisée avec succès')

    }  catch (error){
        console.error('Erreur lors de la synchronisation de la base de données :', error )
    } finally {
        sequelize.close();
    }
}


syncDatabase();