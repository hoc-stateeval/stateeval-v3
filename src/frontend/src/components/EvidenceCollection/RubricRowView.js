import { useSelector } from "react-redux";
import { 
  Stack,
} from "@mui/material";

import CollectedEvidenceSection from "./CollectedEvidenceSection";
import RubricAlignmentSection from "./RubricAlignmentSection";
import PageHeader from "@components/PageHeader";
import PackagedEvidenceSection from "./PackagedEvidenceSection";

import { 
  selectActiveRubricRow,
} from "@evidence-collection-slice";

 const RubricRowView = () => {
  const activeRubricRow = useSelector(selectActiveRubricRow);

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