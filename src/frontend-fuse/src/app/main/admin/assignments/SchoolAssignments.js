import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

function SchoolAssignments({ evaluations }) {
  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl">
          <TableHead>
            <TableRow className="h-48 sm:h-64">
              <TableCell padding="none" className="w-40 md:w-64 text-center z-99">
                <Typography>Teacher</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {evaluations.map((x) => (
              <TableRow className="h-72" key={x.id}>
                <TableCell className="w-40 md:w-64 text-center" padding="none">
                  {x.evaluateeDisplayName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FuseScrollbars>
    </div>
  );
}

export default SchoolAssignments;
