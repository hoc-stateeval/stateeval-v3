import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
} from '@mui/material';

import { get, put } from '../../../core/api';
import {
  selectActiveWorkAreaContext,
} from '../../../store/stateEval/userContextSlice';

import {
  buildLastYearPlanTypeDisplayString,
  buildSuggestedPlanTypeDisplayString
} from '../../../core/evalPlanType';

import PlanTypeField from './PlanTypeField';

const AssignmentsDetail = () => {

  const { schoolCode } = useParams();

  const workAreaContext = useSelector(selectActiveWorkAreaContext);
  const [assignmentData, setAssignmentData] = useState(null);

  useEffect(()=> {

    (async () => {
      const frameworkContextId = workAreaContext.frameworkContextId;
      const schoolCodeParam = schoolCode? schoolCode: workAreaContext.schoolCode;
      const url = `assignments/tr-assignments-summary/assignments-detail/${frameworkContextId}/${schoolCodeParam}`;
      const response = await get(url);
      const data = await response.data;
      setAssignmentData(data);
    })();

  }, [workAreaContext, schoolCode]);

  const setEvaluator = async (id, evaluatorId) => {

    const url = `evaluations/${id}/updateevaluator`;
    const response = await put(url, {
      evaluationId: id,
      evaluatorId: evaluatorId===0?null:evaluatorId
    });

    const data = response.data;

    assignmentData.teacherEvaluationSummaries = assignmentData.teacherEvaluationSummaries.map(x=>(x.id===id?data:x));
    setAssignmentData({...assignmentData});
  };

  return (
    <>
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Teacher</TableCell>
            <TableCell align="center">Last Year Evaluation Type</TableCell>
            <TableCell align="center">Suggested Evaluation Type</TableCell>
            <TableCell align="center">Evaluation Type</TableCell>
            <TableCell align="center">Evaluator</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  >
          {assignmentData && assignmentData.teacherEvaluationSummaries.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">
                {row.evaluateeDisplayName}
              </TableCell>
              <TableCell align="center">
                {buildLastYearPlanTypeDisplayString(row)}
              </TableCell>
              <TableCell align="center">
              {buildSuggestedPlanTypeDisplayString(row)}
              </TableCell>
              <TableCell align="center">
                {/* <TextField sx={{minWidth:'120px'}} size="small"
                  select
                  value={row.planType?row.planType:"0"}
                  onChange={(e) => {
                    setEvaluateePlanType(row.id, parseInt(e.target.value));
                  }}
                >
                  <MenuItem value="0">Not Set</MenuItem>
                  <MenuItem value="1">Comprehensive</MenuItem>
                  <MenuItem value="2">Focused</MenuItem>
                  <MenuItem value="3">Modified Comprehensive</MenuItem>
                </TextField> */}
                <PlanTypeField row={row} />
              </TableCell>
              <TableCell align="center">
              <TextField sx={{minWidth:'120px'}} size="small"
                  select
                  value={row.evaluatorId?row.evaluatorId:"0"}
                  onChange={(e) => {
                    setEvaluator(row.id, parseInt(e.target.value));
                  }}
                >
                  <MenuItem value="0">Not Set</MenuItem>
                  {assignmentData.principals.map(x=> (
                    <MenuItem value={x.id}>{x.displayName}</MenuItem>
                  ))}
                </TextField>
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

