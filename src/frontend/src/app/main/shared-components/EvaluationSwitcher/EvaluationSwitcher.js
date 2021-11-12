
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectEvaluationsAll,
  selectActiveEvaluationId,
  setActiveEvaluationId,
} from '../../../store/stateEval/userContextSlice';

function EvaluationSwitcher() {
  const dispatch = useDispatch();
  const evaluations = useSelector(selectEvaluationsAll);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);

  const changeSelectedEvaluation = (e) => {
    const evaluationId = parseInt(e.target.value, 10);
    dispatch(setActiveEvaluationId(evaluationId));
  };

  return (
    <>
      <Select
        value={activeEvaluationId}
        onChange={changeSelectedEvaluation}
        displayEmpty
        name="evaluation"
        classes={{ select: 'py-8' }}
      >
        {evaluations.map((x) => (
          <MenuItem key={x.id} value={x.id}>
            {x.evaluateeDisplayName}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

export default EvaluationSwitcher;


