import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';

import { selectActiveFramework } from '../../../../store/stateEval/userContextSlice';

function EvaluateeDashboard() {
  const activeFramework = useSelector(selectActiveFramework);

  return (
    <>
      <Typography>Evaluatee Dashboard</Typography>
      <Typography>{activeFramework?.name}</Typography>
    </>
  );
}

export default EvaluateeDashboard;
