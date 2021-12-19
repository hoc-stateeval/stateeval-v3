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

import { put } from '../../../core/api';
import {
  selectActiveWorkAreaContext,
  selectImpersonating,
} from '../../../store/stateEval/userContextSlice';

import {
  buildLastYearPlanTypeDisplayString,
  buildSuggestedPlanTypeDisplayString
} from '../../../core/evalPlanType';

import PlanTypeField from './PlanTypeField';
import buildAssignmentData from './buildAssignmentData';

const AssignmentsDetail = () => {

  const { schoolCode, schoolName } = useParams();
  const [assignmentData, setAssignmentData] = useState(null);

  const workAreaContext = useSelector(selectActiveWorkAreaContext);
  const impersonating = useSelector(selectImpersonating);

  useEffect(()=> {
    (async () => {
      const data = await buildAssignmentData(impersonating, workAreaContext, schoolCode, schoolName);
      setAssignmentData(data);
    })();
  }, [workAreaContext, schoolCode, schoolName, impersonating]);

  const setEvaluator = async (id, evaluatorId) => {

    const url = `evaluations/${id}/updateevaluator`;
    const response = await put(url, {
      evaluationId: id,
      evaluatorId: evaluatorId===0?null:evaluatorId
    });

    const data = response.data;

    assignmentData.evaluationSummaries = assignmentData.evaluationSummaries.map(x=>(x.id===id?data:x));
    setAssignmentData({...assignmentData});
  };

  return (
    <>
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">{workAreaContext.evaluateeTerm}</TableCell>
            <TableCell align="center">Last Year Evaluation Type</TableCell>
            <TableCell align="center">Suggested Evaluation Type</TableCell>
            <TableCell align="center">Evaluation Type</TableCell>
            <TableCell align="center">Evaluator</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  >
          {assignmentData && assignmentData.evaluationSummaries.map((evalSummary) => (
            <TableRow key={evalSummary.id}>
              <TableCell align="center">
                {evalSummary.evaluateeDisplayName}
              </TableCell>
              <TableCell align="center">
                {buildLastYearPlanTypeDisplayString(evalSummary)}
              </TableCell>
              <TableCell align="center">
              {buildSuggestedPlanTypeDisplayString(evalSummary)}
              </TableCell>
              <TableCell align="center">
                <PlanTypeField evalSummary={evalSummary} />
              </TableCell>
              <TableCell align="center">
              <TextField sx={{
                  minWidth:'120px', 
                  }} 
                  size="small"
                  select
                  value={evalSummary.evaluatorId?evalSummary.evaluatorId:"0"}
                  onChange={(e) => {
                    setEvaluator(evalSummary.id, parseInt(e.target.value));
                  }}
                >
                  <MenuItem value="0">Not Set</MenuItem>
                  {assignmentData.evaluators[evalSummary.evaluateeId].map((x, index)=> (
                    <MenuItem key={index} value={x.id}>{x.displayName}</MenuItem>
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

