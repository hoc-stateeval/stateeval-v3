import { useSelector } from "react-redux";
import { 
  Box,
  Typography 
} from "@mui/material";

import CollectedEvidenceSection from "./CollectedEvidenceSection";

import { 
  selectActiveRubricRow,
} from "@user-context-slice";

 const RubricRowView = (selectedEvidence, setSelectedEvidence) => {
  const activeRubricRow = useSelector(selectActiveRubricRow);

  return (
    <>
      <Box>
        <Typography variant="h5" sx={{ mb:4}}>
          {activeRubricRow?.shortName} - {activeRubricRow?.title}
        </Typography>
        <CollectedEvidenceSection selectedEvidence={selectedEvidence} setSelectedEvidence={setSelectedEvidence} />
      </Box>
    </>
  );
};

export default RubricRowView;