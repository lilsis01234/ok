import { useEffect, useState} from 'react';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ActualitiesTableHead from './ActualitiesTableHead';
import withRouter from '@fuse/core/withRouter';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';
import Typography from '@mui/material/Typography';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';


function ActualitiesTable(props) {

  const [listeActuality, setListActuality] = useState([]);
  const [loading, setLoading] = useState(true);

//Récupération de la liste des actualités
const fetchActualities = () => {
  axios.get('http://localhost:4000/api/actualite/all')
    .then(res => {setListActuality(res.data)})
    .catch(err => console.log(err));
}

useEffect(() => {
  fetchActualities();
  setLoading(false);
}, [])


if (loading) {
  return <FuseLoading />
}

  function handleClick(n) {
    props.navigate(`/apps/actuality/${n.id}`);
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ActualitiesTableHead  />

          <TableBody>
            { listeActuality.map((n) => {
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    key={n.id}
                    onClick={(event) => handleClick(n)}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox />
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.titre}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row" >
                      {n.Compte?.Collab?.nom} {n.Compte?.Collab?.prenom} 
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {n.categorie && n.categorie.map((categorie) => ( 
                        <Typography>
                           {categorie.nom}
                        </Typography>
                        ))} 

                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {n.Type && n.Type.map((type) => ( 
                          <Typography>
                            {type.nom}
                          </Typography>
                      ))} 
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      0
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      0
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row" align="right">
                      {moment(n.date_publication).format('DD MMM YYYY')}
                    </TableCell>

                    <TableCell className="md:pl-52 p-4 md:p-16" component="th" scope="row"  style={{ textAlign: 'right' }}>
                      {n.etat == 'publie' ? (
                        <FuseSvgIcon className="text-green" size={20}>
                          heroicons-outline:check-circle
                        </FuseSvgIcon>
                      ) : (
                        <FuseSvgIcon className="text-red" size={20}>
                          heroicons-outline:minus-circle
                        </FuseSvgIcon>
                      )}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {n.visibilite}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>
    </div>
  );
}

export default withRouter(ActualitiesTable);
