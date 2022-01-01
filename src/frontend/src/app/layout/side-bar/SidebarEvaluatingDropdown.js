import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  MenuItem,
  TextField,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { getSelectStyles } from './selectItemStyles';

import {
  useGetEvaluationsForWorkAreaContextQuery,
 } from '../../core/apiSlice';

 import {
  setActiveEvaluationId,
} from '../../store/stateEval/userContextSlice';

const SidebarEvaluatingDropdown = ({ workAreaContext }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [selectedEvaluationId, setSelectedEvaluationId] = useState("0");

  const { data: evaluations } = useGetEvaluationsForWorkAreaContextQuery(workAreaContext.id);

  const changeEvaluation = async (id) => {
    setSelectedEvaluationId(id);
    dispatch(setActiveEvaluationId(id));
  }

  return (
    <>
      <TextField label="Evaluating" sx={{...getSelectStyles(theme, selectedEvaluationId==="0"?'red':'white')}}
              select
              value={selectedEvaluationId}
              onChange={(e)=> {
                changeEvaluation(parseInt(e.target.value, 10))
              }}
              >
                <MenuItem key="default" value="0">
                  Select a {workAreaContext.evaluateeTerm}
                </MenuItem>
                {evaluations && evaluations.map((x) => (
                  <MenuItem key={`evaluation-${x.id}`} value={x.id}>
                    {x.evaluateeDisplayName}
                  </MenuItem>
                ))}
      </TextField>
    </>
  );
};

export default SidebarEvaluatingDropdown;