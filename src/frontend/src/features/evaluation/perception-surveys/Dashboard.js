import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";

import { setPageTitle } from "@user-context-slice";

import { useGetPerceptionSurveyByIdQuery } from "@api-slice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const pageTitle = "Perception Surveys Dashboard";

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: survey} = useGetPerceptionSurveyByIdQuery(1);

  return (
    <>
      <Typography variant="h2">{pageTitle}</Typography>
      {survey && 
        <Typography variant="h2">{survey.title}</Typography>
      }
    </>
  );
};

export default Dashboard;
