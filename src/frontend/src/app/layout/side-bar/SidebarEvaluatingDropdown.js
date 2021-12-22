import {
  Box,
  Typography,
} from '@mui/material';
import backgroundImg from '../../../images/header-profile.png';
import EvaluationSwitcher from '../../components/EvaluationSwitcher';

const styles = {
  evaluating: {
    color: '#dfe4ed',
    background: `url(${backgroundImg})`,
  },
}

const SidebarEvaluatingDropdown = ({ currentWorkAreaContext }) => {
  return (
    <Box sx={{...styles.evaluating, pl:2, pb:2}}>
      <Typography variant="sideBar" sx={{mt: 1}} >Evaluating:</Typography>
      <EvaluationSwitcher />
    </Box>
  );
};

export default SidebarEvaluatingDropdown;