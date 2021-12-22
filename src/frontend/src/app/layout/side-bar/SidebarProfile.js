import {
  List,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material';

import ChangeWorkAreaDialog from './ChangeWorkAreaDialog';
import { getListSubheaderStyles } from './listItemStyles';

const SidebarProfile = ({ currentWorkAreaContext}) => {

  return (
    <>
    <List sx={{pl:2}}
      subheader={(
        <ListSubheader variant="sideBar"
          disableGutters
          disableSticky
          sx={{ ...getListSubheaderStyles()
          }}
        >
          Work-area
        </ListSubheader>
      )}
    >
      <Stack sx={{color: theme => theme.palette.neutral[400]}}>
        <Typography variant="sideBarProfile">{currentWorkAreaContext.districtName}</Typography>
        {currentWorkAreaContext.schoolName &&<Typography variant="sideBarProfile">{currentWorkAreaContext.schoolName}</Typography>}
        <Typography variant="sideBarProfile">{currentWorkAreaContext.title}</Typography>
        <ChangeWorkAreaDialog />
      </Stack>
    </List>
      {/* <Box
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
      </Box> */}
    </>
  );
};

export default SidebarProfile;