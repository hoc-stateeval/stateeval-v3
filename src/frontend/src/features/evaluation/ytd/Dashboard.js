import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Box,
  Button,
  Stack,
  TextField,
  Typography 
} from "@mui/material";

import { EvidenceCollectionType, EvidenceType } from "@lib/enums"

import { setPageTitle, selectActiveEvaluationId, selectCurrentUser } from "@user-context-slice";

import { useCreateEvidenceItemMutation } from "@api-slice";

import {
  selectActiveFrameworkNode,
  selectActiveRubricRow,
} from "@rubric-navigator-slice";

import { RubricNavigator } from '@components';

const Dashboard = () => {
  const dispatch = useDispatch();
  const pageTitle = "DA TR Dashboard";

  const [evidenceText, setEvidenceText] = useState('');

  const activeFrameworkNode = useSelector(selectActiveFrameworkNode);
  const activeRubricRow = useSelector(selectActiveRubricRow);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);
  const currentUser = useSelector(selectCurrentUser);

  const [createEvidenceItem] = useCreateEvidenceItemMutation();

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    // throw Error("something happened");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickAddOtherEvidence = () => {
    let data = {
      evidenceCollectionType: EvidenceCollectionType.OTHER_EVIDENCE,
      evidenceType: EvidenceType.RUBRIC_ROW_NOTE,
      evidenceCollectionObjectId: activeEvaluationId,
      evaluationId: activeEvaluationId,
      rubricRowId: activeRubricRow.id,
      createdByUserId: currentUser.id,
      evidenceText: evidenceText,
      public: true, 
      codedEvidenceClientId: null,
      userPromptResponseId: null
    }
    createEvidenceItem(data);
  }

  return (
    <>
      <Typography variant="h2">{pageTitle}</Typography>
      
      <Box sx={{display:'grid', gridTemplateColumns:'auto 300px'}}>
        <Box>
          <Typography variant="h2" >
            {activeFrameworkNode?.shortName} - {activeFrameworkNode?.title}
          </Typography>
          <Typography variant="h2">
            {activeRubricRow?.shortName} - {activeRubricRow?.title}
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Stack spacing={3}>
              <TextField
                id="standard-multiline-flexible"
                label="Multiline"
                multiline
                maxRows={4}
                onChange={(e)=>setEvidenceText(e.target.value)}
                value={evidenceText}
                variant="standard"
              />
              <Button variant="contained" onClick={onClickAddOtherEvidence}>Add Other Evidence</Button>
            </Stack>
          </Box>
  
        </Box>
        <RubricNavigator/>
      </Box>
    </>
  );
};

export default Dashboard;
