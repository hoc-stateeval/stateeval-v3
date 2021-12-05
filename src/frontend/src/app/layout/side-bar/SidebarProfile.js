import {
  Box,
  Typography,
} from '@mui/material';

import ChangeWorkAreaDialog from './ChangeWorkAreaDialog';

const SidebarProfile = ({ currentWorkAreaContext}) => {

  return (
    <>
      <Box
            sx={{
            pl:2,
            display: 'flex',
            flexDirection: 'column',
            alignItems:'left',
          }}>
        <Typography variant="sideBarProfile">{currentWorkAreaContext.districtName}</Typography>
        {currentWorkAreaContext.schoolName ?
        (<Typography variant="sideBarProfile">{currentWorkAreaContext.schoolName}</Typography>) :(<></>)}
        <Typography variant="sideBarProfile">{currentWorkAreaContext.title}</Typography>
        <ChangeWorkAreaDialog />
      </Box>
    </>
  );
};

export default SidebarProfile;