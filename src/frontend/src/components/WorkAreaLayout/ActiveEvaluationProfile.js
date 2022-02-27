import { useSelector } from "react-redux";
import { useErrorHandler } from "react-error-boundary";

import { Avatar, Box, Typography } from "@mui/material";

import { selectActiveEvaluationId } from "@user-context-slice";

import {
  useGetEvaluationByIdQuery
} from "@api-slice";

import blankProfile from "@images/blank-profile-48x48.png";

import { PlanTypeDisplay } from "@components";

const ActiveEvaluationProfile = () => {
  const errorHandler = useErrorHandler();

  const activeEvaluationId = useSelector(selectActiveEvaluationId);

  const { data: evaluation, isSuccess: getEvaluationSuccess, error: getEvaluationError } = 
    useGetEvaluationByIdQuery(activeEvaluationId);
  if (getEvaluationError) errorHandler(getEvaluationError);

  if (!getEvaluationSuccess) {
    return (<></>);
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ pr: 1 }}>
          <PlanTypeDisplay evaluation={evaluation} />
          <Typography>{evaluation.evaluateeDisplayName}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Avatar
            alt="profile image"
            src={
              evaluation.profileImageUrl
                ? evaluation.profileImageUrl
                : blankProfile
            }
          />
        </Box>
      </Box>
    </>
  );
};

export default ActiveEvaluationProfile;
