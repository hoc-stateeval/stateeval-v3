import { useSelector } from 'react-redux';
import { 
  Typography 
} from '@mui/material';

import { selectActiveFramework } from '../store/stateEval/userContextSlice';

function Test(props) {
  const activeFramework = useSelector(selectActiveFramework);
  return (
    <>
      <Typography variant="h1">{activeFramework?.name}</Typography>
    </>
  );
};

export default Test;