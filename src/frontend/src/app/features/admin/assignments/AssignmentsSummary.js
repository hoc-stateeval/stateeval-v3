import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { get, put } from '../../../core/api';
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

const AssignmentsSummary = () => {

  const getAssignmentsDelegatedToAllSchools = (summaries) => {
    summaries.reduce((acc, next) => {
      if (!next.delegated) return false;
      return true;
    }, true);
  }

  const [summaries, setSummaries] = useState([]);
  const [assignmentsDelegatedToAllSchools, setAssignmentsDelegatedToAllSchools] = 
            useState(getAssignmentsDelegatedToAllSchools(summaries));

  const workAreaContext = useSelector(selectActiveWorkAreaContext);

  useEffect(()=> {

    (async () => {
      const frameworkContextId = workAreaContext.frameworkContextId;
      const response = await get(`assignments/tr-assignments-summary/${frameworkContextId}`);
      const data = await response.data;
      setSummaries(data);
    })();

  }, [workAreaContext]);


  const toggleDelegation = (row, event) => {
    let summary = summaries.find(x=>x.schoolCode===row.schoolCode);
    summary.delegated=!summary.delegated;
    setSummaries([...summaries]);
    setAssignmentsDelegatedToAllSchools(getAssignmentsDelegatedToAllSchools(summaries));
  };

  const handleClickDelegateToAllSchools = () => {
    const result = summaries.map(x=>({...x, delegated:true}));
    put(`assignments/${workAreaContext.frameworkContextId}/delegate`).then(()=> {
      setSummaries(result);
      setAssignmentsDelegatedToAllSchools(true);
    })
  }

  return (
    <>
    <Typography sx={{display:'block', mb:2}} variant="p">
      By default, the district is responsible for assigning evaluators and choosing the evaluation plan type for {workAreaContext.evaluateeTermLC} evaluations. 
      Districts can choose to allow school admins and principals to perform these tasks. Check the delegate to schools button to give schools the ability to perform these tasks.
    </Typography>
    {assignmentsDelegatedToAllSchools?
      (<Alert severity="info" sx={{mb:2}}>Assignments have been delegated to all schools</Alert>):
      (
        <Button 
        sx={{mb:2}} 
        color="secondary" 
        size="small" 
        variant="contained"
        onClick={handleClickDelegateToAllSchools}
        >
          Delegate to All Schools
        </Button>
      )}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="center">Delegate to School</TableCell>
            <TableCell align="center">School</TableCell>
            <TableCell align="center">Principals</TableCell>
            <TableCell align="center">Teachers</TableCell>
            <TableCell align="center">Assigned</TableCell>
            <TableCell align="center">Teachers Awaiting Assignment</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summaries.map((row) => (
            <TableRow key={row.schoolName}>
               <TableCell align="center">
                <Checkbox 
                  color="secondary"
                  checked={row.delegated} 
                  onChange={(event)=>{
                    toggleDelegation(row, event);
                  }}
                  />
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.schoolName}
              </TableCell>
              <TableCell align="center">{row.principalNames.map(x=>(<Typography key={x}>{x}</Typography>))}</TableCell>
              <TableCell align="center">{row.totalCount}</TableCell>
              <TableCell align="center">{row.assignedCount}</TableCell>
              <TableCell align="center">
                {row.unassignedCount===0 && <CheckIcon color="secondary" fontSize="small"/>}
                {row.unassignedCount>0 && row.unassignedCount}
              </TableCell>
              <TableCell align="center">
                <Button component={RouterLink} to={`/app/admin/assignments/tr-assignments-summary/assignments-detail/${row.schoolCode}`} color="secondary" size="small" variant="contained">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default AssignmentsSummary;