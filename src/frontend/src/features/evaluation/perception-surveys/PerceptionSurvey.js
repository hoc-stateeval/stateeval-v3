/* eslint-disable no-lone-blocks */
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useErrorHandler } from 'react-error-boundary';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";

import {
  selectActiveEvaluationId,
  selectActiveFrameworkId,
} from "@user-context-slice";

import {
  useGetFrameworkByIdQuery,
  useGetPerceptionSurveysForEvaluationQuery,
  useGetPerceptionSurveyStatementsForFrameworkTagNameQuery,
  useGetPerceptionSurveyStatementIdsQuery,
  useDeletePerceptionSurveyMutation,
} from "@api-slice";

import StudentSurveyBody from "./StudentSurveyBody";
import SurveyBuilder from "./SurveyBuilder";
import { evaluationPaths } from "@routes/paths";

const PerceptionSurvey = () => {

  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  let { id: surveyId } = useParams();
  surveyId = parseInt(surveyId);

  const activeFrameworkId = useSelector(selectActiveFrameworkId);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);

  const [deleteSurveyAPI, {error: deleteSurveyError}] = useDeletePerceptionSurveyMutation();
  if (deleteSurveyError) errorHandler(deleteSurveyError);

  const { survey, error: getPerceptionSurveysError } = 
  useGetPerceptionSurveysForEvaluationQuery(activeEvaluationId, {
    selectFromResult: ({ data }) => ({
      survey: data?.find((survey) => survey.id === surveyId),
    }),
  });
  if (getPerceptionSurveysError) errorHandler(getPerceptionSurveysError);

  const [statementMap, setStatementMap] = useState({});
  const [mode, setMode] = useState('edit');
  const [openSurveyDlgOpen, setOpenSurveyDlgOpen] = useState(false);
  const [deleteSurveyDlgOpen, setDeleteSurveyDlgOpen] = useState(false);

  const { data: activeFramework, error: getFrameworkError } = 
    useGetFrameworkByIdQuery(activeFrameworkId);
  if (getFrameworkError) errorHandler(getFrameworkError);

  const { data: statements, error: getStatementsError } = 
    useGetPerceptionSurveyStatementsForFrameworkTagNameQuery(activeFramework.frameworkTagName, {skip: !activeFramework});
  if (getStatementsError) errorHandler(getStatementsError);

  const { data: checkedIds, error: getCheckedIdsError } = 
    useGetPerceptionSurveyStatementIdsQuery(surveyId);
  if (getCheckedIdsError) errorHandler(getCheckedIdsError);

  useEffect(()=> {

    if (!survey || !statements || !activeFramework) return;
    
    const map = statements.reduce((acc, statement) => {
      const rubricRow = activeFramework.rubricRowMap[statement.rubricRowId];
      if (!acc[statement.rubricRowId]) {
        acc[rubricRow.id] = [];
      }
      acc[statement.rubricRowId].push(statement);
      return acc;
    }, {});

    setStatementMap(map);

  }, [survey, statements]);

  const deleteSurvey = async () => {
    await deleteSurveyAPI(survey.id);
    navigate(evaluationPaths.trMePerceptionSurveys);
  }

  const openSurvey = () => {
  }

  const closeSurvey = () => {

  }

  if (!survey || !statements || !activeFramework || !checkedIds) {
    return (<></>)
  }

  return (
    <>
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2} sx={{justifyContent: 'flex-end'}}>
          {mode==='preview' && <Button onClick={() => { setMode('edit'); }}>Edit Survey</Button>}
          {mode==='edit' && (
            <>
              <Button disabled={checkedIds.length===0} onClick={() => {setMode('preview'); }}>Preview Survey</Button>
              <Button disabled={checkedIds.length===0} onClick={()=> {setOpenSurveyDlgOpen(true)}}>Open Survey</Button>
              <Dialog open={openSurveyDlgOpen} onClose={()=> {setOpenSurveyDlgOpen(false)}}>
                <DialogTitle>Open Survey to Students</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <p>Please make sure your survey is ready. The survey will be
                        available to anyone that has the survey URL.
                        Once the survey is public you will not be able to modify the survey.
                    </p>
                    <p>What happens after clicking the "Open Survey" button?:</p>
                    <ul>
                        <li>
                            The survey will be accessible from a public URL. This page will display the public URL
                            that you can distribute to your students.
                        </li>
                        <li>The survey will remain open until you either temporarily close the survey or complete
                            the survey.</li>
                        <li>If you temporarily close the survey you can re-open it.</li>
                        <li>Once you complete the survey it cannot be re-opened.</li>
                    </ul>
                    
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant="outlined"  onClick={()=> {setOpenSurveyDlgOpen(false)}}>Cancel</Button>
                  <Button variant="contained" onClick={openSurvey}>Open Survey</Button>
                </DialogActions>
              </Dialog>
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
            </>
          )}
      </Stack>
      {mode==='edit' && <SurveyBuilder activeFramework={activeFramework} survey={survey} checkedIds={checkedIds} statementMap={statementMap}/>}
      {mode==='preview' && <StudentSurveyBody preview={true} checkedIds={checkedIds} allStatements={statements} />}
    </Stack>
    </>
  )
}

export default PerceptionSurvey;

