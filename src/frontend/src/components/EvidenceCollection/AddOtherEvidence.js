import { useState } from "react";

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

import { EvidenceCollectionType, EvidenceType } from "@lib/enums"

const evidenceItemStyles = { 
  backgroundColor: `#f2f2f2`,
  color: '#676a6c',
  margin: '10px 0',
  fontSize:'11px'
};
const AddOtherEvidence = ({evaluationId, rubricRowId, userId}) => {

  const [evidenceText, setEvidenceText] = useState('');
  const [showOtherEvidenceInputArea, toggleShowOtherEvidenceInputArea] = useState(false);
  const [createEvidenceItem] = useCreateEvidenceItemMutation();

  const onClickAddOtherEvidence = () => {
    let data = {
      collectionType: EvidenceCollectionType.OTHER_EVIDENCE,
      evidenceType: EvidenceType.RUBRIC_ROW_NOTE,
      collectionObjectId: evaluationId,
      evaluationId: evaluationId,
      rubricRowId: rubricRowId,
      createdByUserId: userId,
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