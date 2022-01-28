import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Box,
} from "@mui/material";

import { 
  selectActiveEvaluationId,
  setPageTitle, 
} from "@user-context-slice";

import { 
  useGetYearToDateEvidenceItemsQuery,
 } from "@api-slice";

import { EvidenceCollection } from '@components';

const Dashboard = () => {

  const dispatch = useDispatch();
  const pageTitle = "DA TR Dashboard";

  const activeEvaluationId = useSelector(selectActiveEvaluationId);
  const { data: evidenceItems } = useGetYearToDateEvidenceItemsQuery({ evaluationId: activeEvaluationId });
 
  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    // throw Error("something happened");
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
