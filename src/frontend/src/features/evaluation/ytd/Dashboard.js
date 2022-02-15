import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
} from "@mui/material";

import { 
  setPageTitle, 
  selectActiveWorkAreaContext,
  selectActiveEvaluationId
} from "@user-context-slice";

 import {
  initializeEvidenceCollectionState,
} from "@evidence-collection-slice";

import { EvidenceCollectionType } from '@lib/enums';

import { EvidenceCollection } from '@components';

const Dashboard = () => {

  const dispatch = useDispatch();
  const pageTitle = "YTD Dashboard";

  const [initialized, setInitialized] = useState(false);
  const evaluationId = useSelector(selectActiveEvaluationId);
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  
  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
  }, []);

 
  useEffect(()=> {
    const initializeEvidenceCollection = async () => {
      await dispatch(initializeEvidenceCollectionState(
        {
          workAreaContext: activeWorkAreaContext,
          collectionType: EvidenceCollectionType.YTD,
          collectionObjectId: evaluationId,
          evaluationId: evaluationId
        }));

        setInitialized(true);
    }

    initializeEvidenceCollection();
   
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
