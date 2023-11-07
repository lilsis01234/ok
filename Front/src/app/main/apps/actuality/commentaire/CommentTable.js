import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CommentTableHead from './CommentTableHead';
import withRouter from '@fuse/core/withRouter';
import newsWithComments from '../api/mockComment';
import Button from '@mui/material/Button';

function CommentTable(props) {

  function handleClick(n) {
    props.navigate(`/apps/actuality/${n.id}`);
  }

  console.log(newsWithComments);

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <CommentTableHead  />

          <TableBody>
            { newsWithComments.map((n) => 
                  n.commentaires.map((comment) => (
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
                        {comment.auteur}
                      </TableCell>

                      <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                        {comment.contenu}
                      </TableCell>

                      <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                        {n.titre}
                      </TableCell>

                      <TableCell className="p-4 md:p-16 truncate" component="th" scope="row" align="right">
                        {comment.datePublication}
                      </TableCell>

                      <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                        <Button
                          className=""
                          variant="contained"
                          color="success"
                        >
                        approuver
                        </Button>
                      </TableCell>

                  </TableRow>
                  ))
            )}
          </TableBody>
        </Table>
      </FuseScrollbars>
      
    </div>
  );
}

export default withRouter(CommentTable);
