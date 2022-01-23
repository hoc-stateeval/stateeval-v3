import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { 
  Box,
} from "@mui/material";

import { 
  setPageTitle, 
} from "@user-context-slice";

import { EvidenceCollection } from '@components';

const Dashboard = () => {

  const dispatch = useDispatch();
  const pageTitle = "DA TR Dashboard";

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    // throw Error("something happened");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* <Typography variant="h2">{pageTitle}</Typography> */}
      <EvidenceCollection/>
    </>
  );
};

export default Dashboard;
