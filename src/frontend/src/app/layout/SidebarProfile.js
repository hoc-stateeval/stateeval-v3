import {
  Avatar,
  Box,
  Typography,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

const SidebarProfile = ({ currentUser, currentWorkAreaContext}) => {
  const theme = useTheme();

  const styles = {
    workArea: {
      color: '#8095a8',
      fontSize: '.688rem',
    }
  }
  return (
    <>
      <Box  component="div" sx={{...styles.workArea}}>
      <Typography sx={{fontSize:'.688rem'}}>{currentWorkAreaContext.districtName}</Typography>
      {currentWorkAreaContext.schoolName ?
      (<Typography sx={{fontSize:'.688rem'}}>{currentWorkAreaContext.schoolName}</Typography>) :(<></>)}
      <Typography sx={{fontSize:'.688rem'}}>{currentWorkAreaContext.title}</Typography>
    </Box>
    </>
  );
};

export default SidebarProfile;