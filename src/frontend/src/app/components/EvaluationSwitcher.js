import { useSelector, useDispatch } from 'react-redux';
import {
  MenuItem,
  TextField,
} from '@mui/material';
import {
  selectEvaluationsAll,
  selectActiveEvaluationId,
  setActiveEvaluationId,
  selectActiveWorkAreaContext,
} from '../store/stateEval/userContextSlice';

function EvaluationSwitcher() {
  const dispatch = useDispatch();
  const evaluations = useSelector(selectEvaluationsAll);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);
  const workAreaContext = useSelector(selectActiveWorkAreaContext);

  const changeSelectedEvaluation = (e) => {
    const evaluationId = parseInt(e.target.value, 10);
    dispatch(setActiveEvaluationId(evaluationId));
  };

  if (!workAreaContext.isEvaluator) {
    return (
      <></>
    );
  }

  return (
    <TextField
        size="small"
        sx={{ 
          width: 200, 
        }}
        select
        value={activeEvaluationId}
        onChange={changeSelectedEvaluation}
      >
         {activeEvaluationId?(<></>):(
          <MenuItem key="default" value="0">
          Select a Teacher
        </MenuItem>
        )}
        {evaluations.map((x) => (
          <MenuItem key={x.id} value={x.id}>
            {x.evaluateeDisplayName}
          </MenuItem>
        ))}
      </TextField>
  );
}

export default EvaluationSwitcher;


