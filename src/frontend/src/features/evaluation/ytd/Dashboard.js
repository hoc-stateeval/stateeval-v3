import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography 
} from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { styled, useTheme } from '@mui/material/styles';

import { EvidenceCollectionType, EvidenceType } from "@lib/enums"

import { 
  setPageTitle, 
  selectActiveEvaluationId, 
  selectCurrentUser,
  selectActiveFrameworkNode,
  selectActiveRubricRow,
} from "@user-context-slice";

import { 
  useCreateEvidenceItemMutation, 
  useGetYearToDateEvidenceItemsQuery,
 } from "@api-slice";

import { RubricNavigator } from '@components';

const Dashboard = () => {

  const theme = useTheme();

  const evidenceItemStyles = { 
    backgroundColor: `#f2f2f2`,
    color: '#676a6c',
    margin: '10px 0',
    fontSize:'11px'
  };

  const dispatch = useDispatch();
  const pageTitle = "DA TR Dashboard";

  const [evidenceText, setEvidenceText] = useState('');
  const [hidePackagedEvidenceChecked, toggleHidePackagedEvidenceChecked] = useState(true);
  const [showOtherEvidenceInputArea, toggleShowOtherEvidenceInputArea] = useState(false);

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
      {/* <Typography variant="h2">{pageTitle}</Typography> */}
      
      <Box sx={{display:'grid', gap: '20px', mt: 5, gridTemplateColumns:'auto 300px'}}>
        <Box>
          <Typography variant="h5" sx={{ mb:4}}>
            {activeRubricRow?.shortName} - {activeRubricRow?.title}
          </Typography>

          <Box sx={{mb:2}}>
            <Typography variant="body1"><strong>Collected Evidence</strong></Typography>
            <Divider/>
            <FormControlLabel 
              control={<Checkbox onChange={()=> { toggleHidePackagedEvidenceChecked((prev)=>!prev);}} />} 
              label="Hide evidence you have already included in packages" 
            />
            {hidePackagedEvidenceChecked && <Typography variant="body1">
            
              Below is all of the evidence collected for this rubric component and not yet included in an evidence package. To start the process of creating an Evidence Package, click each evidence item you want to include in the package and you will be guided through the process. Click here for more information on how to package evidence.
              </Typography>
            }
            {!hidePackagedEvidenceChecked && <Typography variant="body1">
            Below is all of the evidence collected for this rubric component. To start the process of creating an Evidence Package, click each evidence item you want to include in the package and you will be guided through the process. Click here for more information on how to package evidence.
            </Typography>
          }
          </Box>
            
          {evidenceItems && evidenceItems.filter(x=>x.rubricRowId===activeRubricRow.id).map(x=>(
            <Accordion  key={x.id} sx={{...evidenceItemStyles}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack direction="row" spacing={2}>
                    <Box>
                          <strong>Created:&nbsp;</strong>
                          {`${x.creationDateDisplayString} : ${x.createdByDisplayName}`}
                    </Box>
                    <Box>
                      <strong>Source:&nbsp;</strong>
                      {x.evidenceCollectionDisplayName}
                    </Box>
                    <Box>
                      <strong>Type:&nbsp;</strong>
                      {x.evidenceTypeDisplayName}
                    </Box>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  {x.evidenceText}
                </AccordionDetails>
            </Accordion>))
          }

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
                  multiline
                  fullWidth
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
                    onClick={()=> { toggleShowOtherEvidenceInputArea((prev)=>!prev);}}
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

        </Box>
        <RubricNavigator/>
      </Box>
    </>
  );
};

export default Dashboard;
