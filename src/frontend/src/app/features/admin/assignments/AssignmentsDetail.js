import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import {
  selectActiveWorkAreaContext,
} from '../../../store/stateEval/userContextSlice';

import {
  Alert,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';

const AssignmentsDetail = () => {

  const { schoolCode } = useParams();

  const workAreaContext = useSelector(selectActiveWorkAreaContext);
  const [assignmentData, setAssignmentData] = useState(null);

  useEffect(()=> {

    (async () => {
      const frameworkContextId = workAreaContext.frameworkContextId;
      const schoolCodeParam = schoolCode? schoolCode: workAreaContext.schoolCode;
      const url = `/api/assignments/tr-assignments-summary/assignments-detail/${frameworkContextId}/${schoolCodeParam}`;
      const response = await axios.get(url);
      const data = await response.data;
      setAssignmentData(data);
    })();

  }, [workAreaContext]);

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Teacher</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignmentData && assignmentData.evaluationSummaries.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center" component="th" scope="row">
                {row.evaluateeDisplayName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default AssignmentsDetail;

