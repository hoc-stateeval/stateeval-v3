import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MenuItem,
  TextField,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import { DistrictViewerSchoolEvaluatorWorkAreas, WorkAreas } from '../../core/workAreas';
import { getSelectStyles } from './selectItemStyles';

import {
  useGetEvaluatorsForDistrictViewerQuery,
 } from '../../core/apiSlice';

 import {
  setActiveDistrictViewerEvaluatorId,
  selectActiveWorkAreaContext,
  selectActiveDistrictViewerEvaluatorId,
  selectActiveDistrictViewerSchoolCode,
} from '../../store/stateEval/userContextSlice';

const buildEvaluatorLabel = (tagName) => {
  if (tagName === WorkAreas.DV_PR_PR) {
    return "Head Principal";
  }
  else if (tagName === WorkAreas.DV_PR_TR) {
    return "Principal";
  }
  else if (tagName === WorkAreas.DV_DE) {
    return "District Evaluator";
  }
  else if (tagName === WorkAreas.DV_DTE) {
    return "District-wide Teacher Evaluator";
  }
  else if (tagName === WorkAreas.DV_CT) {
    return "Consulting Teacher";
  }
  return "Evaluator";
}

const DistrictViewerEvaluatorDropDown = () => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const activeDistrictViewerEvaluatorId = useSelector(selectActiveDistrictViewerEvaluatorId);
  const activeDistrictViewerSchoolCode = useSelector(selectActiveDistrictViewerSchoolCode);

  const [selectedDistrictViewerEvaluatorId, setSelectedDistrictViewerEvaluatorId] = useState(activeDistrictViewerEvaluatorId?.id ?? "0");
 
  const waitOnSchoolSelection = 
    DistrictViewerSchoolEvaluatorWorkAreas.includes(activeWorkAreaContext.tagName) &&
    activeDistrictViewerSchoolCode==="0";

  const { data: evaluators } = useGetEvaluatorsForDistrictViewerQuery({
    workAreaContextId: activeWorkAreaContext.id,
    schoolCode: activeDistrictViewerSchoolCode,
  }, {skip: waitOnSchoolSelection});

  const changeDistrictViewerEvaluator = async (evaluatorId) => {
    setSelectedDistrictViewerEvaluatorId(evaluatorId);
    dispatch(setActiveDistrictViewerEvaluatorId(evaluatorId));
  }
  return (
    <>
      <TextField label={buildEvaluatorLabel(activeWorkAreaContext.tagName)} sx={{...getSelectStyles(theme)}}
        select
        value={selectedDistrictViewerEvaluatorId}
        onChange={(e)=> {
          changeDistrictViewerEvaluator(parseInt(e.target.value, 10));
        }}
        >
          <MenuItem key="default" value="0">
            Select an evaluator
          </MenuItem>
          {evaluators && evaluators.map((x) => (
            <MenuItem key={`dv-evaluator-${x.id}`} value={x.id}>
              {x.displayName}
            </MenuItem>
          ))}
      </TextField>

    </>
  );
};

export default DistrictViewerEvaluatorDropDown;