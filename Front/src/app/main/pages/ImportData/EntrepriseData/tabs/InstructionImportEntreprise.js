import React from 'react'
import { Typography } from '@mui/material'

function InstructionImportEntreprise() {
  return (
    <div>
      <ul className="my-16 px-24 list-disc">
        <li className="mb-6"><Typography>Le fichier a téléchargé doit être sous le format .xlsx et .xls</Typography></li>
        <li className="mb-6"><Typography>La feuille contenant les données doit être préciser dans le formulaire.</Typography></li>
        <li className="mb-6"><Typography>Si vous importer un donnée sur les Postes, l'ordre des champs sera : le Nom du Poste et le nom du Département où on trouve le poste. Verifier que le département existe déjà et aucun champ ne devrait pas être vide.</Typography></li>
        <li className="mb-6"><Typography>Si vous importer un donnée sur les Départements, l'ordre des champs sera : le Nom du Département et le nom du Direction où on trouve le département à insérer. Verifier que la direction existe déjà et aucun champ ne devrait pas être vide.</Typography></li>
        <li className="mb-6"><Typography>Si vous importer un donnée sur les Projets, l'ordre des champs sera : le Nom du Projet et le nom du Département où on trouve le département à insérer. Verifier que le département existe déjà et aucun champ ne devrait pas être vide.</Typography></li>
        <li className="mb-6"><Typography>Si vous importer un donnée sur les Equipes, l'ordre des champs sera : le Nom de l'Equipe et le nom du projet rattaché à l'équipe. Verifier que le projet existe déjà et aucun champ ne devrait pas être vide.</Typography></li>
      </ul>        
    </div>
  )
}


export default InstructionImportEntreprise
