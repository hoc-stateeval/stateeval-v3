import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useErrorHandler } from 'react-error-boundary';

import { 
  Stack,
} from "@mui/material";

import CollectedEvidenceSection from "./CollectedEvidenceSection";
import RubricAlignmentSection from "./RubricAlignmentSection";
import PageHeader from "@components/PageHeader";
import PackagedEvidenceSection from "./PackagedEvidenceSection";

import {
  selectActiveFrameworkId
} from "@user-context-slice";

import { 
  selectActiveFrameworkNodeId,
  selectActiveRubricRowId,
} from "@evidence-collection-slice";

import {
  useGetFrameworkByIdQuery
} from "@api-slice";

import {
  getRubricRow
} from "@lib/eval-helpers";


 const RubricRowView = () => {
  const errorHandler = useErrorHandler();
  const [activeRubricRow, setActiveRubricRow] = useState(null);

  const activeFrameworkId = useSelector(selectActiveFrameworkId);
  const activeFrameworkNodeId = useSelector(selectActiveFrameworkNodeId);
  const activeRubricRowId = useSelector(selectActiveRubricRowId);

  const { data: activeFramework, error: getFrameworkError } = 
    useGetFrameworkByIdQuery(activeFrameworkId);
  if (getFrameworkError) errorHandler(getFrameworkError);

  useEffect(()=> {
    if (!activeFramework) return;
    setActiveRubricRow(activeFramework.rubricRowMap[activeRubricRowId]);

  }, [activeFramework, activeFrameworkNodeId, activeRubricRowId])

  return (
    <>
      <PageHeader title={`${activeRubricRow?.shortName} - ${activeRubricRow?.title}`} />
      <Stack spacing={4}>
        <CollectedEvidenceSection />
        <RubricAlignmentSection />
        <PackagedEvidenceSection/>
      </Stack>
    </>
  );
};

export default RubricRowView;