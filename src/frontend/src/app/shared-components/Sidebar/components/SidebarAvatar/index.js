import {
  Avatar,
  Box,
  Typography,
} from '@mui/material';

export const SidebarAvatar = ({ currentUser }) => {
  return (
    <>
     <Box sx={{
       color: '#dfe4ed', 
       backgroundColor: theme => theme.palette.neutral[1000],
       pt:2, 
       pb:2
       }}>
        <Box sx={{
          pl:2
          }}>
          <Avatar alt="profile image" src={currentUser?.profileImageURL} />
          <Typography variant="sideBar">{currentUser?.displayName}</Typography>
        </Box>           
      </Box>
    </>
  );
};
