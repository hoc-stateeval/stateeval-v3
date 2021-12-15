import {
  Avatar,
  Box,
  Typography,
} from '@mui/material';
import backgroundImg from '../../../images/header-profile.png';


const SidebarAvatar = ({ currentUser }) => {
  return (
    <>
     <Box sx={{
       color: '#dfe4ed', 
       background: `url(${backgroundImg})`, 
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

export default SidebarAvatar;