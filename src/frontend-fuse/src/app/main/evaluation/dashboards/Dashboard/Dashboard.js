import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { selectActiveWorkAreaContext } from '../../../../store/stateEval/userContextSlice';
import EvaluatorDashboard from '../EvaluatorDashboard/EvaluatorDashboard';
import EvaluateeDashboard from '../EvaluateeDashboard/EvaluateeDashboard';
import authRoles from '../../../../auth/authRoles';

function Dashboard() {
  const workAreaContext = useSelector(selectActiveWorkAreaContext);

  return (
    <>
      <Typography>Dashboard</Typography>
      {workAreaContext.isEvaluator && <EvaluatorDashboard />}
      {workAreaContext.isEvaluatee && <EvaluateeDashboard />}
    </>
  );
}

export default Dashboard;
