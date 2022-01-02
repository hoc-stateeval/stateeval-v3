import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MenuItem,
  TextField,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { getSelectStyles } from './selectItemStyles';

import {
  setActiveEvaluationId,
  selectActiveEvaluationId,
} from '../../store/stateEval/userContextSlice';

 import {
  selectActiveWorkAreaContext,
} from '../../store/stateEval/userContextSlice';


const EvaluationDropDown = (evaluations) => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const workAreaContext = useSelector(selectActiveWorkAreaContext);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);

  const [selectedEvaluationId, setSelectedEvaluationId] = useState(activeEvaluationId ?? "0");

  const changeEvaluation = async (id) => {
    setSelectedEvaluationId(id);
    dispatch(setActiveEvaluationId(id));
  }
  return (
    <>
    {evaluations &&
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
                {evaluations.map((x) => (
                  <MenuItem key={`evaluation-${x.id}`} value={x.id}>
                    {x.evaluateeDisplayName}
                  </MenuItem>
                ))}
      </TextField>
      }
    </>
  );
};

export default EvaluationDropDown;

