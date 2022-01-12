import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Box,
  Typography 
} from "@mui/material";

import { setPageTitle } from "@user-context-slice";

import {
  selectActiveFrameworkNode,
  selectActiveRubricRow,
} from "@rubric-navigator-slice";

import { RubricNavigator } from '@components';

const Dashboard = () => {
  const dispatch = useDispatch();
  const pageTitle = "DA TR Dashboard";

  const activeFrameworkNode = useSelector(selectActiveFrameworkNode);
  const activeRubricRow = useSelector(selectActiveRubricRow);

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    // throw Error("something happened");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h2">{pageTitle}</Typography>
      
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Box sx={{width:'80%'}}>
          <Typography variant="h2" >
            {activeFrameworkNode?.shortName} - {activeFrameworkNode?.title}
          </Typography>
          <Typography variant="h2">
            {activeRubricRow?.shortName} - {activeRubricRow?.title}
          </Typography>
        </Box>
        <RubricNavigator/>
      </Box>
    </>
  );
};

export default Dashboard;
