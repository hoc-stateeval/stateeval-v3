import { useState } from "react";
import { useSelector } from "react-redux";

import { 
  Box,
  Button,
  Stack,
  TextField,
  Typography 
} from "@mui/material";

import { 
  useCreateEvidenceItemMutation, 
 } from "@api-slice";

 import { 
  selectActiveEvaluationId, 
  selectCurrentUser,
} from "@user-context-slice";

import { 
  selectActiveRubricRowId,
  selectCollectionParams,
} from "@evidence-collection-slice";

import { EvidenceType } from "@lib/enums"

const evidenceItemStyles = { 
  backgroundColor: `#f2f2f2`,
  color: '#676a6c',
  margin: '10px 0',
  fontSize:'11px'
};
const AddOtherEvidence = () => {

  const [evidenceText, setEvidenceText] = useState('');
  const [showOtherEvidenceInputArea, toggleShowOtherEvidenceInputArea] = useState(false);
  const [createEvidenceItem] = useCreateEvidenceItemMutation();

  const activeRubricRowId = useSelector(selectActiveRubricRowId);
  const evaluationId = useSelector(selectActiveEvaluationId);
  const currentUser = useSelector(selectCurrentUser);
  const collectionParams = useSelector(selectCollectionParams);

  const onClickAddOtherEvidence = () => {
    let data = {
      collectionType: collectionParams.collectionType,
      collectionObjectId: collectionParams.collectionObjectId,
      evaluationId: evaluationId,
      evidenceType: EvidenceType.RUBRIC_ROW_NOTE,
      rubricRowId: activeRubricRowId,
      createdByUserId: currentUser.id,
      evidenceText: evidenceText,
      public: true, 
      codedEvidenceClientId: null,
      userPromptResponseId: null
    }
    toggleShowOtherEvidenceInputArea((prev)=>!prev);
    createEvidenceItem(data);
  }

  return (
    <>
        {showOtherEvidenceInputArea && 
        <Box sx={{...evidenceItemStyles, p:2, mt: 2}}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { backgroundColor: 'white'},
            }}
            noValidate
            autoComplete="off"
          >
            <Typography variant="body1" sx={{mb:1}}>
              <strong>Provide Evidence:</strong>
            </Typography>
            <TextField sx={{mb:1}}
                label="Input evidence here"
                variant="outlined"
                value={evidenceText}
                multiline
                fullWidth
                onChange={(e)=>setEvidenceText(e.target.value)}
                rows={4}
              />
              <Stack direction="row" spacing={1} sx={{justifyContent:'flex-end'}}>
                <Button 
                  variant="contained" 
                  color="background" 
                  size="small"
                  onClick={()=> { toggleShowOtherEvidenceInputArea((prev)=>!prev);}}
                >Cancel</Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="small"
                  onClick={onClickAddOtherEvidence}
                >Done</Button>
              </Stack>
          </Box>
        </Box>
        }
        {!showOtherEvidenceInputArea && <Button 
          variant="contained" 
          color="secondary" 
          size="small"
          onClick={toggleShowOtherEvidenceInputArea}
        >Add Other Evidence</Button>
        }
    </>
  );
};

export default AddOtherEvidence;