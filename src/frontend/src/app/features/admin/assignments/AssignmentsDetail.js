import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { get } from '../../../core/api';
import {
  selectActiveWorkAreaContext,
} from '../../../store/stateEval/userContextSlice';

import {
  buildLastYearPlanTypeDisplayString,
  buildSuggestedPlanTypeDisplayString
} from '../../../core/evalPlanType';

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

  const setEvaluateePlanType =  async (id, planType) => {

    // const evalData = assignmentData.find(x=>x.id==id);
    
    // const url = `/api/evaluations/${id}/updateplantype/`;
      // const response = await put(url, {
      //   evaluationId: id,
      //   evaluateePlanType: planType,
      //   focusedFrameworkNodeId: planType === PlanType.COMPREHENSIVE?null:
      //   focusedSGFrameworkNodeId { get; }
      //   public SchoolYear? CarryForwardSchoolYear { get; }
      //   public RubricPerformanceLevel? CarryForwardPerformanceLevel { get;  }
      // });
      // const data = await response.data;
      // setAssignmentData(data);
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
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
              <TableCell align="center" component="th" scope="row">
                {row.evaluateeDisplayName}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {buildLastYearPlanTypeDisplayString(row)}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
              {buildSuggestedPlanTypeDisplayString(row)}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                <TextField sx={{minWidth:'100px'}}
                select
                value={row.evaluateePlanType}
                onChange={(e) => {
                  setEvaluateePlanType(row.id, parseInt(e.target.value));
                }}
              >
                  <MenuItem value="0">Not Set</MenuItem>
                  <MenuItem value="1">Comprehensive</MenuItem>
                  <MenuItem value="2">Focused</MenuItem>
                  <MenuItem value="3">Modified Comprehensive</MenuItem>
              </TextField>
              </TableCell>
              <TableCell align="center" component="th" scope="row">
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

