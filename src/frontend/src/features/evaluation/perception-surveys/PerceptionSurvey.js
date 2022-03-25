
import {useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { useSelector } from 'react-redux';

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
  useGetFrameworkByIdQuery,
  useDeletePerceptionSurveyMutation,
  useGetPerceptionSurveyStatementsForFrameworkTagNameQuery
} from "@api-slice";

import {
  selectActiveFrameworkId
} from "@user-context-slice";

import { evaluationPaths } from "@routes/paths";

const PerceptionSurvey = () => {

  const { id: surveyId } = useParams();
  const navigate = useNavigate();
  const errorHandler = useErrorHandler();
  const activeFrameworkId = useSelector(selectActiveFrameworkId);

  const { data: activeFramework, error: getFrameworkError } = 
    useGetFrameworkByIdQuery(activeFrameworkId);
  if (getFrameworkError) errorHandler(getFrameworkError);

  const { data: statements, error: getStatementsError } =
  useGetPerceptionSurveyStatementsForFrameworkTagNameQuery('DAN');
  if (getStatementsError) errorHandler(getStatementsError);

  const [deleteSurveyAPI, {error: deleteSurveyError}] = useDeletePerceptionSurveyMutation();
  if (deleteSurveyError) errorHandler(deleteSurveyError);

  const [deleteSurveyDlgOpen, setDeleteSurveyDlgOpen] = useState(false);

  useEffect(()=> {

    if (!statements) return;



  }, [statements])

  const deleteSurvey = async () => {
    setDeleteSurveyDlgOpen(false);
    await deleteSurveyAPI(surveyId)
    navigate(evaluationPaths.trMePerceptionSurveys);
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

        {statements && statements.map((x,i) => (
          <Typography key={i}>{x.text}</Typography>
        ))}
      </Stack>
    </>
  )
}

export default PerceptionSurvey;