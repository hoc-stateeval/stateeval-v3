import { useSelector } from 'react-redux';
import { 
  Typography 
} from '@mui/material';

import { selectActiveFramework } from '../store/stateEval/userContextSlice';
import { selectActiveEvaluation } from '../store/stateEval/userContextSlice';

function Test(props) {
  const activeFramework = useSelector(selectActiveFramework);
  const activeEvaluation = useSelector(selectActiveEvaluation);
  return (
    <>
      <Typography variant="h1">{activeFramework?.name}</Typography>
      <Typography variant="h1">{activeEvaluation?.evaluateeDisplayName}</Typography>
    </>
  );
};

export default Test;