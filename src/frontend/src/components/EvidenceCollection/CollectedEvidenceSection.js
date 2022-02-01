import { useState } from "react";

import { 
  Checkbox,
  FormControlLabel,
  Stack,
  Typography 
} from "@mui/material";

import CollectedEvidenceList from './CollectedEvidenceList';
import AddOtherEvidence from "./AddOtherEvidence";
import { PageSectionHeader } from "@components";

 const unPackagedEvidenceVisibleMessage = "Below is all of the evidence collected for this rubric component and not yet included in an evidence package. To start the process of creating an Evidence Package, click each evidence item you want to include in the package and you will be guided through the process. Click here for more information on how to package evidence.";
 const allEvidenceVisibleMessage = "Below is all of the evidence collected for this rubric component. To start the process of creating an Evidence Package, click each evidence item you want to include in the package and you will be guided through the process. Click here for more information on how to package evidence.";

 const CollectedEvidenceSection = () => {
  const [hidePackagedEvidenceChecked, toggleHidePackagedEvidenceChecked] = useState(true);

  return (
    <>

      <Stack spacing={2}>
      <PageSectionHeader title={"Collected Evidence"}></PageSectionHeader>
        <FormControlLabel 
          control={<Checkbox onChange={()=> { toggleHidePackagedEvidenceChecked((prev)=>!prev);}} />} 
          label="Hide evidence you have already included in packages" 
        />
        <Typography variant="body1">
          {hidePackagedEvidenceChecked ? unPackagedEvidenceVisibleMessage : allEvidenceVisibleMessage}
        </Typography>
      </Stack>
      <CollectedEvidenceList />
      <AddOtherEvidence />
    </>
  );
};

export default CollectedEvidenceSection;