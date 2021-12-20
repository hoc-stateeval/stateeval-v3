import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import {
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
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
  setPageTitle,
} from '../../../store/stateEval/userContextSlice';

import PageHeader from '../../../components/PageHeader';

import {
  buildLastYearPlanTypeDisplayString,
  buildSuggestedPlanTypeDisplayString
} from '../../../core/evalPlanType';

import PlanTypeField from './PlanTypeField';
import buildAssignmentData from './buildAssignmentData';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  backgroundColor: theme.palette.primary,
  color: theme.palette.text.primary
}));

const AssignmentsDetail = () => {

  const dispatch = useDispatch();
 
  const { schoolCode, schoolName } = useParams();
  const [assignmentData, setAssignmentData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [assignedCount, setAssignedCount] = useState(0);
  const [hideCompleted, setHideCompleted] = useState(false);

  const workAreaContext = useSelector(selectActiveWorkAreaContext);
  const impersonating = useSelector(selectImpersonating);

  const pageHeaderTitle = `Assignments for ${schoolName?schoolName:'Principals'}`;

  useEffect(()=> {
    dispatch(setPageTitle(`Assignments for ${workAreaContext.evaluateeTerm} Evaluations`));
  }, [workAreaContext, dispatch]);

  useEffect(()=> {
    (async () => {
      const data = await buildAssignmentData(impersonating, workAreaContext, schoolCode||'', schoolName||'');
      setAssignmentData(data);

      const assignedCount = data.evaluationSummaries.reduce((assignedCount, next) => {
        if (next.evaluatorId)
          assignedCount++;
        return assignedCount;
      }, 0);

      setTotalCount(data.evaluationSummaries.length);
      setAssignedCount(assignedCount);
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

  const toggleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  }

  const evalSetupComplete = (evalSummary) => {
    return evalSummary.evaluatorId && evalSummary.planType;
  }

  return (
    <>
    <PageHeader title={pageHeaderTitle}>
      This page lets you select the Evaluation Cycle and the Evaluator for {workAreaContext.evaluateeTermLC}s.
    </PageHeader>

    <Stack direction="row" sx={{alignItems: 'center', mb:3}} spacing={3}>
        <Item><strong>{workAreaContext.evaluateeTerm}s:&nbsp;</strong>{totalCount}</Item>
        <Item><strong>Assigned:&nbsp;</strong>{assignedCount}</Item>
        <Item><strong>Awaiting Assignment:&nbsp;</strong>{totalCount-assignedCount}</Item>
    </Stack>

     <FormControlLabel control={<Checkbox checked={hideCompleted} onChange={()=>{toggleHideCompleted()}} />} label="Hide Completed" />

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
          {assignmentData && 
          assignmentData.evaluationSummaries.filter(x=>hideCompleted?!evalSetupComplete(x):x).map((evalSummary) => (
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

