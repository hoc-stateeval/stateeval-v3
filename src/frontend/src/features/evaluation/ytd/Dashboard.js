import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
} from "@mui/material";

import { 
  setPageTitle, 
} from "@user-context-slice";

 import {
  initializeEvidenceCollectionState,
  selectEvidenceItems,
} from "@evidence-collection-slice";

import { EvidenceCollection } from '@components';

const Dashboard = () => {

  const dispatch = useDispatch();
  const pageTitle = "DA TR Dashboard";
  const evidenceItems = useSelector(selectEvidenceItems);
   
  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
  }, []);

 
  useEffect(()=> {
    dispatch(initializeEvidenceCollectionState());
  }, []);

  if (!evidenceItems) {
    return (<></>);
  }

  return (
    <>
      {/* <Typography variant="h2">{pageTitle}</Typography> */}
      <EvidenceCollection evidenceItems={evidenceItems} />
    </>
  );
};

export default Dashboard;
