/* eslint-disable no-lone-blocks */
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useErrorHandler } from 'react-error-boundary';
import { useSelector } from "react-redux";

import {
  Button,
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
} from "@api-slice";

import StudentSurveyBody from "./StudentSurveyBody";
import SurveyBuilder from "./SurveyBuilder";

const PerceptionSurvey = () => {

  const errorHandler = useErrorHandler();

  let { id: surveyId } = useParams();
  surveyId = parseInt(surveyId);

  const activeFrameworkId = useSelector(selectActiveFrameworkId);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);

  const { survey, error: getPerceptionSurveysError } = 
  useGetPerceptionSurveysForEvaluationQuery(activeEvaluationId, {
    selectFromResult: ({ data }) => ({
      survey: data?.find((survey) => survey.id === surveyId),
    }),
  });
  if (getPerceptionSurveysError) errorHandler(getPerceptionSurveysError);

  const [statementMap, setStatementMap] = useState({});
  const [mode, setMode] = useState('edit');
  
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

  const deleteSurvey = () => {

  }

  if (!survey || !statements || !activeFramework || !checkedIds) {
    return (<></>)
  }

  return (
    <>
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2} sx={{justifyContent: 'flex-end'}}>
          {mode==='edit' && <Button onClick={() => {setMode('preview'); }}>Preview Survey</Button>}
          {mode==='preview' && <Button onClick={() => { setMode('edit'); }}>Edit Survey</Button>}
          <Button onClick={deleteSurvey}>Delete Survey</Button>
      </Stack>
      {mode==='edit' && <SurveyBuilder activeFramework={activeFramework} survey={survey} checkedIds={checkedIds} statementMap={statementMap}/>}
      {mode==='preview' && <StudentSurveyBody checkedIds={checkedIds} allStatements={statements} />}
    </Stack>
    </>
  )
}

export default PerceptionSurvey;

