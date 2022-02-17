import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { 
} from "@mui/material";

import { 
  setPageTitle, 
} from "@user-context-slice";

 import {
  initYearToDateEC,
} from "@evidence-collection-slice";

import { EvidenceCollection } from '@components';

const Dashboard = () => {

  const dispatch = useDispatch();
  const pageTitle = "YTD Dashboard";

  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
  }, []);

 
  useEffect(()=> {
    const initEvidenceCollection = async () => {
      await dispatch(initYearToDateEC());
      setInitialized(true);
    }

    initEvidenceCollection();
   
  }, []);

  if (!initialized) {
    return (<></>);
  }

  return (
    <>
      {/* <Typography variant="h2">{pageTitle}</Typography> */}
      <EvidenceCollection  />
    </>
  );
};

export default Dashboard;
