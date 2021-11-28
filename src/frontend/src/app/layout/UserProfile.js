import {
  Avatar,
  Typography,
} from '@mui/material';

const UserProfile = ({ currentUser, currentWorkAreaContext}) => {
  return (
    <>
      <Avatar alt="profile image" src={currentUser?.profileImageURL} />
      <Typography variant="h5">{currentUser?.displayName}</Typography>
      <Typography variant="profile">{currentWorkAreaContext.districtName}</Typography>
      {currentWorkAreaContext.schoolName ?
      (<Typography variant="profile">{currentWorkAreaContext.schoolName}</Typography>) :(<></>)}
      <Typography variant="profile">{currentWorkAreaContext.title}</Typography>
    </>
  );
};

export default UserProfile;