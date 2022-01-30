import { useState } from "react";
import { useSelector } from "react-redux";
import { 
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography 
} from "@mui/material";

import { 
  selectActiveEvaluationId, 
  selectCurrentUser,
} from "@user-context-slice";

import { 
  selectActiveRubricRow,
  selectEvidenceItemsForActiveRubricRow,
} from "@evidence-collection-slice";

import CollectedEvidenceList from './CollectedEvidenceList';
import AddOtherEvidence from "./AddOtherEvidence";

 const unPackagedEvidenceVisibleMessage = "Below is all of the evidence collected for this rubric component and not yet included in an evidence package. To start the process of creating an Evidence Package, click each evidence item you want to include in the package and you will be guided through the process. Click here for more information on how to package evidence.";
 const allEvidenceVisibleMessage = "Below is all of the evidence collected for this rubric component. To start the process of creating an Evidence Package, click each evidence item you want to include in the package and you will be guided through the process. Click here for more information on how to package evidence.";

 const CollectedEvidenceSection = () => {
  const [hidePackagedEvidenceChecked, toggleHidePackagedEvidenceChecked] = useState(true);
  const activeRubricRow = useSelector(selectActiveRubricRow);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);
  const currentUser = useSelector(selectCurrentUser);
  const evidenceItems = useSelector(selectEvidenceItemsForActiveRubricRow);

  return (
    <>
      <Box>
        <Box sx={{mb:2}}>
          <Typography variant="body1"><strong>Collected Evidence</strong></Typography>
          <Divider/>
          <FormControlLabel 
            control={<Checkbox onChange={()=> { toggleHidePackagedEvidenceChecked((prev)=>!prev);}} />} 
            label="Hide evidence you have already included in packages" 
          />
          <Typography variant="body1">
            {hidePackagedEvidenceChecked ? unPackagedEvidenceVisibleMessage : allEvidenceVisibleMessage}
          </Typography>
        </Box>
        <CollectedEvidenceList />
        <AddOtherEvidence evaluationId={activeEvaluationId}  rubricRowId={activeRubricRow.id} userId={currentUser.id}/>
      </Box>
    </>
  );
};

export default CollectedEvidenceSection;