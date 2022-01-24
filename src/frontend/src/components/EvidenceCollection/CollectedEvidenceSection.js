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
  selectActiveRubricRow,
} from "@user-context-slice";

import { 
  useGetYearToDateEvidenceItemsQuery,
 } from "@api-slice";

import CollectedEvidenceList from './CollectedEvidenceList';
import AddOtherEvidence from "./AddOtherEvidence";

 const unPackagedEvidenceVisibleMessage = "Below is all of the evidence collected for this rubric component and not yet included in an evidence package. To start the process of creating an Evidence Package, click each evidence item you want to include in the package and you will be guided through the process. Click here for more information on how to package evidence.";
 const allEvidenceVisibleMessage = "Below is all of the evidence collected for this rubric component. To start the process of creating an Evidence Package, click each evidence item you want to include in the package and you will be guided through the process. Click here for more information on how to package evidence.";

 const CollectedEvidenceSection = () => {
  const [hidePackagedEvidenceChecked, toggleHidePackagedEvidenceChecked] = useState(true);
  const activeRubricRow = useSelector(selectActiveRubricRow);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);
  const currentUser = useSelector(selectCurrentUser);
  const { data: evidenceItems } = useGetYearToDateEvidenceItemsQuery({evaluationId: activeEvaluationId});

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
            {hidePackagedEvidenceChecked?unPackagedEvidenceVisibleMessage:allEvidenceVisibleMessage}
          </Typography>
        </Box>
        <CollectedEvidenceList evidenceItems={evidenceItems} rubricRowId={activeRubricRow.id} />
        <AddOtherEvidence evaluationId={activeEvaluationId}  rubricRowId={activeRubricRow.id} userId={currentUser.id}/>
      </Box>
    </>
  );
};

export default CollectedEvidenceSection;