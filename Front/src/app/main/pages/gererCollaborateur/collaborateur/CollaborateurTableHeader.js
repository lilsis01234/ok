import React from 'react'


const rows = [
  {
      id: 'matricule',
      align: 'left',
      disablePadding: false,
      label: 'Matricule',
      sort: true
  }, 
  {
      id: 'name',
      align: 'left',
      disablePadding: false,
      label: 'Name',
      sort: true
  }, 
  {
    id: 'dateNaissance',
    align: 'left',
    disablePadding: false,
    label: 'Birth Day',
    sort: true
}, {
  id: 'fonction',
  align: 'left',
  disablePadding: false,
  label: 'Fonction',
  sort: true
}, {
  id: 'departement',
  align: 'left',
  disablePadding: false,
  label: 'Departement',
  sort: true
}, {
  id: 'departement',
  align: 'left',
  disablePadding: false,
  label: 'Departement',
  sort: true
},{
  id: 'departement',
  align: 'left',
  disablePadding: false,
  label: 'Departement',
  sort: true
},{
  id: 'site',
  align: 'left',
  disablePadding: false,
  label: 'Site',
  sort: true
},{
  id: 'entreprise',
  align: 'left',
  disablePadding: false,
  label: 'Entreprise',
  sort: true
},
]




function CollaborateurTableHeader() {
  const { selectColladId } = props;
  const numSelected = selectColladId.length;

  const [selectedCollabMenu, setSelectedCollabMenu] = useState(null);

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  
  function openSelectedCollabMenu(event) {
    setselectedDepartementMenu(event.currentTarget);
  }






  return (
    <div></div>
  )
}

export default CollaborateurTableHeader