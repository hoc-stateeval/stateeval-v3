import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";

import { setPageTitle } from "@user-context-slice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const pageTitle = "Prompt Bank Dashboard";

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h2">{pageTitle}</Typography>
    </>
  );
};

export default Dashboard;
