import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography 
} from "@mui/material";

import { styled, useTheme } from '@mui/material/styles';

import { EvidenceCollectionType, EvidenceType } from "@lib/enums"

import { 
  setPageTitle, 
  selectActiveEvaluationId, 
  selectCurrentUser,
} from "@user-context-slice";

import { 
  useCreateEvidenceItemMutation, 
  useGetYearToDateEvidenceItemsQuery,
 } from "@api-slice";

import {
  selectActiveFrameworkNode,
  selectActiveRubricRow,
} from "@rubric-navigator-slice";

import { RubricNavigator } from '@components';

const Dashboard = () => {

  const theme = useTheme();

  const evidenceItemStyles = { 
    backgroundColor: `#f2f2f2`,
    color: '#676a6c',
    padding: '18px',
    margin: '10px 0',
    cursor: 'pointer',
  };

  const dispatch = useDispatch();
  const pageTitle = "DA TR Dashboard";

  const [evidenceText, setEvidenceText] = useState('');

  const activeFrameworkNode = useSelector(selectActiveFrameworkNode);
  const activeRubricRow = useSelector(selectActiveRubricRow);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);
  const currentUser = useSelector(selectCurrentUser);

  const [createEvidenceItem] = useCreateEvidenceItemMutation();
  const { data: evidenceItems } = useGetYearToDateEvidenceItemsQuery(
    {
      evaluationId: activeEvaluationId
    }
  );

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    // throw Error("something happened");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickAddOtherEvidence = () => {
    let data = {
      collectionType: EvidenceCollectionType.OTHER_EVIDENCE,
      evidenceType: EvidenceType.RUBRIC_ROW_NOTE,
      collectionObjectId: activeEvaluationId,
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
      
      <Box sx={{display:'grid', gap: '20px', gridTemplateColumns:'auto 300px'}}>
        <Box>
          <Typography variant="h2" >
            {activeFrameworkNode?.shortName} - {activeFrameworkNode?.title}
          </Typography>
          <Typography variant="h2">
            {activeRubricRow?.shortName} - {activeRubricRow?.title}
          </Typography>

          <Stack spacing={3}>
            {evidenceItems && evidenceItems.map(x=>(
              <Box key={x.id}
                sx={{...evidenceItemStyles}}>
                  <Stack direction="row" sx={{}} spacing={2}>
                    <Box>
                      <strong>Source:&nbsp;</strong>
                      {x.evidenceCollectionDisplayName}
                    </Box>
                    <Box>
                      <strong>Type:&nbsp;</strong>
                      {x.evidenceTypeDisplayName}
                    </Box>
                    <Box>

                    </Box>
                  </Stack>
                {x.evidenceText}
              </Box>
            ))}

          </Stack>
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
