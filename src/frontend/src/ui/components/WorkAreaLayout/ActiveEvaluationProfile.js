import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Typography
} from '@mui/material';

import {
  selectActiveEvaluation,
} from '@store/stateEval/userContextSlice';

import blankProfile from '@images/blank-profile-48x48.png';

import { PlanTypeDisplay } from '@ui/components';

const ActiveEvaluationProfile = () => {

  const activeEvaluation = useSelector(selectActiveEvaluation);
 
  if (!activeEvaluation) {
    return (<></>);
  }

  return (
    <>
      <Box sx={{display:'flex'}}>
        <Box sx={{pr:1}}>
          <PlanTypeDisplay evaluation={activeEvaluation}/>
          <Typography>{activeEvaluation.evaluateeDisplayName}</Typography>
        </Box>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent: 'center'}}>
          <Avatar alt="profile image" 
            src={activeEvaluation.profileImageUrl?activeEvaluation.profileImageUrl:blankProfile} />
        </Box>
      </Box>
    </>
  );
};

export default ActiveEvaluationProfile;
