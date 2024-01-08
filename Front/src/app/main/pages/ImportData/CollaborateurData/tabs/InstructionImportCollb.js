import { Typography } from '@mui/material'
import React from 'react'

function InstructionImportCollb() {
  return (
    <div>
      <ul className="my-16 px-24 list-disc">
        <li className="mb-6"><Typography>Le fichier a téléchargé doit être sous le format .xlsx et .xls</Typography></li>
        <li className="mb-6"><Typography>La feuille contenant les données doit être préciser dans le formulaire.</Typography></li>
        <li className="mb-6"><Typography>Les données doivent être classés dans l'ordre suivant : Matricule, Nom, Prénom, Date de Naissance, Lieu de Naissance, Sexe, Lot, Quartier, Ville,
            CIN, Date de Délivrance, Lieu de Délivrance, Téléphone, Deuxièmé Téléphone, Statut Matrimoniale, Nombre d'Enfant,
            Date d'Embauche, Site, Entreprise, Numéro CNAPS, Shift, Poste, Deuxième Poste, Département, Deuxième Département, Projet, Deuxième Projet, Equipe, Deuxième Equipe, Email.</Typography></li>
        <li className="mb-6"><Typography>Les colonnes situé ci-dessus doit figuré dans la feuille même s'ils sont vides. A l'excéption du Matricule, Nom, Poste, Département et l'email</Typography></li>
        <li className="mb-6"><Typography>Toutes les dates doivent etre en format JJ/MM/AA. Le mois sera en chiffre.</Typography></li>
        <li className="mb-6"><Typography>L'adresse sera divisé en trois parties : le lot, le quartier et enfin la ville.</Typography></li>
        <li className="mb-6"><Typography>Pour le sexe, veuillez mettre M au lieu de masculin et F au lieu de Féminin. De même pour le Statut Matrimonial, M pour Marié ou marié(e) ou C pour célibataire.</Typography></li>
        <li className="mb-6"><Typography>Pour les champs Site, Poste, Département, Projet et Equipe, s'assurer que le données existent déjà dans la base de donnée. Veuillez consulter la liste de l'élément correspondante pour s'en assurer.</Typography></li>
      </ul>        
    </div>
  )
}

export default InstructionImportCollb
