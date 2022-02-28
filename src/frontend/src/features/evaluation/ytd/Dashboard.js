import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useErrorHandler } from 'react-error-boundary';
import { 
} from "@mui/material";

import {
  useGetFrameworkByIdQuery
} from "@api-slice";

import { 
  setPageTitle,
  selectActiveEvaluationId,
  selectActiveFrameworkId
} from "@user-context-slice";

 import {
  setActiveCollection
} from "@evidence-collection-slice";

import { EvidenceCollectionType } from "@lib/enums";

import { EvidenceCollection } from '@components';

const Dashboard = () => {

  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();

  const [initialized, setInitialized] = useState(false);

  const pageTitle = "YTD Dashboard";

  const activeEvaluationId = useSelector(selectActiveEvaluationId);
  const activeFrameworkId = useSelector(selectActiveFrameworkId);

  const { data: activeFramework, error: getFrameworkError } = 
    useGetFrameworkByIdQuery(activeFrameworkId);
  if (getFrameworkError) errorHandler(getFrameworkError);
  
  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    dispatch(setActiveCollection({
      collectionType: EvidenceCollectionType.YEAR_TO_DATE,
      collectionObjectId: activeEvaluationId,
      activeFrameworkNodeId: activeFramework.frameworkNodes[0].id
    }));
    setInitialized(true);
  }, [activeFramework, activeEvaluationId]);

  if (!initialized) return (<></>);

  return (
    <>
      {/* <Typography variant="h2">{pageTitle}</Typography> */}
      <EvidenceCollection  />
    </>
  );
};

export default Dashboard;
