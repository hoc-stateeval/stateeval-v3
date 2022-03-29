import { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useSelector } from 'react-redux';

import { 
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField,
  Grid,
  Stack,
  Typography
} from "@mui/material";

import { AddCircleOutline as AddCircleOutlineIcon } from "@mui/icons-material";

import {
  useCreateUserPromptMutation
} from "@api-slice";

import {
  selectActiveWorkAreaContext,
} from '@user-context-slice';

import { PageSectionHeader } from "@components";
import { UserPromptTier } from "@lib/enums";
import DistrictPrompts from "./DistrictPrompts";
import SchoolPrompts from "./SchoolPrompts";
import EvaluatorPrompts from "./EvaluatorPrompts";

const PromptTypeConfig = ({promptType}) => {

  const errorHandler = useErrorHandler();

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);

  const [ activePrompt, setActivePrompt ] = useState(null);
  const [editPromptDlgOpen, setEditPromptDlgOpen] = useState(false);

  let promptTier = UserPromptTier.UNDEFINED;
  if (activeWorkAreaContext.isDistrictAdmin) promptTier = UserPromptTier.DISTRICT_ADMIN;
  else if (activeWorkAreaContext.isSchoolAdmin) promptTier = UserPromptTier.SCHOOL_ADMIN;
  else promptTier = UserPromptTier.EVALUATOR;

  const [ createPromptAPI, { error: createPromptError}] = useCreateUserPromptMutation();
  if (createPromptError) errorHandler(createPromptError);

  
  // const onClickNewPrompt = async () => {
  //   const prompt = await createPromptAPI(
  //     {
  //       frameworkContextId: activeWorkAreaContext.frameworkContextId,
  //       promptTier,
  //       promptType,
  //       prompt: 'Test Prompt',
  //       schoolCode: promptTier===UserPromptTier.DISTRICT_ADMIN?"":activeWorkAreaContext.schoolCode,
  //       evaluatorId: promptTier===UserPromptTier.EVALUATOR?currentUser.id:null
  //     }
  //   ).unwrap();
  // }

  const onClickSavePrompt = async () => {

  }

  return (
    <>
      <PageSectionHeader title={`${promptType.name} Prompts`}>    
        <Stack direction="column" spacing={2}>
          <Stack direction="row" sx={{ justifyContent: "flex-end" }} spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<AddCircleOutlineIcon />}
              onClick={()=> { setEditPromptDlgOpen(true); setActivePrompt({prompt: ''})}}
            >
              Add Prompt
            </Button>
            <Dialog open={editPromptDlgOpen} onClose={()=> {setEditPromptDlgOpen(false)}}>
              <DialogTitle>Edit Prompt</DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormGroup>
                    <FormControlLabel
                          control={
                            <Checkbox color="secondary" checked={true} name="required" />
                          }
                          label="Required"
                        />
                      <TextField
                        name="prompt"
                        label="Prompt"
                        value=""
                      ></TextField>
                    </FormGroup>
                  </Grid>

                </Grid>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined"  onClick={()=> {setEditPromptDlgOpen(false)}}>Cancel</Button>
                <Button variant="contained" onClick={onClickSavePrompt}>Save</Button>
              </DialogActions>
            </Dialog>
          </Stack>
          {promptTier===UserPromptTier.DISTRICT_ADMIN &&
           <DistrictPrompts 
            frameworkContextId={activeWorkAreaContext.frameworkContextId} 
            promptType={promptType} />
          } 
          {promptTier===UserPromptTier.SCHOOL_ADMIN &&
           <SchoolPrompts 
            frameworkContextId={activeWorkAreaContext.frameworkContextId} 
            schoolCode={activeWorkAreaContext.schoolCode}
            promptType={promptType} />
          } 
        {promptTier===UserPromptTier.EVALUATOR &&
           <EvaluatorPrompts 
            frameworkContextId={activeWorkAreaContext.frameworkContextId} 
            schoolCode={activeWorkAreaContext.schoolCode}
            promptType={promptType} />
          }           
        </Stack>
      </PageSectionHeader>
    </>
  )
}

export default PromptTypeConfig;