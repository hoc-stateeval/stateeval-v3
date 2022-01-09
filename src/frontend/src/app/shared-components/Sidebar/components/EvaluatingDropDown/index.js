import { useDispatch, useSelector } from 'react-redux';

import {
  MenuItem,
  TextField,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { getSelectStyles } from '../../selectItemStyles';

import {
  setActiveEvaluation,
  selectActiveEvaluationId,
  selectActiveWorkAreaContext,
} from '../../../../store/stateEval/userContextSlice';

export const EvaluatingDropDown = ({evaluations}) => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const workAreaContext = useSelector(selectActiveWorkAreaContext);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);

  const changeEvaluation = async (id) => {
    const evaluation = evaluations.find(x=>x.id===id);
    dispatch(setActiveEvaluation(evaluation));
  }
  return (
    <>
    {evaluations &&
     <TextField label="Evaluating" sx={{...getSelectStyles(theme, activeEvaluationId==="0"?'red':'white')}}
              select
              value={activeEvaluationId}
              onChange={(e)=> {
                changeEvaluation(parseInt(e.target.value, 10))
              }}
              >
                {activeEvaluationId==="0" &&
                  <MenuItem key="default" value="0">
                  Select a {workAreaContext.evaluateeTerm}
                </MenuItem>
                }
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



