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
  useUpdatePerceptionSurveyMutation,
} from "@api-slice";

import StudentSurveyPreview from "./StudentSurveyPreview";
import SurveyBuilder from "./SurveyBuilder";
import SurveyResults from "./SurveyResults";
import SurveyStatus from "./SurveyStatus";
import { evaluationPaths } from "@routes/paths";
import { WorkState } from "@lib/enums";

const PerceptionSurvey = () => {

  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  let { id: surveyId } = useParams();
  surveyId = parseInt(surveyId);

  const activeFrameworkId = useSelector(selectActiveFrameworkId);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);

  const [deleteSurveyAPI, {error: deleteSurveyError}] = useDeletePerceptionSurveyMutation();
  if (deleteSurveyError) errorHandler(deleteSurveyError);

  const [updateSurveyAPI, {error: updateSurveyError}] = useUpdatePerceptionSurveyMutation();
  if (updateSurveyError) errorHandler(updateSurveyError);

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
  const [completeSurveyDlgOpen, setCompleteSurveyDlgOpen] = useState(false);

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

  const openSurvey = async () => {
    await updateSurveyAPI({
      surveyId: survey.id,
      title: survey.title,
      wfState: WorkState.PERCEPTION_SURVEY_OPEN,
    });
  }

  const closeSurvey = async () => {
    await updateSurveyAPI({
      surveyId: survey.id,
      title: survey.title,
      wfState: WorkState.PERCEPTION_SURVEY_CLOSED,
    });
  }

  const completeSurvey = async () => {
    await updateSurveyAPI({
      surveyId: survey.id,
      title: survey.title,
      wfState: WorkState.PERCEPTION_SURVEY_COMPLETE,
    });
  }

  const buildCompleteSurveyButton = () => {
    return (
      <>
          <Button onClick={()=> {setCompleteSurveyDlgOpen(true)}}>Complete Survey</Button>
          <Dialog open={completeSurveyDlgOpen} onClose={()=> {setCompleteSurveyDlgOpen(false)}}>
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to complete this survey? Students will no longer be able to take this survey once it has been complete.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined"  onClick={()=> {setCompleteSurveyDlgOpen(false)}}>Cancel</Button>
            <Button variant="contained" onClick={completeSurvey}>Complete Survey</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
  const buildDeleteSurveyButton = () => {
    return (
      <>
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
    );
  }

  const buildOpenSurveyButton = () => {
    return (
      <>
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
      </>
    )
  }

  const buildButtons = () => {
    if (survey.wfState === WorkState.PERCEPTION_SURVEY_BUILDING) {
      if (mode==='preview') {
        return <Button onClick={() => { setMode('edit'); }}>Edit Survey</Button>;
      }
      else if (mode==='edit') {
        return (
          <>
            <Button disabled={checkedIds.length===0} onClick={() => {setMode('preview'); }}>Preview Survey</Button>
            {buildOpenSurveyButton()}
            {buildDeleteSurveyButton()}
         </>     
        )
      }
    }
    else if (survey.wfState === WorkState.PERCEPTION_SURVEY_CLOSED) {
      return (
        <>
          {buildOpenSurveyButton()}
          {buildCompleteSurveyButton()}
          {buildDeleteSurveyButton()}
        </>
      );
    }
    else if (survey.wfState === WorkState.PERCEPTION_SURVEY_OPEN) {
      return (
        <>
          <Button onClick={() => {closeSurvey(); }}>Close Survey</Button>
          {buildCompleteSurveyButton()}
          {buildDeleteSurveyButton()}
        </>
      );
    }
    else {
      return (<></>);
    }
  }

  const getCheckedStatements = () => {
    return statements.filter((statement, i) => {
       const checked = checkedIds.includes(statement.id);
       return checked;
     });
   }

  const buildMainContent = () => {
    let content = [];
    if (mode!=='preview') content.push(<SurveyStatus key={0}  survey={survey} checkedIds={checkedIds} />)
    if (survey.wfState === WorkState.PERCEPTION_SURVEY_BUILDING) {
      if (mode==='preview') {
        content.push(<StudentSurveyPreview key={1} survey={survey} statements={getCheckedStatements()} />)
      }
      else if (mode==='edit') {
        content.push(
          <SurveyBuilder key={1} activeFramework={activeFramework} survey={survey} checkedIds={checkedIds} statementMap={statementMap}/>
        );
      }
    }
    else if (survey.wfState === WorkState.PERCEPTION_SURVEY_OPEN) {
      content.push(<SurveyResults key={1} />)
    }
    else if (survey.wfState === WorkState.PERCEPTION_SURVEY_CLOSED) {
      content.push(<SurveyResults key={1} />)
    }

    return content;
  }

  if (!survey || !statements || !activeFramework || !checkedIds) {
    return (<></>)
  }

  return (
    <>
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2} sx={{justifyContent: 'flex-end'}}>
         {buildButtons()}
      </Stack>
      {buildMainContent()}
     </Stack>
    </>
  )
}

export default PerceptionSurvey;

