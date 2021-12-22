import {
  Box,
  Typography,
} from '@mui/material';
import EvaluationSwitcher from '../../components/EvaluationSwitcher';

const SidebarEvaluatingDropdown = ({ currentWorkAreaContext }) => {
  return (
    <Box sx={{
      color: theme => theme.palette.neutral[400],
      pl:2, pb:2
        }}>
      <Typography variant="sideBar" sx={{mt: 1}} >Evaluating:</Typography>
      <EvaluationSwitcher />
    </Box>
  );
};

export default SidebarEvaluatingDropdown;