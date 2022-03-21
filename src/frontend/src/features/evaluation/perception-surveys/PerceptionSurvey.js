
import {useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';

import {
  useDeletePerceptionSurveyMutation
} from "@api-slice";

const PerceptionSurvey = () => {

  const { id: surveyId } = useParams();

  const [deleteSurveyDlgOpen, setDeleteSurveyDlgOpen] = useState(false);

  const deleteSurvey = () => {

  }

  return (
    <>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2} sx={{justifyContent:'flex-end'}}>
          <Button onClick={()=> {setDeleteSurveyDlgOpen(true)}}>Delete Survey</Button>
          <Dialog open={deleteSurveyDlgOpen} onClose={()=> {setDeleteSurveyDlgOpen(false)}}>
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this survey?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined"  onClick={()=> {setDeleteSurveyDlgOpen(false)}}>Cancel</Button>
              <Button variant="contained" onClick={deleteSurvey}>Delete Survey</Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </Stack>
    </>
  )
}

export default PerceptionSurvey;